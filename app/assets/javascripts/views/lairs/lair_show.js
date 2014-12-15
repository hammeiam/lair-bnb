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
		'submit form.lair-reservation': 'submitReservation',
		'change input.location': 'submitNewSearch',
		'keypress input.location': 'checkForEnterSubmit'
	},

	render: function(){
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
	},

	submitReservation: function(event){
		event.preventDefault();
		var that = this;
		var $form = $(event.currentTarget);
		var formData = $form.serializeJSON();
		formData['trip']['lair_id'] = this.model.id;
		var newReservation = new LairBnB.Models.Trip(formData['trip']);
		newReservation.save({}, {
			success: function(resp){
				var $alerts = $('#alerts-container');
				var options = {};
				if(!!resp.get(['success'])){
					options['alertClass'] = 'alert-success';
					options['alertMessage'] = 'Reservation Requested!';
					$form[0].reset();
					showAlert(options);
				} else {
					$.each(resp.get(['errors']), function(idx, message){
						options['alertClass'] = 'alert-danger';
						options['alertMessage'] = message;
						showAlert(options);
					});
				}
			}
		})
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