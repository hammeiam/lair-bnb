LairBnB.Collections.Users = Backbone.Collection.extend({
  url: '/users',
  model: LairBnB.Models.User,

  getOrFetch: function(id){
  	var model = this.get(id);
  	var that = this;
  	if(!model){
  		model = new LairBnB.Models.User({ id: id });
  		model.fetch({
  			success: function(){ that.add(model) }
  		})
  	} else {
      model.fetch();
    }
  	return model;
  },

  signOut: function(){
    var currentUser = this.currentUser();
    var options = {};
    if(!!currentUser){
      $.ajax({
        url: "/session",
        type: "DELETE",
        success: function(resp){
          currentUser.set( { logged_in: false });
          currentUser.fetch();
          options['alertClass'] = 'alert-success';
          options['alertMessage'] = 'Successfully Logged Out';
          showAlert(options);
        }
      });
    } else {
      options['alertClass'] = 'alert-warning';
      options['alertMessage'] = 'You are already signed out!';
      showAlert(options);
    }
  },

  signIn: function(userData){
    $.ajax({
      url: "/session",
      type: "POST",
      data: userData,
      success: function(resp){
        if(!!resp['success']){
          $('#signInModal').modal('hide');
          // addresses a bug with some browsers & bootstrap
          $('body').removeClass('modal-open');
          var id = parseInt(resp['success'], 10);
          var existingUser = LairBnB.users.findWhere({ id: id });
          if(!!existingUser){
            
            existingUser.set({ logged_in: true });
            existingUser.fetch();
          } else {
            var currentUser = new LairBnB.Models.User({ id: id });
            LairBnB.users.add(currentUser);
            currentUser.fetch();
          };
          Backbone.history.navigate('#/users/' + id, { trigger: true });
        } else {
          resp['errors'].forEach(function(message){
            var options = {
              alertClass: 'alert-warning',
              alertMessage: message,
              alertLocation: '#sign-in-alerts-container-modal'
            };
            showAlert(options);
          });
        };
      }
    });
  },

  signUp: function(userData){
    var newUser = new LairBnB.Models.User(userData);
    newUser.save({}, {
      success: function(model, resp){
        if(!!resp['success']){
          $('#signInModal').modal('hide');
          // addresses a bug with some browsers & bootstrap
          $('body').removeClass('modal-open');
          LairBnB.users.add(newUser);
          newUser.fetch();
          var id = resp['success'];
          Backbone.history.navigate('/users/' + id, { trigger: true })
        } else{
          resp['errors'].forEach(function(message){
            var options = {
              alertClass: 'alert-warning',
              alertMessage: message,
              alertLocation: '#sign-up-alerts-container-modal'
            };
            showAlert(options);
          });
        };
      }
    })
  },

  currentUser: function(){
    return this.findWhere({ logged_in: true }) || null;
  }
});
LairBnB.users = new LairBnB.Collections.Users();