var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

	className: 'settings-region',

	events: {
		'change': 'onChange',
		'keyup': 'onChange',
		'mouseup': 'onChange',
		'click .go-back': 'onGoBackClick',
		'click .delete-account': 'onDeleteClick'
	},

	initialize: function (options) {
		this.onChange = this.onChange.bind(this);
	},

	render: function () {
		console.log(this.model.attributes);
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
			<button class="go-back">My Plants</button>
			<h3>Settings</h3>
			<div class="phone">
				<label for="phone">Phone Number</label>
	            <input id="phone" type="text" name="phone" value="${data.phone}">
	        </div>
	        <div class="email">
	            <label for="email">Email Address</label>
	            <input id="email" type="text" name="email" value="${data.email}">
	        </div>
	        <div class="reminders">
	            <div class="reminders">How would you like to receive reminders to water your plants?</div>
	            <input id="email-button" type="checkbox" ${data.emailNotifications ? 'checked' : ''}>Email</input>
	            <input id="phone-button" type="checkbox" ${data.phoneNotifications ? 'checked' : ''}>Phone</input>
	        </div>
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
		console.log(this.model);
		this.model.save();
	}, 500),

	onDeleteClick: function () {
		this.model.destroy();
		Backbone.history.navigate('logout', { trigger: true });
	}

});