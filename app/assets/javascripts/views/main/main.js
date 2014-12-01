LairBnB.Views.Main = Backbone.CompositeView.extend({
	initialize: function(options){
    var filters = this.parseParams(options.params);
		var location = options.location;
    this.collectionFilterParams = $.extend({}, location, filters)

		var navView = new LairBnB.Views.Nav({
      router: options.router,
      query: options.query
    });
    this.addSubview('#nav-container', navView);

		var mapView = new LairBnB.Views.Map();
		this.addSubview('#map-container', mapView);

		var sidebarView = new LairBnB.Views.Sidebar();
		this.addSubview('#sidebar-container', sidebarView);
	},

  events: {
    'change input': 'updateCollection'
  },

  updateCollection: function(event){
    // prevent default, update url, update filterparams, fetch collection
    event.preventDefault();
    var $field = $(event.currentTarget)
    debugger
    // this.router.navigate(, { trigger: false })
    console.log($field.val())
  },

  template: JST['main'],

  id: 'main-content',

  render: function(){
  	var content = this.template({
  		query: this.query
  	});
  	this.$el.html(content);
  	this.attachSubviews();
  	return this;
  },

  parseParams: function(params){
    var output = {};
    // check if params is not null, undefined, or empty
    if(!!params){
      paramsArr = params.split('&');
      for(var i = 0; i < paramsArr.length ; i++){
        var paramPair = paramsArr[i].split('=');
        output[paramPair[0]] = paramPair[1];
      }
    }
    return output;
  }
});