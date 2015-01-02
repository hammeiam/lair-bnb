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
		$('[data-toggle="tooltip"]').tooltip();
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
		var options = {};
		var $form = $(event.currentTarget);
		var formData = $form.serializeJSON();
		formData['trip']['lair_id'] = this.model.id;
		if( !LairBnB.users.currentUser() ){
			options['alertClass'] = 'alert-danger';
			options['alertMessage'] = 'You must sign in before making a reservation';
			showAlert(options);
			return;
		}
		if( !formData['trip']['check_in_date'] || !formData['trip']['check_out_date']){
			options['alertClass'] = 'alert-danger';
			options['alertMessage'] = 'Both check in and check out dates are required';
			showAlert(options);
			return;
		}
		var newReservation = new LairBnB.Models.Trip(formData['trip']);
		newReservation.save({}, {
			success: function(resp){
				var $alerts = $('#alerts-container');
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
})