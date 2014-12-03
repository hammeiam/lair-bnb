LairBnB.Routers.Lairs = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'': 'home',
		'lairs/:lairId': 'lairShowAction',
		'search/(:locationQuery)': 'main'
	},

	home: function(){
		var view = new LairBnB.Views.Home();
		this.$rootEl.html(view.render().$el);
	},

	lairShowAction: function(lairId){
		var lair = LairBnB.lairs.getOrFetch(lairId);
		var view = new LairBnB.Views.LairShow({
			model: lair
		})
		this.$rootEl.html(view.render().$el);
	},

	main: function(locationQuery, params){
		var view = new LairBnB.Views.Main({
			location: locationQuery,
			router: this,
			params: params
		});
		this.$rootEl.html(view.render().$el);
	}
});
