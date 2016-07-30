var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

	events: {
		'change': 'onChange',
		'keyup': 'onChange',
		'mouseup': 'onChange',
		'click .go-back': 'onGoBackClick',
		'click .delete-account': 'onDeleteClick',
		'click #email-button': 'onEmailClick',
		'click #phone-button': 'onPhoneClick'
	},

	initialize: function (options) {
		this.onChange = this.onChange.bind(this);
	},

	render: function () {
		console.log(this.model.attributes);
		var data = {
			phone: this.model.get('phone'),
			email: this.model.get('email')
		};
		this.$el.html(this.template(data));
	},

	template: function (data) {
		return `
			<button class="go-back">My Plants</button>
			<label for="phone">Phone Number</label>
            <input id="phone" type="text" name="phone" value="${data.phone}">
            <label for="email">Email Address</label>
            <input id="email" type="text" name="email" value="${data.email}">
            <div class="reminders">How would you like to receive reminders to water your plants?</div>
            <input id="email-button" type="radio" name="radio" value="${data.emailNotifications}">Email</input>
            <input id="phone-button" type="radio" name="radio" value="${data.phoneNotifications}">Phone</input>
		`;
	},

	onGoBackClick: function () {
		Backbone.history.navigate('home', { trigger: true });
	},

	onChange: _.debounce(function () {
		this.model.set({
			phone: this.$el.find('#phone').val(),
			email: this.$el.find('#email').val()
		});
		this.model.save();
	}, 1000),

	onDeleteClick: function () {
		this.model.destroy();
		Backbone.history.navigate('logout', { trigger: true });
	},

	onEmailClick: function () {
		this.model.set({
			emailNotifications: true
		});
		this.model.save();
	},

	onPhoneClick: function () {
		this.model.set({
			phoneNotifications: true
		});
		this.model.save();
	}

});