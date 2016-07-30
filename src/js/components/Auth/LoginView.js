var Backbone = require('backbone');
var $ = require('jquery');
var auth = require('./authController');

module.exports = Backbone.View.extend({

    className: 'login',

    events: {
        'click .login-button': 'onLoginClick'
    },

    render: function () {
        this.$el.html(this.template());
    },

    template: function () {
        return `
            <img src="images/logo.png">
            <h3>Login</h3>
            <label for="username">Username</label>
            <input id="username" type="text" name="username">
            <label for="password">Password</label>
            <input id="password" type="text" name="password">
            <div id="error"></div>
            <button class="login-button">Login</button>
            <a href="#/register">Register</a>
        `;
    },

    onLoginClick: function () {
        var username  = this.$('#username').val();
        var password = this.$('#password').val();

        if (!username || !password) {
            $('#error').html('Both fields are required.');
        }

        if (username && password) {
            this.trigger('submit', {
                username: username,
                password: password
            });
        }
    }

});