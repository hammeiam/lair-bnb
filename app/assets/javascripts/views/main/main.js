LairBnB.Views.Main = Backbone.CompositeView.extend({
	initialize: function(options){
    var filters = this.parseParams(options.params);
    var decodedLocation = undefined;
    if(options.location){
      decodedLocation = decodeLocationUrl(options.location);
    } 
    this.collectionFilterParams = $.extend({}, {location: decodedLocation}, filters);
    this.router = options.router;

		var navView = new LairBnB.Views.Nav({
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
    'change input': 'handleUpdate',
    'change #slider': 'handleUpdate',
    'select #guests': 'handleUpdate'
  },

  template: JST['main'],

  id: 'main-content',

  render: function(){
    var content = this.template({
      query: this.query
    });
    this.$el.html(content);
    this.attachSubviews();
    this.updateCollection();
    return this;
  },

  handleUpdate: function(event){
    // prevent default, update url, update filterparams, fetch collection
    event.preventDefault();
    var $field = $(event.currentTarget);
    var inputHash = this.inputParser($field);
    this.updateViewVariables(inputHash);
    this.updateURI();
    this.updateCollection();
  },

  inputParser: function($field){
    // inputs: location, lair_type, price_range, checkin, checkout, guests
    var key = $field.attr('name');
    var output = {};

    if(key === 'price_range'){
      var pricesArr = $field.val();
      output['price_min'] = parseInt(pricesArr[0], 10);
      output['price_max'] = parseInt(pricesArr[1], 10);
    } else if(key === 'lair_type'){
       var val = $("[name='lair_type']:checked").map(function(){ 
          return $(this).val()
        }).get(); // array
        output[key] = val;
    } else if (!!key) {
      output[key] = $field.val();
    }
    return output; 
  },

  updateCollection: function(){
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
        var urlDecodedParam = decodeURIComponent(paramsArr[i]);
        var paramPair = urlDecodedParam.split('=');
        // output[paramPair[0]] = paramPair[1];
        var key = paramPair[0];
        var val = paramPair[1];
        if(key === 'lair_type[]'){
          if(!!output['lair_type']){
            output['lair_type'].push(val);
          }else{
            output['lair_type'] = [val];
          }
        }else{
          output[key] = val;
        }
      }
    }
    return output;
  },

  updateViewVariables: function(inputObj){
    for(i in inputObj){
      if(!!inputObj[i]){ 
        this.collectionFilterParams[i] = inputObj[i];
      } else {
        delete this.collectionFilterParams[i];
      }
    }
  },

  updateURI: function(){
    var locationStr;
    if(!!this.collectionFilterParams['location']){
      locationStr = urlEncodeLocation(this.collectionFilterParams['location']);
    } 
    // append all params except location
    var tempParams = jQuery.extend({}, this.collectionFilterParams);
    delete tempParams['location'];
    var filterParamsStr = $.param(tempParams); 
    if(!!filterParamsStr){
      filterParamsStr = '?' + filterParamsStr;
    };
    if(!!locationStr){
      this.router.navigate('/search/' + locationStr + filterParamsStr, { trigger: false });
    } else {
      this.router.navigate('/search/' + filterParamsStr, { trigger: false });
    }    
  }
});