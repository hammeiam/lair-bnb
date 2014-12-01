LairBnB.Views.LairShow = Backbone.View.extend({
	template: JST['lairs/show'],
	tagName: 'li',
	className: 'lair-result',
	render: function(){
		var content = this.template({
			lair: this.model
		});
		this.$el.html(content);
		return this;
	}
})