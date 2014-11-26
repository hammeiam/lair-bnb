window.LairBnB = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new LairBnB.Routers.Lairs({
    	$rootEl: $('main')
    });
    Backbone.history.start({
      root: '/s/'
    });
  }
};

$(document).ready(function(){
  LairBnB.initialize();
});
