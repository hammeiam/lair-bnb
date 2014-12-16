LairBnB.Views.TripsIndex = Backbone.CompositeView.extend({

  template: JST['trips/index'],

  initialize: function(options){
    this.reservationType = options['reservationType']
    this.listenTo(this.collection, 'localUpdate', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.viewCollection = new LairBnB.Collections.Trips([],{
      comparator: 'check_in_date'
    })
    this.listenTo(this.viewCollection, 'sync', this.render);
  },

  render: function(){
    var models = this.collection.where({approval_status: this.reservationType});
    this.viewCollection.set(models);
  	var content = this.template({
      reservations: this.viewCollection,
      reservationType: this.reservationType
    });
  	this.$el.html(content);
  	this.viewCollection.each(this.addTrip.bind(this));
    initTripsCarousel(this,'.trips-list');
  	// this.attachSubviews();
  	return this;
  },

  addTrip: function(trip){
  	var view = new LairBnB.Views.TripIndexItem({
  		model: trip
  	});
  	this.addSubview('.trips-list', view);
  },

});
