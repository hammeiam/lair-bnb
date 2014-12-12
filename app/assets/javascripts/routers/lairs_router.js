LairBnB.Routers.Lairs = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'': 'home',
		'lairs/:lairId': 'lairShowAction',
		'search/(:locationQuery)': 'mainShowAction',
		'users/:userId': 'userShowAction'
	},

	home: function(){
		var view = new LairBnB.Views.Home();
		this._swapView(view);
	},

	lairShowAction: function(lairId){
		var lair = LairBnB.lairs.getOrFetch(lairId);
		var view = new LairBnB.Views.LairShow({
			model: lair
		})
		this._swapView(view);
	},

	mainShowAction: function(locationQuery, params){
		var view = new LairBnB.Views.Main({
			location: locationQuery,
			router: this,
			params: params
		});
		this._swapView(view);
	},

	userShowAction: function(userId){
		var user;
		debugger
		if(LairBnB.currentUser && LairBnB.currentUser.id === parseInt(userId, 10)){
			user = LairBnB.currentUser
		} else {
			user = LairBnB.users.getOrFetch(userId);
		}
		var view = new LairBnB.Views.UserShow({	
			model: user
		});
		this._swapView(view);
	},

	_swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }


});
