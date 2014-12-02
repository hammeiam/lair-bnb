LairBnB.Routers.Lairs = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'(:locationQuery)': 'main'
	},

	main: function(locationQuery, params){
		var view = new LairBnB.Views.Main({
			location: locationQuery,
			router: this,
			params: params
		});
		this.$rootEl.html(view.render().$el);
		prepareSlider();
		
	}
});
