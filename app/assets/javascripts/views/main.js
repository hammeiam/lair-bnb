LairBnB.Views.Main = Backbone.View.extend({
	initialize: function(options){
		debugger
	},

  template: JST['main'],
  render: function(){
  	var content = this.template({
  		query: this.query
  	});
  	this.$el.html()
  }

});