LairBnB.Views.Map = Backbone.CompositeView.extend({
  id: 'map-element',

  initialize: function() {
  	window.view = this;
  },

  initMap: function(){
  	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    var mapOptions = {
      zoom: 4,
      center: myLatlng
    };
  	var map = new google.maps.Map(this.$el[0], mapOptions);

    // recenter map when window resizes
    var getCen = map.getCenter();
    google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(getCen);
    });
  },

  render: function(){
  	this.initMap();
  	return this;
  }
});