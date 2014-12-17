LairBnB.Views.UserLairsIndex = Backbone.CompositeView.extend({
	initialize: function(options){
		this.user = options['user'];
		this.collection.each(this.addLair.bind(this));
		// this.listenTo(this.collection, 'all', this.thing);
		this.listenTo(this.collection, 'add', this.addLair);

// 		this.listenTo(this.collection, 'sync', this.this_sync);
// this.listenTo(this.collection, 'add', this.this_add);
// this.listenTo(this.collection, 'change', this.this_change);
// this.listenTo(this.collection, 'reset', this.this_reset);
// this.listenTo(this.collection, 'remove', this.this_remove);
		setTimeout(function(){
			window.a = this.collection
		}.bind(this),5000)
		
	},

	template: JST['lairs/userLairsIndex'],
	this_sync: function(){
  console.log('sync')
},
this_add: function(){
  console.log('add')
},
this_change: function(){
  console.log('change')
},
this_reset: function(){
  console.log('reset')
},
this_remove: function(){
  console.log('remove')
},

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

	thing: function(){
		console.log('collection alld')
	},

	addLair: function(lair){
		console.log('collection changed')
  	var view = new LairBnB.Views.UserLairsIndexItem({
  		model: lair,
  		user: this.user
  	});
  	this.addSubview('.my-lairs-list', view);
  	this.render();
  },
});