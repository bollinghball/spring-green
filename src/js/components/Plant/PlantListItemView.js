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

			// if (this.$('.front').height() > this.$('.back').height()) {
			// 	this.$('.back').height = this.$('.front').height;
			// }
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
				<div class="last-watered">Last Watered ${data.timeLastWatered}</div>
				<button class="edit">Edit</button>
				<button class="flip">Details</button>
			</div>
			<div class="back">
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
				<button class="flip">Health</button>
			</div>
		</div>
		`;
	},

	editTemplate: function (data) {
		return `
			<button class="delete">X</button>
			<div class="card">
				<div class="front">
					<div class="detail-img">
						<img src="${data.img}">
					</div>
					<div class="plant-info">
						<label for="name">Name</label>
						<input id="name" type="text" value="${data.name}">
					</div>
					<div class="plant-info">
						<h5 class="plant-title">Health Status</h5> 
						<h4 class="plant-value health-description"></h4>
					</div>
					<div class="health-status-region">
						<div class="health"></div>
					</div>
					<div class="last-watered">Last Watered ${data.timeLastWatered}</div>
					<button class="save">Save</button>
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
		var _this = this;
		this.$('.card').fadeOut(1200, function () {
			_this.model.destroy();
		});
	},

	onFlipClick: function () {
		this.$('.card').toggleClass('flipped');
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