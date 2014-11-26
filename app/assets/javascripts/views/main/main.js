LairBnB.Views.Main = Backbone.CompositeView.extend({
	initialize: function(options){
		this.query = options.query;
		
		var mapView = new LairBnB.Views.Map();
		this.addSubview('#map', mapView);
		// var sidebarView = new LairBnB.Views.Sidebar();
		// this.addSubview('#sidebar', sidebarView);
	},

  template: JST['main'],
  id: 'main-content',
  render: function(){
  	var content = this.template({
  		query: this.query
  	});
  	this.$el.html(content);
  	this.attachSubviews();
  	return this;
  }

});