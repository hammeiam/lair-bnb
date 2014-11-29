LairBnB.Views.Main = Backbone.CompositeView.extend({
	initialize: function(options){
		this.query = options.query;

		var navView = new LairBnB.Views.Nav({
      // el: '#main-content',
      router: options.router,
      query: options.query
    });
    this.addSubview('#nav-container', navView);

		var mapView = new LairBnB.Views.Map();
		this.addSubview('#map-container', mapView);

		var sidebarView = new LairBnB.Views.Sidebar();
		this.addSubview('#sidebar-container', sidebarView);
	},

  template: JST['main'],

  id: 'main-content',
  // tagName: 'main',

  render: function(){
  	var content = this.template({
  		query: this.query
  	});
  	this.$el.html(content);
  	this.attachSubviews();
  	return this;
  }
});