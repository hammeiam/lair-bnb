LairBnB.Views.HomeNav = Backbone.CompositeView.extend({
	tagName: 'nav',
	className: 'lairbnb-nav-home',
	template: JST['nav/homeNav'],
	signInModal: JST['modals/signIn'],
	signUpModal: JST['modals/signUp'],
	newLairModal: JST['modals/newLair'],
	
	attributes: {
		'role': 'navigation'
	},

	initialize: function(options){
		this.listenTo(LairBnB.users, 'sync add remove change reset', this.render);
	},

	events: {
		'click #signOut': 'signOut',
		'submit form#signIn': 'signIn',
		'click button#guest-signin': 'guestSignIn',
		'submit form#signUp': 'signUp',
		'submit form#create-new-lair': 'createNewLair'
	},

	createNewLair: function(event){
		event.preventDefault();
		var lairData = $(event.currentTarget).serializeJSON();
		var newLair = new LairBnB.Models.Lair(lairData);
		newLair.save({}, {
      success: function(model, resp){
        if(!!resp['success']){
          $('#newLairModal').modal('hide');
          // addresses a bug with some browsers & bootstrap
          $('body').removeClass('modal-open');
          LairBnB.lairs.add(newLair);
          newLair.fetch();
          var id = resp['success'];
          Backbone.history.navigate('#/lairs/' + id, { trigger: true })
        } else{
          resp['errors'].forEach(function(message){
            var options = {
              alertClass: 'alert-warning',
              alertMessage: message,
              alertLocation: '#new-lair-alerts-container-modal'
            };
            showAlert(options);
          });
        };
      }
    })
	},

	signOut: function(){
		LairBnB.users.signOut();
	},

	signIn: function(event){
		event.preventDefault();
		var userData = $(event.currentTarget).serializeJSON();
		LairBnB.users.signIn(userData);
	},

	guestSignIn: function(event){
		event.preventDefault();
		$('#signInEmail').val('bwayne@aol.com');
		$('#signInPassword').val('password');
		setTimeout(function(){
			$('#signIn').submit();
		}, 500);
	},

	signUp: function(event){
		event.preventDefault();
		var userData = $(event.currentTarget).serializeJSON();
		LairBnB.users.signUp(userData);
	},

	render: function(){
		var content = this.template({
			currentUser: LairBnB.users.currentUser()
		});
  	var signInModal = this.signInModal();
		var signUpModal = this.signUpModal();
		var newLairModal = this.newLairModal();
  	this.$el.html(content);
  	this.$el.append(signInModal, signUpModal, newLairModal);
  	this.focusModals();
  	this.$('[data-toggle="tooltip"]').tooltip();
  	return this;
	},

	focusModals: function(){
		$('#signInModal').on('shown.bs.modal', function () {
	    $('#signInEmail').focus();
		});
		$('#signUpModal').on('shown.bs.modal', function () {
	    $('#signUpFirstName').focus();
		})
	}
});