var Backbone = require('backbone');
var $ = require('jquery');
var AppRouter = require('../App/AppRouter');
var auth = require('./authController');

module.exports = Backbone.View.extend({

    className: 'login',

    events: {
        'click .register-button': 'onRegisterClick',
        'keyup :input': 'logKey',
        'click .register-back-button': 'handleBackClick'
    },

    render: function () {
        this.$el.html(this.template());
    },

    template: function () {
        return `
            <div>
                <img src="assets/images/springgreenlogo.svg">
                <div class="username">
                    <label for="username">Username</label>
                    <input id="username" type="text" name="username">
                </div>
                <div class="password">
                    <label for="password">Password</label>
                    <input id="password" type="text" name="password">
                </div>
                <div class="phone">
                    <label for="phone">Phone Number</label>
                    <input id="phone" type="text" name="phone">
                </div>
                <div class="email">
                    <label for="email">Email Address</label>
                    <input id="email" type="text" name="email">
                </div>
                <div id="error"></div>
                <button class="register-button">Register</button>
                <button class="register-back-button">Back</button>
            </div>
            
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