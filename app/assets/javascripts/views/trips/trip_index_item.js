LairBnB.Views.TripIndexItem = Backbone.View.extend({

  template: JST['trips/indexItem'],

  initialize: function(){
    // this.listenTo(this.model, 'sync', this.this_sync);
  },

  events: {
    'click button': 'handleClick'
  },

  // tagName: 'li',
  className: 'lair-result col-xs-3',

  render: function(){
    console.log('trip rendered')
  	var content = this.template({
      reservation: this.model,
      lair: this.model.get(['lair']),
      guest: this.model.get(['guest'])
    });
  	this.$el.html(content);
  	return this;
  },

  handleClick: function(event){
    event.preventDefault();
    var $target = $(event.currentTarget);
    var action = $target.data('action');
    var validInputs = ['denied', 'approved'];
    var options = {};
    if(validInputs.indexOf(action) === -1){
      options['alertClass'] = 'alert-danger';
      options['alertMessage'] = 'Invalid Action';
      showAlert(options);
      return;
    }
    var that = this;
    this.model.save({ approval_status: action },{
      success: function(resp){
        if(!!resp.get(['success'])){
          options['alertClass'] = 'alert-success';
          options['alertMessage'] = 'Reservation ' + action;
          showAlert(options);
          that.model.collection.trigger('sync');
        } else {
          $.each(resp.get(['errors']), function(idx, message){
            options['alertClass'] = 'alert-danger';
            options['alertMessage'] = message;
            showAlert(options);
          });
        }

      }
    })
  }
});