LairBnB.Views.TripsIndex = Backbone.CompositeView.extend({

  template: JST['trips/index'],

  initialize: function(){
  	// this.listenToOnce(this.collection, 'add remove', this.render);
    this.listenTo(this.collection, 'add', this.addTrip);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'sync', this.render)
    this.listenTo(this.collection, 'sync', this.this_sync);
    this.listenTo(this.collection, 'add', this.this_add);
    this.listenTo(this.collection, 'change', this.this_change);
    this.listenTo(this.collection, 'reset', this.this_reset);
    this.listenTo(this.collection, 'remove', this.this_remove);

  },
  this_sync: function(){
    console.log(' collection sync')
  },
  this_add: function(){
    console.log('collection add')
  },
  this_change: function(){
    console.log(' collection change')
  },
  this_reset: function(){
    console.log('collection reset')
  },
  this_remove: function(){
    console.log('collection remove')
  },

  render: function(){
    debugger
  	console.log('trips index rendered')
  	var content = this.template();
  	this.$el.html(content);
  	this.collection.each(this.addTrip.bind(this));
  	// this.attachSubviews();
  	return this;
  },

  addTrip: function(trip){
  	var view = new LairBnB.Views.TripIndexItem({
  		model: trip
  	});
  	this.addSubview('#trips-list', view);
  },

});
