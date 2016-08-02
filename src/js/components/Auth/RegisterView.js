var Backbone = require('backbone');
var $ = require('jquery');

var auth = require('./authController');

module.exports = Backbone.View.extend({

    className: 'login',

    events: {
        'click .register-button': 'onRegisterClick',
        'keyup :input': 'logKey',
        'click .back-button': 'handleBackClick'
    },

    render: function () {
        this.$el.html(this.template());
    },

    template: function () {
        return `
            <img src="images/logo.png">
            <button class="back-button">Back</button>
            <h3>Register</h3>
            <label for="username">Username</label>
            <input id="username" type="text" name="username">
            <label for="password">Password</label>
            <input id="password" type="text" name="password">
            <label for="phone">Phone Number</label>
            <input id="phone" type="text" name="phone">
            <label for="email">Email Address</label>
            <input id="email" type="text" name="email">
            <div id="error"></div>
            <button class="register-button">Register</button>
        `;
    },

    onRegisterClick: function () {
        var username  = this.$('#username').val();
        var password = this.$('#password').val();
        var email = this.$('#email').val();
        var phone = this.$('#phone').val();

        if (!username || !password || !email || !phone) {
            $('#error').html('All fields are required.');
        }

        if (username && password && email && phone) {
            this.trigger('submit', {
                username: username,
                password: password,
                email: email,
                phone: phone
            });
        }        
    },

    logKey: function () {
        $("#email").keyup(function(event){
            if(event.keyCode == 13){
                $(".register-button").click();
            }
        });
    },

    handleBackClick: function () {
        window.history.back();
    }

});