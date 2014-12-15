LairBnB.Views.TripIndexItem = Backbone.View.extend({

  template: JST['trips/indexItem'],

  initialize: function(){
  },

  tagName: 'li',
  className: 'lair-result col-xs-3',

  render: function(){
    console.log('trip rendered')
  	var content = this.template({
      reservation: this.model,
      lair: this.model.get(['lair']),
      guest: this.model.get(['guest'])
    });
  	this.$el.html(content);
  	return this;
  }

});