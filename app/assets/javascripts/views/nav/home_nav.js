LairBnB.Views.HomeNav = Backbone.CompositeView.extend({
	tagName: 'nav',
	className: 'lairbnb-nav-home',
	template: JST['nav/homeNav'],
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
		'submit form#signUp': 'signUp'
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
		}, 700);
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
  	this.$el.html(content);
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