LairBnB.Views.Home = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new LairBnB.Views.Nav({
			locationField:''
		});
    this.addSubview('#nav-container', navView);
	},

	template: JST['home'],

	render: function(){
		var content = this.template();
		this.$el.html(content);
		return this;
	}
});