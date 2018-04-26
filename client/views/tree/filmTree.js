Template.filmTree.onCreated(function bodyOnCreated() {

});

Template.filmTree.events({

'click .filmtree_button': function(e, template){
      Template.filmTree.switchOverlayToTree(e);
  },
  'click .refreshFirstMediaSelect': function(e, template){
      Template.filmTree.fillFirstMediaOptions();
      Template.filmTree.removeFirstMediaSubmitIfExist();
  },
  'click .button_firstMedia': function(e, template){
      Template.filmTree.validateFirstMediaSubmit();   
  }
});

Template.filmTree.switchOverlayToTree = function(e){
  var buttonClicked = $(e.currentTarget);
  //remove Overlay Vote
  $('.film_connexion_structure .overlay').hide();
  //désactive les 2 boutons
  $('.film_connexion_structure .filmtree_menu_button').removeClass('film_tree_menu_active');
  //active celui cliqué
  $(buttonClicked).addClass('film_tree_menu_active');
  //affiche bloc tree
  $('.film_connexion_structure .film_tree_container').addClass('active');
}

Template.filmTree.switchOverlayToLink = function(e){
  var buttonClicked = $(e.currentTarget);
  //show Overlay Vote
  $('.film_connexion_structure .overlay').show();
  //désactive les 2 boutons
  $('.film_connexion_structure .filmtree_menu_button').removeClass('film_tree_menu_active');
  //active celui cliqué
  $('.film_connexion_structure .filmliaison_button').addClass('film_tree_menu_active');
  //cache bloc tree
  $('.film_connexion_structure .film_tree_container').removeClass('active');
}

Template.filmTree.fillFirstMediaOptions = function(){
  var idFilm = $(".onglet_film_actif").attr("id");
  console.log($(".onglet_film_actif").attr("id"));
  idFilm = idFilm.split('_')[1];
  var mediasFilmActif = Medias.find({filmId: idFilm});
  var answerSelect = $('#select_firstMedia');
  var htmlOption ="";
  if($(answerSelect).children().length==1){
    mediasFilmActif.forEach(function(index){
      htmlOption = '<option value="' + idFilm + '">' + index.title + '</option>';
      $(answerSelect).append(htmlOption);
    });
  }
}

Template.filmTree.validateFirstMediaSubmit = function(){
  var film_id = Session.get('filmId');
  var filmActuel = Films.find({filmId: film_id});
  var mon_media_id = $('#select_firstMedia').val();
  if(mon_media_id!='nullVal'){
    filmActuel.update(film_id, {$set: {firstMediaId: mon_media_id}});
  }
}

Template.filmTree.removeFirstMediaSubmitIfExist = function(){
  var film_id = Session.get('filmId');
  var filmActuel = Films.find({filmId: film_id});
  var idMediaFirst = filmActuel.firstMediaId;
  console.log(idMediaFirst);
  if(idMediaFirst!=null){
    $('.no_media_in_film').hide();
  }
}