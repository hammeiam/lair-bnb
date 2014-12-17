LairBnB.Views.UserLairsIndexItem = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
     this.listenTo(this.model, 'all', this.thing);
  },

  template: JST['lairs/userLairsIndexItem'],

  className: 'lair-result col-xs-4',

  render: function(){
  	var content = this.template({
      lair: this.model
    });
  	this.$el.html(content);
  	return this;
  },

  thing: function(){
    console.log('model synced')
  }
});