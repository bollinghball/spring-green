var Backbone = require('backbone');

module.exports = Backbone.View.extend({

	tagName: 'header',

	className: 'cf',

	events: {
		'click #downarrow': 'onSettingsClick',
		'click #downarrow.showing-settings': 'onSettingsClickAgain'
	},

	initialize: function () {
		this.render = this.render.bind(this);
		this.listenTo(this.model, 'sync change', this.render);
	},

	render: function () {
		var data = {
			username: this.model.get('username')
		};

		if (this.model.loggedIn) {
			this.$el.html(this.template(data));
			this.$el.show();
		} else {
			this.$el.hide();
		}
	},

	template: function (data) {
		return `
			<div class="logo">
				<img src="assets/images/springgreenlogo.svg">
			</div>
			<div class="account">
				<img src="assets/images/loginicon.svg">
				<span>Hi, ${data.username}</span>
				<button id="downarrow"><img src="assets/images/downarrow.png"></button>
				<div class="account-options inactive">
					<ul>
						<li>
							<a href="#/settings">Settings</a>
						</li>
						<li>
							<a href="#/logout">Logout</a>
						</li>
					</ul>
				</div>
		`;
	},

	showSettings: function () {
		this.$('.account-options').removeClass('inactive');
		this.$('#downarrow').addClass('showing-settings');
	},

	hideSettings: function () {
		this.$('.account-options').addClass('inactive');
		this.$('#downarrow').removeClass('showing-settings');
	},

	onSettingsClick: function () {
		this.showSettings();
	},

	onSettingsClickAgain: function () {
		this.hideSettings();
	}

});