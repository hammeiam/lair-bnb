LairBnB.Routers.Lairs = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl
	},
	routes: {
		'(:query)': 'main'
	},

	main: function(query){
		var view = new LairBnB.Views.Main({
			query: query
		});
		this.$rootEl.html(view.render().$el);
	}
});
