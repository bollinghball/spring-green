var Backbone = require('backbone');

module.exports = Backbone.View.extend({

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
			<h1>Spring Green</h1>
			<nav>
				<span>Hi, ${data.username}</span>
				<ul>
					<li>
						<a href="#/settings">Settings</a>
					</li>
					<li>
						<a href="#/logout">Logout</a>
					</li>
				</ul>
			</nav>
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