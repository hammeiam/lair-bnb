LairBnB.Views.Nav = Backbone.CompositeView.extend({
	tagName: 'nav',
	className: 'lairbnb-nav',
	template: JST['nav'],
	attributes: {
		'role': 'navigation'
	},

	initialize: function(options){
		this.locationField = options.locationField;
		this.listenTo(LairBnB.users, 'sync add remove change reset', this.render);
	},

	events: {
		'click #signOut': 'signOut',
		'submit form#signIn': 'signIn'
	},

	initSearch: function(){
		var input = this.$('#location-search');
  	autocomplete = new google.maps.places.Autocomplete(input[0], {types: ['geocode']});
  	var that = this;
  	google.maps.event.addListener(autocomplete, 'place_changed', function () {
  		var locationObj = autocomplete.getPlace();
  		that.updateSearchLocation(locationObj);
  	});
	},

	signOut: function(){
		LairBnB.users.signOut();
	},

	signIn: function(event){
		event.preventDefault();
		var userData = $(event.currentTarget).serializeJSON();
		LairBnB.users.signIn(userData);
	},

	render: function(){
		var content = this.template({
			locationField: this.locationField,
			currentUser: LairBnB.users.currentUser()
		});
  	this.$el.html(content);
  	this.initSearch();
  	this.focusModals();
  	return this;
	},

	focusModals: function(){
		$('#signInModal').on('shown.bs.modal', function () {
	    $('#signInEmail').focus();
		});
		$('#signUpModal').on('shown.bs.modal', function () {
	    $('#signUpFirstName').focus();
		})
	},

	updateSearchLocation: function(locationObj){
		var locationStr = locationObj.formatted_address || locationObj.name;
		// change input text to trigger updateCollection event in main.js
		$('#location-search').html(locationStr).trigger('change');
		// var encodedLocation = urlEncodeLocation(locationStr);
		// this.router.navigate(encodedLocation, { trigger: false })
	}
});