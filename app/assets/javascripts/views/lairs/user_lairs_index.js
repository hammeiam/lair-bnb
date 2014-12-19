LairBnB.Views.UserLairsIndex = Backbone.CompositeView.extend({
	initialize: function(options){
		this.user = options['user'];
		this.collection.each(this.addLair.bind(this));
		this.listenTo(this.collection, 'add', this.addLair);
	},

	template: JST['lairs/userLairsIndex'],

	render: function(){
		var content = this.template({
			lairs: this.collection,
			user: this.user
		});
		this.$el.html(content);
		// this.collection.each(this.addLair.bind(this));
    initTripsCarousel(this,'.my-lairs-list');
    this.attachSubviews();
		return this;
	},

	addLair: function(lair){
  	var view = new LairBnB.Views.UserLairsIndexItem({
  		model: lair,
  		user: this.user
  	});
  	this.addSubview('.my-lairs-list', view);
  	this.render();
  }
});