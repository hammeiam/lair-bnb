LairBnB.Views.UserShow = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new LairBnB.Views.Nav({
      locationField: ''
    });
    this.addSubview('#nav-container', navView);

		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model, 'sync', this.this_sync);
		this.listenTo(this.model, 'add', this.this_add);
		this.listenTo(this.model, 'change', this.this_change);
		this.listenTo(this.model, 'reset', this.this_reset);
		this.listenTo(this.model, 'remove', this.this_remove);
	},

	template: JST['users/show'],
	this_sync: function(){
		console.log('sync')
	},
	this_add: function(){
		console.log('add')
	},
	this_change: function(){
		console.log('change')
	},
	this_reset: function(){
		console.log('reset')
	},
	this_remove: function(){
		console.log('remove')
	},

	events: {
		'change input.location': 'submitNewSearch',
		'keypress input.location': 'checkForEnterSubmit'
	},

	render: function(){
		console.log('usershow rendered')
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