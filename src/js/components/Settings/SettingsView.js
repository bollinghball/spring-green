var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

	className: 'settings-region',

	events: {
		'change': 'onChange',
		'keyup': 'onChange',
		'mouseup': 'onChange',
		'click .go-back': 'onGoBackClick',
		'click .delete-account': 'onDeleteClick',
		'click .save': 'onSaveClick'
	},

	initialize: function (options) {
		this.onChange = this.onChange.bind(this);
	},

	render: function () {
		var data = {
			phone: this.model.get('phone'),
			email: this.model.get('email'),
			emailNotifications: this.model.get('emailNotifications'),
			phoneNotifications: this.model.get('phoneNotifications'),
		};
		this.$el.html(this.template(data));
	},

	template: function (data) {
		return `
		<button class="go-back">< Back to My Plants</button>
		<h3>Settings</h3>
			<div class="phone">
				<label for="phone">Phone Number</label>
	            <input id="phone" type="text" name="phone" value="${data.phone}">
	        </div>
	        <div class="email">
	            <label for="email">Email Address</label>
	            <input id="email" type="text" name="email" value="${data.email}">
	        </div>
	        <div class="reminder">
	            <div class="reminders">How would you like to receive reminders to water your plants?</div>
	            <input id="email-button" type="checkbox" ${data.emailNotifications ? 'checked' : ''}>Email</input>
	            <input id="phone-button" type="checkbox" ${data.phoneNotifications ? 'checked' : ''}>Phone</input>
	        </div>
            <h3>What time would you like to receive reminders?</h3>
            <select name="time">
				<option value="12am">12:00 am</option>
				<option value="1am">1:00 am</option>
				<option value="2am">2:00 am</option>
				<option value="3am">3:00 am</option>
				<option value="4am">4:00 am</option>
				<option value="5am">5:00 am</option>
				<option value="6am">6:00 am</option>
				<option value="7am">7:00 am</option>
				<option value="8am">8:00 am</option>
				<option value="9am">9:00 am</option>
				<option value="10am">10:00 am</option>
				<option value="11am">11:00 am</option>
				<option value="12pm">12:00 pm</option>
				<option value="1pm">1:00 pm</option>
				<option value="2pm">2:00 pm</option>
				<option value="3pm">3:00 pm</option>
				<option value="4pm">4:00 pm</option>
				<option value="5pm">5:00 pm</option>
				<option value="6pm">6:00 pm</option>
				<option value="7pm">7:00 pm</option>
				<option value="8pm">8:00 pm</option>
				<option value="9pm">9:00 pm</option>
				<option value="10pm">10:00 pm</option>
				<option value="11pm">11:00 pm</option>
			</select>
			<button class="save">Save</button>
			<button class="delete-account">Delete Account</button>
		`;
	},

	onGoBackClick: function () {
		Backbone.history.navigate('home', { trigger: true });
	},

	onChange: _.debounce(function () {
		this.model.set({
			phone: this.$el.find('#phone').val(),
			email: this.$el.find('#email').val(),
			emailNotifications: this.$el.find('#email-button').is(':checked'),
			phoneNotifications: this.$el.find('#phone-button').is(':checked')
		});
		this.model.save();
	}, 500),

	onDeleteClick: function () {
		this.model.destroy();
		Backbone.history.navigate('logout', { trigger: true });
	},

	onSaveClick: function () {
		Backbone.history.navigate('home', { trigger: true });
	}

});