LairBnB.Views.UserShow = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new LairBnB.Views.Nav({
      locationField: ''
    });
    this.addSubview('#nav-container', navView);

		this.listenTo(this.model, 'sync change', this.render);
	},

	template: JST['users/show'],

	events: {
		'change input.location': 'submitNewSearch',
		'keypress input.location': 'checkForEnterSubmit'
	},

	render: function(){
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		this.attachSubviews();
		return this;
	},

	checkForEnterSubmit: function(event){
		if(event.which == 13){
			this.submitNewSearch(event);
		}
	},

	submitNewSearch: function(event){
		event.preventDefault();
    var $field = $(event.currentTarget);
    var location = urlEncodeLocation($field.val());
    Backbone.history.navigate('/search/' + location, { trigger: true });
	}


	// initSlider: function(view){
	// 	view.$('.lazy').slick({
	//     lazyLoad: 'ondemand',
	//     slidesToShow: 1,
	//     slidesToScroll: 1,
	//     prevArrow: '<button type="button" class="left-main glyphicon glyphicon-chevron-left">Previous</button>',
	//     nextArrow: '<button type="button" class="right-main glyphicon glyphicon-chevron-right">Previous</button>'
	//   });
	// }
})