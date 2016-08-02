var Backbone = require('backbone');
var NavView = require('../Nav/NavView');
var PlantWaterView = require('../Plant/PlantWaterView');

module.exports = Backbone.View.extend({

    tagName: 'main',

    className: 'app',

    initialize: function (options) {
        this.pageView = null;
        this.navView = new NavView({
            model: options.userModel
        });
        Backbone.on('app:showView', this.show.bind(this));
        this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
        this.$el.html(this.template());
        this.navView.render();
        this.$el.find('.nav-region').append(this.navView.el);
        this.showWater();
    },

    template: function () {
        return `
            <div class="nav-region"></div>
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
    },

    showWater: function () {

        this.$('.app').addClass('visible');
    }

});