LairBnB.Views.Map = Backbone.CompositeView.extend({
  id: 'map-element',

  initialize: function() {
  	window.view = this;
    this.listenTo(LairBnB.lairs, 'sync', this.renderMarkers)
  },

  initMap: function(){
  	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    var mapOptions = {
      zoom: 4,
      center: myLatlng
    };
  	this.map = new google.maps.Map(this.$el[0], mapOptions);
    var map = this.map;

    // recenter map when window resizes
    var getCen = map.getCenter();
    google.maps.event.addDomListener(window, 'resize', function() {
      map.setCenter(getCen);
    });
  },

  renderMarkers: function(){
    var that = this;
    _.each(LairBnB.lairs.models, function(lair){
      that.addMarker(lair.escape('latitude'),lair.escape('longitude'))
    })
  },

  addMarker: function(lat, lng){
    var latlng = new google.maps.LatLng(lat, lng);
    var map = this.map;
    var marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
    marker.setMap(map);

  },

  render: function(){
  	this.initMap();
    this.renderMarkers()
  	return this;
  }
});