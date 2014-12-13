LairBnB.Views.Nav = Backbone.CompositeView.extend({
	tagName: 'nav',
	className: 'lairbnb-nav',
	template: JST['nav'],
	attributes: {
		'role': 'navigation'
	},

	initialize: function(options){
		this.locationField = options.locationField;
		this.listenTo(LairBnB.users, 'sync add remove change', this.render)
	},

	events: {
		'click #logout': 'logout'
	},

	initSearch: function(){
		var input = this.$('#location-search');
		// if(this.query){
		// 	input.val(decodeLocationUrl(this.query));
		// }
		
  	autocomplete = new google.maps.places.Autocomplete(input[0], {types: ['geocode']});
  	var that = this;
  	google.maps.event.addListener(autocomplete, 'place_changed', function () {
  		var locationObj = autocomplete.getPlace();
  		that.updateSearchLocation(locationObj);
  	});
	},

	logout: function(){
		LairBnB.users.logout();
	},

	

	render: function(){
		var content = this.template({
			locationField: this.locationField,
			currentUser: LairBnB.users.currentUser()
		});
  	this.$el.html(content);
  	this.initSearch();
  	return this;
	},

	updateSearchLocation: function(locationObj){
		var locationStr = locationObj.formatted_address || locationObj.name;
		// change input text to trigger updateCollection event in main.js
		$('#location-search').html(locationStr).trigger('change');
		// var encodedLocation = urlEncodeLocation(locationStr);
		// this.router.navigate(encodedLocation, { trigger: false })
	}
});