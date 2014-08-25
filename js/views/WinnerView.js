site.views.WinnerView = Backbone.View.extend({
    el: "#winner",
    tagName: "p",
    template: _.template("The Winner is: <% _.each(collection, function(model){ %> <%= model.name %> <%= model.surname %> - Age: <%= model.age %> - Experience: <%= model.experience %> - Rank: <%= model.rank %> </br> <% }); %>"),
    initialize: function(){

      this.render();

    },

    render: function(){
        //Winnaar tonen.
        this.$el.html(this.template({
            collection: this.collection.toJSON()
        }))
    }
})
