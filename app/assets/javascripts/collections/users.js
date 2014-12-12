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

  logout: function(){
    var currentUser = this.currentUser();
    if(!!currentUser){
      $.ajax({
        url: "/session",
        type: "DELETE",
        success: function(resp){
          currentUser.set( {logged_in: false });
          currentUser.fetch();
          showAlert('alert-success', 'Successfully Logged Out')
        }
      });
    } else {
      showAlert('alert-warning', 'You are already signed out!')
    }
  },

  currentUser: function(){
    return this.findWhere({ logged_in: true }) || null;
  }
});
LairBnB.users = new LairBnB.Collections.Users();