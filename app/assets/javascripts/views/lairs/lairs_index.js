LairBnB.Views.LairsIndex = Backbone.View.extend({
	initialize: function(){
		this.listenTo(LairBnB.lairs, 'sync', this.render);
	},

  template: JST['lairs/index'],
  render: function(){
  	var content = this.template({
  		lairs: LairBnB.lairs
  	});
  	this.$el.html(content);
  	return this;
  }

});
