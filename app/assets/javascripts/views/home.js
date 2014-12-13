LairBnB.Views.Home = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new LairBnB.Views.Nav({
			locationField:''
		});
    this.addSubview('#nav-container', navView);
	},
	className: 'front-page',

	template: JST['home'],

	events: {
		'submit form': 'handleSubmit'
	},

	render: function(){
		var content = this.template();
		this.$el.html(content);
		initDatePicker(this);
		this.initSearch();
	  // $(document).tooltip({
	  // 	position: { my: "left top+15", at: "left bottom", collision: "flipfit" }
	  // });
  	this.$('[data-toggle="tooltip"]').tooltip();
		return this;
	},

	handleSubmit: function(event){
		event.preventDefault();
		var formContent = $(event.currentTarget).serializeJSON();
		var encodedLocation = urlEncodeLocation(formContent['location']);
		Backbone.history.navigate('/search/' + encodedLocation, {trigger: true} )

	},

	initSearch: function(){
		var input = this.$('#location-search');
  	autocomplete = new google.maps.places.Autocomplete(input[0], {types: ['geocode']});
  	var that = this;
  	google.maps.event.addListener(autocomplete, 'place_changed', function () {
  		var locationObj = autocomplete.getPlace();
  		// that.updateSearchLocation(locationObj);
  	});
	},
});