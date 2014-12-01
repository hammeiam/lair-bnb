LairBnB.Views.Main = Backbone.CompositeView.extend({
	initialize: function(options){
    var filters = this.parseParams(options.params);
    var decodedLocation = decodeLocationUrl(options.location);
    this.collectionFilterParams = $.extend({}, {location: decodedLocation}, filters);
    this.router = options.router;

		var navView = new LairBnB.Views.Nav({
      router: options.router,
      locationField: decodedLocation
    });
    this.addSubview('#nav-container', navView);

		var mapView = new LairBnB.Views.Map();
		this.addSubview('#map-container', mapView);

		var sidebarView = new LairBnB.Views.Sidebar({
      params: filters
    });
		this.addSubview('#sidebar-container', sidebarView);
	},

  events: {
    'change input': 'updateCollection'
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

  updateCollection: function(event){
    // prevent default, update url, update filterparams, fetch collection
    event.preventDefault();
    var $field = $(event.currentTarget)
    this.updateViewVariables($field);
    var collectionParams = this.collectionFilterParams;
    LairBnB.lairs.fetch({
      data: {
        search: collectionParams
      }
    })
    
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
  },

  updateURI: function(locationStr){
    // append all params except location
    var tempParams = jQuery.extend({}, this.collectionFilterParams);
    delete tempParams['location'];
    var filterParamsStr = $.param(tempParams); 
    if(!!filterParamsStr){
      filterParamsStr = '?' + filterParamsStr;
    };
    this.router.navigate(locationStr + filterParamsStr, { trigger: false });
  },

  updateViewVariables: function($field){
    var key = $field.attr('name');
    var val = $field.val();

    var locationStr;
    if(key === 'location'){
      var encodedLocation = urlEncodeLocation(val);
      // this.collectionFilterParams[key] = encodedLocation;
      locationStr = encodedLocation;
    } else {
      // this.collectionFilterParams[key] = val;
      locationStr = this.collectionFilterParams['location']; //Backbone.history.fragment.split('?')[0];
    }
    this.collectionFilterParams[key] = val;
    this.updateURI(locationStr);
  }
});