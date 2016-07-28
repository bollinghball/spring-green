var Backbone = require('backbone');

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
            <button class="login-button">Login</button>
            <a href="#/register">Register</a>
        `;
    },

    onLoginClick: function () {
        this.trigger('submit', {
            username: this.$('#username').val(),
            password: this.$('#password').val()
        });
    }

});