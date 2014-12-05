LairBnB.Views.LairIndexItem = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, 'sync', this.render)
	},
	
	template: JST['lairs/indexItem'],

	tagName: 'li',

	className: 'lair-result col-xs-12 col-md-6',

	render: function(){
		console.log('model rendered')
		var content = this.template({
			lair: this.model,
			owner: this.model.get(['owner'])
		});
		this.$el.html(content);
		initImageCarousel(this, 'mini');
		this.$('.lazy').slickGoTo(0);
		return this;
	}
})