function View (data) {
    this.data = data;
    this.el = $('<div></div>');
}

/**
* AppView
*/

function AppView (images) {
    View.call(this, images);
    this.imageGall = 0;
}

AppView.prototype = Object.create(View.prototype);

AppView.prototype.render = function () {
    var fullView = new FullView();
    var galleryView = new GalleryView(this.data, function (url) {
        // Take the url from galleryView and call fullView.show with it
        fullView.show(url);
    });
    
    fullView.render();
    galleryView.render();

    this.el.append(fullView.el);
    this.el.append(galleryView.el);

    fullView.show(this.data[0].image);
};

/**
* GalleryView
*/

function GalleryView (images, callback) {
    View.call(this, images);
    this.callback = callback;
}

GalleryView.prototype = Object.create(View.prototype);

GalleryView.prototype.render = function () {
    var _this = this;
    var thumbnail;

    this.el.addClass('gallery');

    for (var i = 0; i < this.data.length; i++) {
        thumbnail = $('<img/>');
        thumbnail.attr('src', this.data[i].image);
        this.el.append(thumbnail);
    }

    this.el.on('click', 'img', function (e) {
        var url = $(e.target).attr('src');
        _this.callback(url);
    });
};

/**
* FullView
*/

function FullView () {
    View.call(this);
}

FullView.prototype = Object.create(View.prototype);

// Change the src attribute of the img.display element inside
FullView.prototype.show = function (url) {
    var tada = this.el.find('.full');
    tada.css('background-image', 'url(' + url + ')');
    // var display = this.el.find('.display');
    // display.attr('src', url);
};

FullView.prototype.render = function () {
    this.el.addClass('header');
    this.el.html(`
        <h3>&copy; Oasis Gallery</h3>
        <div class="full"></div>
    `);
    this.el.on('click', '.full', function (e) {
        $(e.target).toggleClass('full-full');
    });
};

var imageGall = [
    {
        image: 'images/wave1.jpg'
    },
    {
        image: 'images/wave2.jpg'
    },

    {
        image: 'images/wave3.jpeg'
    },

    {
        image: 'images/wave4.jpg'
    },

    {
        image: 'images/wave5.jpg'
    }
];

var appView = new AppView(imageGall);

appView.render();

$(document.body).append(appView.el);