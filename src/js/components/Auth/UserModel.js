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

    check: function (success, error) {
        this.fetch({
            url: '/auth/check',
            success: success,
            error: error
        });
    }

});