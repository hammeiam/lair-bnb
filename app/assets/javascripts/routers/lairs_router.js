LairBnB.Routers.Lairs = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		// this.$navBar = new LairBnB.Views.Nav({
		// 	$el: $('#nav'),
		// 	router: this
		// });
	},

	routes: {
		'(:locationQuery)': 'main'
	},

	main: function(locationQuery, params){
		var view = new LairBnB.Views.Main({
			location: {location: locationQuery},
			router: this,
			params: params
		});
		this.$rootEl.html(view.render().$el);
	}
});
