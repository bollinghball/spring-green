var $ = require('jquery');
var Backbone = require('backbone');

var LoginView = require('./LoginView');
var RegisterView = require('./RegisterView');
var UserModel = require('./UserModel');

module.exports = {

// identity of the user currently logged in
    userModel: new UserModel(),

    check: function (success) {
        var _this = this;

        this.userModel.check(success, function error() {
            Backbone.history.navigate('login', { trigger: true });
        });
    },

    login: function (credentials) {
        $.ajax('/auth/login', {
            method: 'POST',
            data: credentials,
            success: function () {
                Backbone.history.navigate('home', { trigger: true });
            },
            error: function () {
                throw new Error('There was an error logging in.');
            }
        });
    },

    logout: function () {
        $.ajax('/auth/login', {
            method: 'DELETE',
            success: function () {
                Backbone.history.navigate('login', { trigger: true });
            },
            error: function () {
                throw new Error('There was an error logging out.');
            }
        });
    },

    register: function (options) {
        var model = new UserModel(options);

        model.save(null, {
            success: function () {
                Backbone.history.navigate('login', { trigger: true });
            }
        });
    },

    showLogin: function () {
        var _this = this;
        var loginView = new LoginView();

        Backbone.trigger('app:showView', loginView);

        loginView.on('submit', function (options) {
            _this.login(options);
        });
    },

    showRegister: function () {
        var _this = this;
        var registerView = new RegisterView();

        Backbone.trigger('app:showView', registerView);

        registerView.on('submit', function (options) {
            _this.register(options);
        });
    }

};