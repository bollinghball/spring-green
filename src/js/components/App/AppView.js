var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'main',

    className: 'app',

    initialize: function () {
        this.pageView = null;
        Backbone.on('app:showView', this.show.bind(this));
    },

    render: function () {
        this.$el.html(this.template());
    },

    template: function () {
        return `
            <div class="page-region"></div>
        `;
    },

    show: function (view) {
        if (this.pageView) {
            this.pageView.remove();
        }
        
        this.pageView = view;

        view.render();
        
        this.$('.page-region').append(view.el);
    }

});