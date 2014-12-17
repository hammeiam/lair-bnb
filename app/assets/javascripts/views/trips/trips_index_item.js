LairBnB.Views.TripsIndexItem = Backbone.View.extend({

  template: JST['trips/tripsIndexItem'],

  className: 'lair-result col-xs-3',

  render: function(){
  	var content = this.template({
      trip: this.model,
      lair: this.model.get(['lair'])
    });
  	this.$el.html(content);
  	return this;
  }
});