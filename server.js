var express = require('express');
var passport = require('passport');
var lowdb = require('lowdb');
var uuid = require('uuid');
var superagent = require('superagent');
var moment = require('moment');

var weather = require('./src/js/components/API/weather');
var plants = require('./src/js/components/API/plants');

var LocalStrategy = require('passport-local').Strategy;

var db = lowdb('db.json', {
    storage: require('lowdb/lib/file-sync')
});

db.defaults({
    users: [
        {
            id: uuid(),
            username: 'admin',
            password: 'admin'
        }
    ],
    plants: []
}).value();

// Plants might look something like this
// {
//      userId: '',
//      plantDBId: 0,
//      name: '',
//      img: '',
//      timeLastWatered: 0
// }

passport.use(new LocalStrategy(function (username, password, cb) {
    // Find the user
    var user = db.get('users')
        .find({ username: username })
        .value();
    // If no user was found, or the password was incorrect
    if (!user || user.password !== password) {
        return cb(null, false);
    }
    // User was found
    return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

var app = express();

app.use(require('body-parser')());
app.use(require('express-session')({
    secret: 'honey badger don\'t care',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build'));

// API endpoints are authenticated with this function. If the client recieves
// a 401 response, it can redirect itself to the login page.
function auth(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
    } else {
        next();
    }
}

/**
 * Authentication endpoints
 */

app.post('/auth/login', passport.authenticate('local', {
    failureRedirect: '/'
}), function (req, res) {
    res.json(req.user);
});

app.delete('/auth/login', auth, function (req, res) {
    req.logOut();
    res.sendStatus(202);
});

app.get('/auth/check', auth, function (req, res) {
    var user = db.get('users')
        .find({ id: req.user.id })
        .value();
    res.json(user);
});

/**
 * REST API endpoints
 */

app.get('/users', auth, function (req, res) {
    var users = db.get('users').value();
    res.json(users);
});

app.post('/users', function (req, res) {
    var existing = db.get('users')
        .find({ username: req.body.username })
        .value();

    if (existing) {
        res.sendStatus(409);
        return;
    }

    var user = {
        id: uuid(),
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    };

    db.get('users')
        .push(user)
        .value();

    res.json(user);
});

app.get('/users/:id', auth, function (req, res) {
    var user = db.get('users')
        .find({ id: req.params.id })
        .value();

    if (!user) {
        res.sendStatus(404);
        return;
    }

    res.json(user);
});

app.put('/users/:id', function (req, res) {
    var data = {
        email: req.body.email,
        phone: req.body.phone
    };

    var updated = db.get('users')
        .find({ username: req.body.username })
        .assign(data)
        .value();

    res.json(updated);
});

// API Routes go here


// POST     /users/:userId/plants
// PUT      /users/:userId/plants/:plantId
// DELETE   /users/:userId/plants/:plantId


// GET /users/:userId/plants
//  * Respond w/ the plants of the user with the specified userId.
app.get('/users/:userId/plants', auth, function (req, res) {
    var userId = req.params.userId;

    var results = db.get('plants').filter(function (plant) {
        return plant.userId === userId;
    }).value();

    res.json(results);
});

app.post('/users/:userId/plants', auth, function(req, res) {
    var userId = req.params.userId;

    var plant = {
        id: uuid(),
        userId: userId,
        plantDBId: req.body.plantDBId,
        name: req.body.name,
        timeLastWatered: req.body.timeLastWatered,
        img: req.body.img
    };

    db.get('plants').push(plant).value(); 

    res.json(plant);
});

app.put('/users/:id/plants/:plantId', function (req, res) {
    var plantId = req.params.plantId;

    var plant = db.get('plants')
        .find({ id: plantId });

    // If the timeLastWatered was updated, set message-sent to false
    if (req.body.timeLastWatered !== plant.value().timeLastWatered) {
        plant.assign({
            messageSent: false
        }).value();
    }

    plant.assign({ 
        name: req.body.name,
        timeLastWatered: req.body.timeLastWatered
    }).value();

    res.json(plant);
});

app.delete('/users/:userId/plants/:plantId', function (req, res) {
    var plantId = req.params.plantId;

    db.get('plants').remove(function (plant) {
        return plantId === plant.id;
    }).value();

    res.sendStatus(200);
});


app.listen(8000);

// Check for plant healths in DB and send notifications

function getMoistureUse (plant) {
    var use = plant.Moisture_Use;
    if (use === 'High') {
        return 0.04;
    } else if (use === 'Low') {
        return 0.01;
    } else {
        return 0.02;
    }
}

function getHealth (plant, callback) {
    var timeSinceLastWatering = (new Date().getTime() - plant.timeLastWatered) / 1000 / 60 / 60;

    superagent
        .get(plants.url() + '?id=' + plant.plantDBId)
        .end(function (err, response) {
            var moistureUse;
            var startDate;
            var endDate;

            if (err) {
                throw err;
            }
            
            response = JSON.parse(response.text);
            response = response.data[0];
            moistureUse = getMoistureUse(response.Moisture_Use);

            startDate = moment(plant.timeLastWatered).format('MMDD'); // 0726
            endDate = moment(new Date().getTime()).format('MMDD');

            weather.getAvgTemp(startDate, endDate, function(avgTemp) {
                var health = 100 - (timeSinceLastWatering * avgTemp * moistureUse);
                // Minimum lower limit
                if (health < 0) {
                    health = 0;
                }
                callback(Math.ceil(health));
            });
        });
}

function sendMessage (plant) {
    console.log('Sending message to ' + plant.userId);
    var userId = plant.userId;
    var user = db.get('users').find({ id: userId }).value();
    // var phone = user.phone;

    // TODO: Use twilio to send phone notification
    // Example of how to send a message reminder:
        // 
        // user.messages.create({ 
        //     to: "+16518675309", 
        //     from: "+18038324951", 
        //     body: "Water your plants!"  
        // }, function(err, message) { 
        //     console.log(message.sid); 
        // });
}

setInterval(function () {
    var plants = db.get('plants').value();

    plants.forEach(function (plant) {
        getHealth(plant, function (health) {
            if (health < 40 && !plant.messageSent) {
                sendMessage(plant);
                plant.messageSent = true;
            }
        });
    });
}, 3600000)