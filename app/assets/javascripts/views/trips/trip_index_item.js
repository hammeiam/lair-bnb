LairBnB.Views.TripIndexItem = Backbone.View.extend({

  template: JST['trips/indexItem'],

  initialize: function(){
  },

  events: {
    'click button': 'handleClick'
  },

  tagName: 'li',
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
    debugger
    if($target.data('action') === 'approve'){
      this.model.save({ approval_status: 'approved'},{
        success: function(resp){
          debugger
        }
      })
    } else {

    };
  }

});