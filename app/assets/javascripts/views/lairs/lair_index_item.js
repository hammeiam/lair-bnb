LairBnB.Views.LairIndexItem = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, 'sync', this.render)
	},
	
	template: JST['lairs/indexItem'],

	tagName: 'li',

	className: 'lair-result col-xs-12 col-md-6',

	render: function(){
		var content = this.template({
			lair: this.model,
			owner: this.model.get(['owner'])
		});
		this.$el.html(content);

		initImageCarousel(this, 'mini');

		this.$('.lazy').slickGoTo(0);
		this.imagesLoaded();
		// initImagePlaceholders(this);
		return this;
	},

	imagesLoaded: function(){
		var view = this;
		var $image = this.$("img:first");
		$image.load(function(){
			view.$('.slider-container-mini').removeClass('is-loading').addClass('is-loaded');
		})
		// if(!!image){
		// 	image.one("load", function() {
  // 		view.$('.slider-container-mini').removeClass('is-loading').addClass('is-loaded');
		// }).each(function() {
		//   if(this.complete) {
		//   	$(this).load();
		//   };
		// });
		// }
		
	}
})