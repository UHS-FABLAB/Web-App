Template.filmManager.helpers({
  medias: function() {
    return Medias.find({filmId: this._id});
  }
});


Template.filmManager.onRendered(function () {
  idFilm = this.data._id
  console.log(idFilm, this)
  $.each($('div.film'), function() {
    console.log( ($(this).attr('id').indexOf(idFilm) > -1), $(this).attr('id'), idFilm)
    if($(this).attr('id').indexOf(idFilm) > -1){
      console.log('okaa')
      $(this).addClass('onglet_film_actif')
    }
  })
})

Template.filmManager.events({
  'click .film_added_element': function(e, template){
    e.preventDefault();

    console.log(this, e, template)


    if(!$('.onglet.onglet_modif').hasClass('onglet_actif')){
      $('.onglet.onglet_modif').addClass('onglet_actif');
      $('.onglet.onglet_add').removeClass('onglet_actif');
      $('.contenu_onglet_add').removeClass('contenu_onglet_actif');
      $('.contenu_onglet_modif').addClass('contenu_onglet_actif');
    }

     $('.film_add_elements').attr('id',this._id)

    var isGameOrVideo = false;
    if(this.isGame){
      $('div.film_add_video_onglet').removeClass('film_add_onglet_actif');
      $('div.film_add_jeuvideo_onglet').addClass('film_add_onglet_actif');
    }else {
      $('div.film_add_video_onglet').addClass('film_add_onglet_actif');
      $('div.film_add_jeuvideo_onglet').removeClass('film_add_onglet_actif');
    }
    $('#media_modif_title').val(this.title)
    $('#media_modif_describ').val(this.description)
    $('#film_duration').text(this.duree)

    $('input.ajouter_text').attr('id', this._id)
    console.log('this.id')
  },
  'click img.add_film': function(e, template){
    e.preventDefault();

    var templateName = "film_submit";
    Blaze.render( Template.filmSubmit, $('body').get(0) );
  },
  'click .film_launch': function(e, template){
    e.preventDefault();
    var currentMedia = $('.ajouter_text').attr('id')
<<<<<<< HEAD
    //console.log(currentMedia)
=======
>>>>>>> master
    // Blaze.render( Template.mediaTest, $('body').get(0) );
    Blaze.renderWithData(Template.mediaTest, {_id: currentMedia}, $('body').get(0));
  },
  'click .onglet': function(e, template){
    e.preventDefault();

<<<<<<< HEAD
    console.log(this, e, template)
=======


>>>>>>> master
    if(!$('.onglet.onglet_add').hasClass('onglet_actif')){
      $('.onglet.onglet_add').addClass('onglet_actif');
      $('.onglet.onglet_modif').removeClass('onglet_actif');
      $('.contenu_onglet_add').addClass('contenu_onglet_actif');
      $('.contenu_onglet_modif').removeClass('contenu_onglet_actif');
      $('.ajouter_text').attr('id', 'newMedia')
<<<<<<< HEAD
    }
  }
=======
>>>>>>> master
})
