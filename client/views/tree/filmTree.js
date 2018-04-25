Template.filmTree.onCreated(function bodyOnCreated() {

});

Template.filmTree.events({
  // Lorsqu'on clique sur annuler, on cache l'overlay et on vide le formulaire
'click .btn_exit_form' : function(event){
  event.preventDefault();

  }
});