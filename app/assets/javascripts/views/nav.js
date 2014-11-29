LairBnB.Views.Nav = Backbone.CompositeView.extend({
	tagName: 'nav',
	className: 'navbar navbar-default',
	attributes: {
		'role': 'navigation'
	},

	initialize: function(options){
		this.router = options.router;
		this.query = options.query;
	},

	initSearch: function(){
		var input = this.$('#location-search');
		if(this.query){
			input.val(decodeLocationUrl(this.query));
		}
		
  	autocomplete = new google.maps.places.Autocomplete(input[0], {types: ['geocode']});
  	// this could maybe also be accomplished with a submit listener
  	var that = this;
  	google.maps.event.addListener(autocomplete, 'place_changed', function () {
  		var locationObj = autocomplete.getPlace();
  		that.updateSearchLocation(locationObj);
  	});
	},

	events:{
		'submit form': 'handleSubmit'
	},

	handleSubmit: function(event){
		event.preventDefault();
	},

	template: JST['nav'],

	render: function(){
		var content = this.template();
  	this.$el.html(content);
  	this.initSearch();
  	return this;
	},

	updateSearchLocation: function(locationObj){
		var locationStr = locationObj.formatted_address || locationObj.name;
		var encodedLocation = urlEncodeLocation(locationStr);
		this.router.navigate(encodedLocation, { trigger: false })
	}
});