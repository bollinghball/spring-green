var $ = require('jquery');
var Backbone = require('backbone');

var AppView = require('./components/App/AppView');
var AppRouter = require('./components/App/AppRouter');

var appRouter = new AppRouter();
var appView = new AppView();

appView.render();

$(document.body).append(appView.$el);

Backbone.history.start();