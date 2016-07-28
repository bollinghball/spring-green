var Backbone = require('backbone');

var auth = require('../Auth/authController');
var home = require('../Home/homeController');

module.exports = Backbone.Router.extend({

//setting up the client side routes
    routes: {
        '': 'home',
        'login': 'login',
        'logout': 'logout',
        'register': 'register',
        'home': 'home',
        'plants/create': 'createPlant'
    },

    login: function () {
        auth.showLogin();
    },

    logout: function () {
        auth.logout();
    },

    register: function () {
        auth.showRegister();
    },

    home: function () {
        auth.check(function () {
            home.showHome();
        });
    },

    createPlant: function () {
        auth.check(function () {
            home.showCreate();
        });
    }

});