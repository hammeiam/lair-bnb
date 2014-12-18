LairBnB.Views.LairsIndex = Backbone.CompositeView.extend({
	initialize: function(options){
    this.currentPage = '';
		this.listenTo(LairBnB.lairs, 'add sync', this.render);
	},

  template: JST['lairs/index'],
  buttonTemplate: JST['lairs/indexButtons'],

  render: function(){
  	var content = this.template({
  		lairs: LairBnB.lairs
  	});
  	this.$el.html(content);
  	LairBnB.lairs.each(this.addLair.bind(this));
  	// this.attachSubviews();
    // initImagePlaceholders(this);
    this.addButtons();
  	return this;
  },

  addLair: function(lair){
  	var view = new LairBnB.Views.LairIndexItem({
  		model: lair
  	});
  	this.addSubview('.lairs-list', view);
  },

  addButtons: function(){
    var len = LairBnB.lairs.length;
    var perPage = LairBnB.lairs.per_page;
    var currentPage = LairBnB.lairs.currentPage || 1;
    var lairsSeen = ((currentPage - 1) * perPage) + len;
    if(currentPage > 1){
      var prevAllowed = '';
    } else {
      var prevAllowed = 'disabled';
    }
    if(lairsSeen < LairBnB.lairs.total_entries){
      var nextAllowed = ''
    } else {
      var nextAllowed = 'disabled'
    }

    var content = this.buttonTemplate({
      prevAllowed: prevAllowed,
      nextAllowed: nextAllowed
    });
    this.$('ul').append(content)
  }

});
