var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    urlRoot: '/users',

    defaults: {
        username: '',
        email: '',
        phone: '',
        emailNotifications: false,
        phoneNotifications: false
    },

    initialize: function () {
        this.loggedIn = false;
    },

    check: function (success, error) {
        var _this = this;
        
        var _success = function () {
            _this.loggedIn = true;
            success();
        };

        this.fetch({
            url: '/auth/check',
            success: _success,
            error: error
        });
    }

});