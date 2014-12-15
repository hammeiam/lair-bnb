LairBnB.Views.TripsIndex = Backbone.CompositeView.extend({

  template: JST['trips/index'],

  initialize: function(){
  	this.listenToOnce(this.collection, 'add', this.render)
  },

  render: function(){
  	console.log('trips index rendered')
  	debugger
  	var content = this.template();
  	this.$el.html(content);
  	this.collection.each(this.addTrip.bind(this));
  	this.attachSubviews();
  	return this;
  },

  addTrip: function(trip){
  	var view = new LairBnB.Views.TripIndexItem({
  		model: trip
  	});
  	this.addSubview('#trips-list', view);
  },

});
