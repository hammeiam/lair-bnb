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
  }
});
LairBnB.users = new LairBnB.Collections.Users();