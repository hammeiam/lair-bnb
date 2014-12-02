LairBnB.Routers.Lairs = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'lairs/:lairId': 'lairShow',
		'search/(:locationQuery)': 'main'
	},

	lairShow: function(lairId){
		console.log('')
	},

	main: function(locationQuery, params){
		console.log('maiiin')
		var view = new LairBnB.Views.Main({
			location: locationQuery,
			router: this,
			params: params
		});
		this.$rootEl.html(view.render().$el);
		prepareSlider();
	}
});
