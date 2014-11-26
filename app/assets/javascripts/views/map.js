LairBnB.Views.Map = Backbone.CompositeView.extend({
  initialize: function() {
  	window.view = this;
    // var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    // var mapOptions = {
    //   zoom: 4,
    //   center: myLatlng
    // }
    // var map = new google.maps.Map(that.el, mapOptions);
  },
  initMap: function(){
  	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    var mapOptions = {
      zoom: 4,
      center: myLatlng
    }
  	var map = new google.maps.Map(this.$('#map-box')[0], mapOptions);
  },

  template: JST['mappy'],

  render: function(){
  	var content = this.template();
  	this.$el.html(content);
  	this.initMap();
  	return this;
  }
});