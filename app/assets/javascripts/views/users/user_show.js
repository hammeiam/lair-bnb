LairBnB.Views.UserShow = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new LairBnB.Views.Nav({
      locationField: ''
    });
    var pendingView = new LairBnB.Views.ReservationsIndex({
    	collection: this.model.tripsCollection(),
    	reservationType: 'pending',
    	user: this.model
    });
    var approvedView = new LairBnB.Views.ReservationsIndex({
    	collection: this.model.tripsCollection(),
    	reservationType: 'approved',
    	user: this.model
    });
    var tripsView = new LairBnB.Views.TripsIndex({
    	collection: this.model.tripsCollection(),
    	user: this.model
    });
    var myLairsView = new LairBnB.Views.UserLairsIndex({
    	collection: this.model.myLairsCollection(),
    	user: this.model
    });
    
    this.addSubview('#nav-container', navView);
    this.addSubview('#pending-reservations-container', pendingView);
		this.addSubview('#approved-reservations-container', approvedView);
		this.addSubview('#trips-container', tripsView);
		this.addSubview('#my-lairs-container', myLairsView);
		
		this.listenTo(this.model, 'sync', this.render);
	},

	template: JST['users/show'],

	events: {
		'change input.location': 'submitNewSearch',
		'keypress input.location': 'checkForEnterSubmit'
	},

	render: function(){
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		
		this.model.tripsCollection().fetch();

		this.attachSubviews();
		return this;
	},

	checkForEnterSubmit: function(event){
		if(event.which == 13){
			this.submitNewSearch(event);
		}
	},

	submitNewSearch: function(event){
		event.preventDefault();
    var $field = $(event.currentTarget);
    var location = urlEncodeLocation($field.val());
    Backbone.history.navigate('/search/' + location, { trigger: true });
	}
})