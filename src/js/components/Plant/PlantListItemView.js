var Backbone = require('backbone');
var moment = require('moment');
var PlantModel = require('./PlantModel');
var PlantDBModel = require('./PlantDBModel');

var PlantListItemView = Backbone.View.extend({

	className: 'plant-item',

	events: {
		'click .edit': 'onEditClick',
		'click .save': 'onSaveClick',
		'click .delete': 'onDeleteClick',
		'click .flip': 'onFlipClick',
		'click .flip-again': 'onFlipAgainClick'
	},

	initialize: function () {
        this.render = this.render.bind(this);
		this.editMode = false;
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model.plantDBModel, 'sync', this.render);

	},

	render: function () {
		var _this = this;
		var data;

		console.log(this.model.collection);

		if (this.editMode) {
			data = {
				name: this.model.get('name')
			};
			
			this.$el.html(this.editTemplate(data));
		} else {
			data = {
				name: this.model.get('name'),
				commonName: this.model.plantDBModel.get('Common_Name'),
				timeLastWatered: moment(this.model.get('timeLastWatered')).fromNow(),
				scientificName: this.model.plantDBModel.get('Scientific_Name_x'),
				Duration: this.model.plantDBModel.get('Duration'),
				activePeriod: this.model.plantDBModel.get('Active_Growth_Period')
				// healthStatus:
				// thumbnail: from a premade gallery
			};
		
			this.$el.html(this.template(data));
			this.model.getHealth(function (health) {
				_this.$('.health').text(health);
			});
		}
	},

	template: function (data) {
		return `
		<div class="front">
			<div class="detail-img">
				<img src="${data.thumbail}">
			</div>
			<div>Name: ${data.name}</div>
			<div>Common Name: ${data.commonName}</div>
			<div>timeLastWatered: Last Watered ${data.timeLastWatered}</div>
			<div class="health">Health Status</div>
			<button class="edit">Edit</button>
			<button class="flip">Flip</button>
		</div>
		<div class="back inactive">
			<div>Common Name: ${data.commonName}</div>
			<div>Scientific Name: ${data.scientificName}</div>
			<div class="duration">Duration: ${data.Duration}</div>
			<div class="active-period">Active period: ${data.activePeriod}</div>
			<button class="flip-again">Flip over</button>
		</div>
		
		`;
	},

	editTemplate: function (data) {
		return `
			<label for="name">Name:</label>
			<input class="name" type="text" value="${data.name}">
			<button class="save">Save</button>
			<button class="delete">Delete</button>
		`;
	},

	onEditClick: function () {
		this.editMode = true;
		this.render();
	},

	onSaveClick: function () {
		this.model.save({
			name: this.$('.name').val()
		});

		this.editMode = false;

		this.render();
	},

	onDeleteClick: function () {
		this.model.destroy();
	},

	onFlipClick: function () {
		this.showBack();
	},

	onFlipAgainClick: function () {
		this.hideBack();
	},

	showBack: function () {
		this.$('.back').removeClass('inactive');
		this.$('.front').addClass('inactive');
	},

	hideBack: function () {
		this.$('.back').addClass('inactive');
		this.$('.front').removeClass('inactive');
	}

});

module.exports = PlantListItemView;