LairBnB.Routers.Lairs = Backbone.Router.extend({
	initialize: function(options){
		this.$rootEl = options.$rootEl;
	},

	routes: {
		'': 'home',
		'lairs/:lairId': 'lairShowAction',
		'search/(:locationQuery)': 'mainShowAction',
		'users/:userId': 'userShowAction',
		'*notFound': 'notFound'
	},

	home: function(){
		var view = new LairBnB.Views.Home();
		this._swapView(view, 'Home');
	},

	lairShowAction: function(lairId){
		var lair = LairBnB.lairs.getOrFetch(lairId);
		var view = new LairBnB.Views.LairShow({
			model: lair
		})
		this._swapView(view, 'Lair: ' + lairId);
	},

	mainShowAction: function(locationQuery, params){
		var view = new LairBnB.Views.Main({
			location: locationQuery,
			router: this,
			params: params
		});
		this._swapView(view, 'Search');
	},

	userShowAction: function(userId){
		var user;
		if(LairBnB.currentUser && LairBnB.currentUser.id === parseInt(userId, 10)){
			user = LairBnB.currentUser
		} else {
			user = LairBnB.users.getOrFetch(userId);
		}
		var view = new LairBnB.Views.UserShow({	
			model: user
		});
		this._swapView(view, 'User: ' + userId);
	},

	notFound: function(){
		var view = new LairBnB.Views.Home();
		this._swapView(view, '404');
		showAlert({
			alertClass: 'alert-danger',
			alertMessage: 'Page not found'
		})
		Backbone.history.navigate('', { trigger: false })
	},

	_swapView: function (view, title) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
    this.trackPageview(title);
  },

  trackPageview: function (title){
  	if(!!window.ga){
	    var url = Backbone.history.getFragment();
	    //prepend slash
	    if (!/^\//.test(url) && url != ""){
	      url = "/" + url;
	    };
	    // _gaq.push(['_trackPageview', url]);
	    ga('send', 'pageview', {
			  'page': url,
			  'title': title
			});
	  };
   }


});
