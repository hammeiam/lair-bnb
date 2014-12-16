LairBnB.Views.UserShow = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new LairBnB.Views.Nav({
      locationField: ''
    });
    var pendingView = new LairBnB.Views.ReservationsIndex({
    	collection: this.model.reservationsCollection(),
    	reservationType: 'pending',
    	user: this.model
    });
    var approvedView = new LairBnB.Views.ReservationsIndex({
    	collection: this.model.reservationsCollection(),
    	reservationType: 'approved',
    	user: this.model
    });
    var tripsView = new LairBnB.Views.TripsIndex({
    	collection: this.model.reservationsCollection(),
    	user: this.model
    });
    this.addSubview('#nav-container', navView);
    this.addSubview('#pending-reservations-container', pendingView);
		this.addSubview('#approved-reservations-container', approvedView);
		this.addSubview('#trips-container', tripsView);
		
		this.listenTo(this.model, 'sync', this.render);
	},

	template: JST['users/show'],

	events: {
		'change input.location': 'submitNewSearch',
		'keypress input.location': 'checkForEnterSubmit'
	},

	render: function(){
		console.log('user show rendered')
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		this.model.reservationsCollection().fetch();
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