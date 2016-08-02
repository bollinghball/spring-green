var Backbone = require('backbone');
var moment = require('moment');
var PlantModel = require('./PlantModel');
var PlantDBModel = require('./PlantDBModel');
var $ = require('jquery');

var PlantListItemView = Backbone.View.extend({

	className: 'container',

	events: {
		'click .edit': 'onEditClick',
		'click .save': 'onSaveClick',
		'click .delete': 'onDeleteClick',
		'click .flip': 'onFlipClick',
		'click .flip-again': 'onFlipAgainClick',
		'keyup :input': 'logKey'
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
				name: this.model.get('name'),
				timeLastWatered: moment(this.model.get('timeLastWatered')).fromNow(),
				img: this.model.getImage()
			};
			this.$el.html(this.editTemplate(data));
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
				<div>Name: ${data.name}</div>
				<div>Last Watered ${data.timeLastWatered}</div>
				<h3>Health Status: </h3>
				<div class="health-description"></div>
				<div class="health-status-region">
					<div class="health"></div>
				</div>
				<button class="edit">Edit</button>
				<button class="flip">Details</button>
			</div>
			<div class="back inactive">
				<div>Common Name: ${data.commonName}</div>
				<div>Scientific Name: ${data.scientificName}</div>
				<div class="duration">Duration: ${data.Duration}</div>
				<div class="active-period">Active period: ${data.activePeriod}</div>
				<button class="flip-again">Health</button>
			</div>
		</div>
		`;
	},

	editTemplate: function (data) {
		return `
			<div class="card">
				<div class="front">
					<div class="detail-img">
						<img src="${data.img}">
					</div>
					<label for="name">Name:</label>
					<input id="name" type="text" value="${data.name}">
					<div>Last Watered ${data.timeLastWatered}</div>
					<h3>Health Status: </h3>
					<div class="health-description"></div>
					<div class="health-status-region">
						<div class="health"></div>
					</div>
					<button class="save">Save</button>
					<button class="delete">Delete</button>
				</div>
			</div>
			
		`;
	},

	onEditClick: function () {
		this.editMode = true;
		this.render();
	},

	onSaveClick: function () {
		this.model.save({
			name: this.$('#name').val()
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
	},

	logKey: function () {
        $("#name").keyup(function(event){
            if(event.keyCode == 13){
                $(".save").click();
            }
        });
    }

});

module.exports = PlantListItemView;