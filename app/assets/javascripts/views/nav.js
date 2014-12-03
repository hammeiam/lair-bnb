LairBnB.Views.Nav = Backbone.CompositeView.extend({
	tagName: 'nav',
	className: 'navbar navbar-default',
	attributes: {
		'role': 'navigation'
	},

	initialize: function(options){
		this.locationField = options.locationField;
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

	template: JST['nav'],

	render: function(){
		var content = this.template({
			locationField: this.locationField
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