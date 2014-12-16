LairBnB.Collections.Trips = Backbone.Collection.extend({
	initialize: function(models, options){
		this.user = options['user']
	},
	url: function(){
		return '/users/' + this.user.id + '/trips'
	},
  model: LairBnB.Models.Trip

});
