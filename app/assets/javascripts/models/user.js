LairBnB.Models.User = Backbone.Model.extend({
	urlRoot: '/users',
	parse: function(resp){
		if(resp.owned_lairs){
			this.myLairsCollection().set(resp.owned_lairs);
		} 
		return resp;
	},

	tripsCollection: function(){
		if(!this._trips){
			this._trips = new LairBnB.Collections.Trips([],{
				user: this
			});
		}
		return this._trips;
	},

	myLairsCollection: function(){
		if(!this._myLairs){
			this._myLairs = new LairBnB.Collections.Lairs([]);
		}
		return this._myLairs;
	}
});
