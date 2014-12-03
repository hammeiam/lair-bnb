LairBnB.Views.LairShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.model, 'sync', this.render);
	},
	template: JST['lairs/show'],
	render: function(){
		var content = this.template({
			lair: this.model
		});
		this.$el.html(content);
		return this;
	}
})