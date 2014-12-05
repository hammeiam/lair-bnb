LairBnB.Views.LairShow = Backbone.CompositeView.extend({
	initialize: function(){
		var navView = new LairBnB.Views.Nav({
      locationField: ''
    });
    this.addSubview('#nav-container', navView);

		this.listenTo(this.model, 'sync', this.render);
	},

	template: JST['lairs/show'],

	events: {
		'submit form': 'submitReservation'
	},

	render: function(){
		console.log('changed', this.model)
		var content = this.template({
			lair: this.model,
			owner: this.model.get(['owner'])
		});
		this.$el.html(content);
		this.attachSubviews();
		initImageCarousel(this,'main');
		initDatePicker(this, this.model.escape(['unavailable_dates']));
		return this;
	},

	submitReservation: function(event){
		event.preventDefault();
		var that = this;
		debugger
		var formData = $(event.currentTarget).serializeJSON();
		formData['trip']['lair_id'] = this.model.id;
		var newReservation = new LairBnB.Models.Trip(formData['trip']);
		newReservation.save({}, {
			success: function(resp){
				var $alerts = that.$('#alerts-container');
				if(!!resp.get(['success'])){
					$("<div class='alert alert-success' role='alert' style='display:none;'>Reservation Requested!</div>").hide().appendTo($alerts).slideDown();
				} else {
					$.each(resp.get(['errors']), function(idx, message){
						$("<div class='alert alert-danger' role='alert' style='display:none;'>"+ message + "</div>").hide().appendTo($alerts).slideDown();
					});
				}
				that.removeErrors();
			}
		})
	},

	removeErrors: function(){
		var that = this;
		setTimeout(function() {
		  that.$("#alerts-container").slideUp(1500).empty();
		}, 4000);
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