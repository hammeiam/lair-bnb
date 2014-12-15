LairBnB.Views.TripsIndex = Backbone.CompositeView.extend({

  template: JST['trips/index'],

  initialize: function(options){
    this.viewType = options['viewType']
    // this.listenTo(this.collection, 'add', this.addTrip);
    this.listenTo(this.collection, 'localUpdate', this.render);
    this.viewCollection = new LairBnB.Collections.Trips([])
    this.listenTo(this.viewCollection, 'sync', this.render);

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
    var viewType = this.viewType
    var models = this.collection.where({approval_status: viewType});
    this.viewCollection.set(models)
  	var content = this.template();
  	this.$el.html(content);
  	this.viewCollection.each(this.addTrip.bind(this));
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
