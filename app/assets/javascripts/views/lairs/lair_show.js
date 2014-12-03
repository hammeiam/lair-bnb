LairBnB.Views.LairShow = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new LairBnB.Views.Nav({
      locationField: ''
    });
    this.addSubview('#nav-container', navView);

		this.listenTo(this.model, 'sync', this.render);
	},

	template: JST['lairs/show'],

	render: function(){
		console.log('changed', this.model)
		var content = this.template({
			lair: this.model,
			owner: this.model.get(['owner'])
		});
		this.$el.html(content);
		this.initSlider(this);
		this.attachSubviews();
		return this;
	},

	initSlider: function(view){
		view.$('.lazy').slick({
	    lazyLoad: 'ondemand',
	    slidesToShow: 1,
	    slidesToScroll: 1,
	    prevArrow: '<button type="button" class="left-main glyphicon glyphicon-chevron-left">Previous</button>',
	    nextArrow: '<button type="button" class="right-main glyphicon glyphicon-chevron-right">Previous</button>'
	  });
	}
})