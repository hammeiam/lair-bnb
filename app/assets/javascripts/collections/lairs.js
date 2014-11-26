LairBnB.Collections.Lairs = Backbone.Collection.extend({
	url: 'lairs',
  model: LairBnB.Models.Lair,
  getOrFetch: function(id){
  	var model = this.get(id);
  	var that = this;
  	if(!model){
  		model = new LairBnB.Models.Lair({ id: id });
  		model.fetch({
  			success: function(){ that.add(model) }
  		})
  	} else {
      model.fetch();
    }
  	return model;
  }

});
LairBnB.lairs = new LairBnB.Collections.Lairs();