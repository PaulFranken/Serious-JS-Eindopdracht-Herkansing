site.views.PersonView = Backbone.View.extend({

    tagName: "li",
    el: '#people',

    //template om alle persons op te halen en op het scherm te displayen
    //template: _.template("<% _.each(collection, function(model){ %> <%= model.name %> <%= model.surname %> - Age: <%= model.age %> - Experience: <%= model.experience %> - Rank: <%= model.rank %> </br> <% }); %>"),
    //template: _.template($('#personTemplate').html()),

    //twee arrays als selectie voor random voornaam en achternaam
    names: ["Paul", "John", "Peter", "Lincoln", "George", "Douglas", "Desmond", "Jack", "Jaime", "Jimmie", "Joe", "Richard", "Donnie"],
    surnames: ["MacArthur", "Adams", "Miles", "Humes", "Stark", "Franken", "Moriarty", "Fry", "Laurie", "Patell", "Winters", "Garnier"],

    initialize: function () {

        //loop om 16 persons te genereren. 16 omdat het dan goed in toernooi formaat kan(8ste, kwart, halve en finale)
        for (var i = 0; i <= 15; i++) {
            var name = this.names[Math.floor(Math.random() * this.names.length)];
            var surname = this.surnames[Math.floor(Math.random() * this.surnames.length)];
            this.collection.add([
                {
                    'name': name,
                    'surname': surname,
                    'fullname': name + " " + surname,
                    'age': Math.floor(Math.random() * 18) + 22,
                    'experience': Math.floor(Math.random() * 10),
                    'rank': Math.floor(Math.random() * 10)
                }
            ]);
        }

        //uitvoeren wanneer de loop compleet is.
        this.render();
    },

    template: _.template($('#personTemplate').html(), {persons: this.models}),

    render: function () {
        var template = _.template($('#personTemplate').html(), {persons: this.collections});
        this.$el.html(template);

        //Template op het scherm tonen met de gevulde collection.
//        this.$el.html(this.template({
//            collection: this.collection.toJSON()
//        }))


    }

});