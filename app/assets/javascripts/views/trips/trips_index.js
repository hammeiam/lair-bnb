LairBnB.Views.TripsIndex = Backbone.CompositeView.extend({

  template: JST['trips/tripsIndex'],

  initialize: function(options){
    this.user = options['user'];
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function(){
    var userId = this.user.id;
    var models = this.collection.filter(function(model){ 
        return model.get(['guest']).id === userId;
      });
  	var content = this.template({
      trips: models,
    });
  	this.$el.html(content);
    var that = this;
    _.each(models, this.addTrip.bind(that));
    initTripsCarousel(this,'.trips-list');
  	// this.attachSubviews();
  	return this;
  },

  addTrip: function(trip){
  	var view = new LairBnB.Views.TripsIndexItem({
  		model: trip
  	});
  	this.addSubview('.trips-list', view);
  },
});
