var _ = require('underscore');
var Backbone = require('backbone');
var PlantModel = require('./PlantModel');
var PlantDBModel = require('./PlantDBModel');

var PlantDetailView = Backbone.View.extend({

	className: 'plant-detail',

	events: {
		'click .toggle': 'flipCard',
		'keyup .edit-name': 'onNameChange'
	},

	initialize: function () {
		this.onNameChange = _.debounce(this.onNameChange, 5000).bind(this);
	},

	render: function () {
		this.$el.html(this.template({
			name: this.model.get('name'),
			commonName: this.model.plantDBModel.get('Common_Name'),
			duration: this.model.plantDBModel.get('Duration'),
			activeGrowthPeriod: this.model.plantDBModel.get('Active_Growth_Period'),
			health: this.model.getHealth()
		}));
	},

	template: function (data) {
		return `
			<div class="front">
				<div class="detail-img">
					<img src="${data.thumbail}">
				</div>
				<div class="detail-info">
					<h2 class="edit-name" contenteditable>${data.name}</h2>
					<h3>Health</h3>
					<div class="health-value">Health bar goes here</div>
				</div>
			</div>
			<div class="back">
				<h2>${data.commonName}</h2>
				<div class="duration">
					<h2>Duration</h2>
					<span>${data.duration}</span>
				</div>
				<div class="active-period">
					<h2>Active period</h2>
					<span>${data.activeGrowthPeriod}</span>
				</div>
			</div>
			<button class="toggle">Flip over</button>
		`;
	},


	flipCard: function () {
		this.$el.toggleClass('flipped');
	},

	onNameChange: function () {
		var name = this.$('.edit-name').text();

		this.model.set('name', name);

		this.model.save();
	}


});