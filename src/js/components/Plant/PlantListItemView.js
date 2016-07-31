var Backbone = require('backbone');
var moment = require('moment');
var PlantModel = require('./PlantModel');
var PlantDBModel = require('./PlantDBModel');

var PlantListItemView = Backbone.View.extend({

	className: 'card',

	events: {
		'click .edit': 'onEditClick',
		'click .save': 'onSaveClick',
		'click .delete': 'onDeleteClick'
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
			<div>Name: ${data.name}</div>
			<div>Common Name: ${data.commonName}</div>
			<div>timeLastWatered: Last Watered ${data.timeLastWatered}</div>
			<div class="health">Health Status</div>
			<button class="edit">Edit</button>
			<button class="edit">Flip</button>
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

	}

});

module.exports = PlantListItemView;