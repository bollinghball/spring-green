var Backbone = require('backbone');

module.exports = Backbone.View.extend({

	tagName: 'header',

	className: 'cf',

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
		} else {
			this.$el.html(this.noAuthTemplate());
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
				<button>downarrow</button>
				<div class="account-options">
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

	noAuthTemplate: function () {
		return `
			<h1>Spring Green</h1>
			<nav>
				<a href="#/login">Log in</a>
			</nav>
		`;
	}

});