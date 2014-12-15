LairBnB.Models.User = Backbone.Model.extend({
	urlRoot: '/users',
	parse: function(resp){
		if(resp.reservations){
			var pending = resp.reservations.filter(function(el){ 
				return el.approval_status === 'pending' 
			});
			var approved = resp.reservations.filter(function(el){ 
				return el.approval_status === 'approved' 
			});
			this.pendingReservations().set(pending);
			this.approvedReservations().set(approved);
			// delete resp.reservations;
		}
		return resp;
	},
	pendingReservations: function(){
		if(!this._pending_reservations){
			this._pending_reservations = new LairBnB.Collections.Trips([]);
		}
		return this._pending_reservations;
	},
	approvedReservations: function(){
		if(!this._approvedReservations){
			this._approvedReservations = new LairBnB.Collections.Trips([]);
		}
		return this._approvedReservations;
	}
});
