LairBnB.Models.User = Backbone.Model.extend({
	urlRoot: '/users',
	parse: function(resp){
		if(resp.reservations){
			// var pending = resp.reservations.filter(function(el){ 
			// 	return el.approval_status === 'pending' 
			// });
			// var approved = resp.reservations.filter(function(el){ 
			// 	return el.approval_status === 'approved' 
			// });
			// this.reservationsCollection = new LairBnB.Collections.Trips(resp.reservations,{
			// 	user: this
			// });
			this.reservationsCollection().set(resp.reservations)
			// var pending = reservationsCollection.where({approval_status: 'pending' });
			// var approved = reservationsCollection.where({approval_status: 'approved' })
			// this.pendingReservations().set(pending);
			// this.approvedReservations().set(approved);
			// delete resp.reservations;
		} 
		return resp;
	},
	reservationsCollection: function(){
		if(!this._reservations){
			this._reservations = new LairBnB.Collections.Trips([],{
				user: this
			});
			// this._pending_reservations._callbacks = {};
		}
		return this._reservations;
	},
	// pendingReservations: function(){
	// 	if(this.reservationsCollection){
	// 		var models = this.reservationsCollection.where({approval_status: "pending"})
	// 	} else {
	// 		var models = [];
	// 	}
	// 	if(!this._pending_reservations){
	// 		this._pending_reservations = new LairBnB.Collections.Trips(models,{
	// 			user: this
	// 		});
	// 		// this._pending_reservations._callbacks = {};
	// 	}
	// 	return this._pending_reservations;
	// },
	// approvedReservations: function(){
	// 	if(this.reservationsCollection){
	// 		var models = this.reservationsCollection.where({approval_status: "approved"})
	// 	} else {
	// 		var models = [];
	// 	}
	// 	if(!this._approvedReservations){
	// 		this._approvedReservations = new LairBnB.Collections.Trips(models, {
	// 			user: this
	// 		});
	// 		// this._approvedReservations._callbacks = {};
	// 	}
	// 	return this._approvedReservations;
	// }
});
