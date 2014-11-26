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
		this._swapView(view);
	},

	_swapView: function(view){
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	}
});
