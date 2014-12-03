LairBnB.Views.Sidebar = Backbone.CompositeView.extend({
	initialize: function(options){
		this.params = options.params;
		var lairsIndexView = new LairBnB.Views.LairsIndex();
		this.addSubview('#lairs-index', lairsIndexView);
	},

	template: JST['sidebar'],

	render: function(){
		var content = this.template({
			fieldValues: this.params
		});
		this.$el.html(content);
		this.attachSubviews();
		prepareSlider(this);
		fillFields(this.params, this);
		initDatePicker(this);
		return this;
	}
});
