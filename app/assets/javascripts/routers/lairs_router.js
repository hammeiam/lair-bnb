LairBnB.Routers.Lairs = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
		// this.$navBar = new LairBnB.Views.Nav({
		// 	$el: $('#nav'),
		// 	router: this
		// });
	},

	routes: {
		'(:query)': 'main'
	},

	main: function(query){
		var view = new LairBnB.Views.Main({
			query: query,
			router: this
			// pass in router?
		});
		this.$rootEl.html(view.render().$el);
	}
});
