LairBnB.Views.LairsIndex = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(LairBnB.lairs, 'add sync', this.render);
  	LairBnB.lairs.each(this.addLair.bind(this));
    this.listenTo(LairBnB.lairs, 'add', this.addLair);
  },

  template: JST['lairs/index'],

  render: function(){
    var content = this.template({
      lairs: LairBnB.lairs
    });
    this.$el.html(content);
  	this.attachSubviews();
  	return this;
  },

  renderSubviews: function () {
    // this.subviews.each(subviews, selector) {
      
    // }
  },

  addLair: function(lair){
  	var view = new LairBnB.Views.LairIndexItem({
  		model: lair
  	});
  	this.addSubview('.lairs-list', view);
  }

});
