window.LairBnB = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new LairBnB.Routers.Lairs({
      $rootEl: $('#content-wrapper')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  LairBnB.initialize();
});