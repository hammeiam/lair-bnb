LairBnB.Views.LairIndexItem = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, 'sync', this.render)
	},
	template: JST['lairs/indexItem'],
	tagName: 'li',
	className: 'lair-result col-xs-12 col-sm-6',
	render: function(){
		var content = this.template({
			lair: this.model
		});
		this.$el.html(content);
		initImageCarousel(this, 'mini');
		console.log(this.model.id, this.model)
		return this;
	}
})