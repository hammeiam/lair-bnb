LairBnB.Views.TripsIndex = Backbone.CompositeView.extend({

  template: JST['trips/index'],

  initialize: function(options){
    this.reservationType = options['reservationType'];
    this.user = options['user'];
    this.listenTo(this.collection, 'sync', this.render);
  },
  
  render: function(){
    var userId = this.user.id;
    var reservationType = this.reservationType;
    var models = this.collection.filter(function(model){ 
        return model.get(['approval_status']) === reservationType && 
        model.get(['guest']).id === userId;
      });
  	var content = this.template({
      reservations: models,
      reservationType: this.reservationType
    });
  	this.$el.html(content);
    var that = this;
    _.each(models, this.addTrip.bind(that));
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
