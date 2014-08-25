(function(){
    site.init = function(){
        var personCollection = new site.collections.Persons();


        new site.views.PersonView({collection: personCollection});
        new site.views.BattleView({collection: personCollection});


    };
    site.$document.on('ready', site.init);
})();