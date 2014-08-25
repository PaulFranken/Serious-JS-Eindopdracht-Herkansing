site.views.BattleView = Backbone.View.extend({

    tagName: 'li',
    el: '#battle',
    losers: [],

    //template van de collection om op het scherm te tonen. Na elke keer op de knop te hebben gedrukt wordt de collection gehalveerd.
    template: _.template("<% _.each(collection, function(model){ %> <%= model.name %> <%= model.surname %> - Age: <%= model.age %> - Experience: <%= model.experience %> - Rank: <%= model.rank %> </br> <% });  %><button id='fight'>Fight</button></div>"),
    //template: _.template("<%= name %> <%= surname %> <%= age %> <%= experience %> <%= rank %>"),

    initialize: function () {

        this.render();

    },

    render: function(){

        $('#battle').html("<button id='fight'>Fight</button>")
        //this.$el.html(this.template(this.collection.toJSON))
    },

    results: function(){

        //Collection tonen via template
        this.$el.html(this.template({
            collection: this.collection.toJSON()
        }))

    },

    //click listener voor de view
    events:{
        'click': 'fight'
    },



    fight: function(){
        var jsonCol = this.collection.toJSON()

        console.log(jsonCol)
        var selector = 0;
        for (i = 0; i <= 8; i++) {
            //functie met parameters. 1/2 voor de models. 3/4 voor de positie te sturen naar de losers array
            this.simulation(jsonCol[selector], jsonCol[selector + 1], selector, selector + 1)
            console.log(this.collection.toJSON())
            selector += 2;

            //Handig om te zien wie er heeft verloren en of de simulatie wel goed verloopt.
            console.log(this.losers)

            //Wanneer er 1 persoon overblijft de WinnerView starten
            if(this.collection.length == 1){
                new site.views.WinnerView({collection: this.collection});
            }

            //Na elk gevecht de overgebleven personen tonen
            this.results();
        }

    },

    //Simulatie formule. De persoon krijgt een waarde op basis van zijn age, rank, experience en een random getal voor wat verandering.
    simulation: function (person1, person2, pos1, pos2) {
        var result1 = person1.age + (person1.experience * 4) + (person1.rank * 3) + (Math.floor(Math.random() * 6) + 1)
        var result2 = person2.age + (person2.experience * 4) + (person2.rank * 3) + (Math.floor(Math.random() * 6) + 1)

        //Als persoon 1 wint, persoon 2 uit de collection halen.
        if (result1 > result2) {
            console.log(person1.name + " " + person1.surname + " Wint!");
            this.collection.remove(this.collection.where({fullname: person2.fullname}))
            this.losers.push(pos2)
        }

        //Als persoon 2 wint, persoon 1 uit de collection halen.
        else {
            console.log(person2.name + " " + person2.surname + " Wint!");
            this.collection.remove(this.collection.where({fullname: person1.fullname}))
            this.losers.push(pos1)
        }

    }


})