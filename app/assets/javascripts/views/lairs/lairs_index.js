LairBnB.Views.LairsIndex = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(LairBnB.lairs, 'add sync', this.render);
	},

  template: JST['lairs/index'],

  render: function(){
  	var content = this.template({
  		lairs: LairBnB.lairs
  	});
  	this.$el.html(content);
  	LairBnB.lairs.each(this.addLair.bind(this));
  	// this.attachSubviews();
  	return this;
  },

  addLair: function(lair){
  	var view = new LairBnB.Views.LairShow({
  		model: lair
  	});
  	this.addSubview('.lairs-list', view);
  }

});
