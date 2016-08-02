var Backbone = require('backbone');
var moment = require('moment');
var PlantModel = require('./PlantModel');
var PlantDBModel = require('./PlantDBModel');

var PlantListItemView = Backbone.View.extend({

	className: 'container',

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
				activePeriod: this.model.plantDBModel.get('Active_Growth_Period'),
				img: this.model.getImage()
			};
		
			this.$el.html(this.template(data));

			this.model.getHealth(function (health) {
				_this.$('.health').css('width', health + '%');
				// if the health is ...
				if(health < 40) {
					_this.$('.health-description').text('Very Poor Condition');
					_this.$('.health').addClass('red');
				} else if(health > 80) {
					_this.$('.health-description').text('Healthy');
					_this.$('.health').addClass('green');
				} else {
					_this.$('.health-description').text('Needs Attention Soon');
					_this.$('.health').addClass('yellow');
				}
			});
		}
	},

	template: function (data) {
		return `
		<div class="card">
			<div class="front">
				<div class="detail-img">
					<img src="${data.img}">
				</div>
				<div class="plant-info">
					<h5 class="plant-title">Name</h5> 
					<h4 class="plant-value">${data.name}</h4>
				</div>
				<div class="plant-info">
					<h5 class="plant-title">Health Status</h5> 
					<h4 class="plant-value health-description"></h4>
				</div>
				<div class="health-status-region">
					<div class="health"></div>
				</div>
				<div>Last Watered ${data.timeLastWatered}</div>
				<button class="edit">Edit</button>
				<button class="flip">Details</button>
			</div>
			<div class="back inactive">
				<div class="plant-info">
					<h5 class="plant-title">Common Name</h5> 
					<h4 class="plant-value">${data.commonName}</h4>
				</div>
				<div class="plant-info">
					<h5 class="plant-title">Scientific Name</h5> 
					<h4 class="plant-value">${data.scientificName}</h4>
				</div>
				<div class="plant-info">
					<h5 class="plant-title">Duration</h5> 
					<h4 class="plant-value">${data.Duration}</h4>
				</div>
				<div class="plant-info">
					<h5 class="plant-title">Active Period</h5> 
					<h4 class="plant-value">${data.activePeriod}</h4>
				</div>
				<button class="flip-again">Health</button>
			</div>
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