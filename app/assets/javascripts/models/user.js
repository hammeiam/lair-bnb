LairBnB.Models.User = Backbone.Model.extend({
	urlRoot: '/users',
	parse: function(resp){
		if(resp.reservations){
			this.reservationsCollection().set(resp.reservations)
		} 
		return resp;
	},
	reservationsCollection: function(){
		if(!this._reservations){
			this._reservations = new LairBnB.Collections.Trips([],{
				user: this
			});
		}
		return this._reservations;
	},
});
