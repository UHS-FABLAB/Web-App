
Template.filmManager.helpers({
  films: function() {
     return Films.find({}, {sort: {submitted: -1}});
  }
});
/*
Template.filmManager.events({
  'click .film': function(e, template){
  	var clicked = e.target;
  	$('.onglet_film_actif').removeClass('onglet_film_actif');
  	if(!$(clicked).hasClass('.film')){
  		clicked = $(clicked).parent();
  	}
    $(clicked).addClass('onglet_film_actif');
    console.log("clic sur onglet film");
	}
});*/
