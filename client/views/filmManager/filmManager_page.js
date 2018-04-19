Session.setDefault('questionnaireTemplate', false)
Template.filmManager.helpers({
  medias: function() {
    return Medias.find({filmId: this._id});
  }
});


Template.filmManager.onRendered(function () {
  idFilm = this.data._id
  //console.log(idFilm, this)
  $.each($('div.film'), function() {
  //  console.log( ($(this).attr('id').indexOf(idFilm) > -1), $(this).attr('id'), idFilm)
    if($(this).attr('id').indexOf(idFilm) > -1){
     // console.log('okaa')
      $(this).addClass('onglet_film_actif')
    }
  })
})

Template.filmManager.events({
  'click .film_added_element': function(e, template){
    e.preventDefault();

 

    if(!$('.onglet.onglet_modif').hasClass('onglet_actif')){
      $('.onglet.onglet_modif').addClass('onglet_actif');
      $('.onglet.onglet_add').removeClass('onglet_actif');
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
    $('#titre_film').val(this.title)
    $('#description_film').val(this.description)
    $('#film_duration').text(this.duree)

    $('input.ajouter_text').attr('id', this._id)

            // réinitialise les champs du formulaire à null
        
            var formData = $('#new_question_form').serializeArray();
            var formLength = formData.length;
            // Tant qu'il reste des champ input ajoutés les supprime
            while (formLength > 2){
              $("#new_question_form").children().last().remove();
              formLength--;
            }
    
    
    //Stocke l'id du film et l'id du media sur lequel on a cliqué.
    Session.set("filmId",this.filmId);
    Session.set("mediaId",this._id);
    media_id = this._id;

    //Récupère le media sur lequel on a cliqué en fonction de son id
    //Le stocke dans une variable 
    var mon_media = Medias.findOne({_id: media_id });
    Session.set('media', mon_media);

    //Si il existe un vote sur ce média
    if(mon_media.voteId != undefined){
      Session.set('isVoteExist',true);
      //Récupère le vote associé à ce média
      var mon_vote = Votes.findOne({_id: mon_media.voteId});
      //Récupère les réponses associés à ce vote
      var mes_responses = Responses.find({voteId: mon_vote._id}).fetch();
      Session.set('responses',mes_responses);
      

      //Remplit le champs Question du formulaire avec la question du vote récupéré.
      document.getElementById('questionId').value =mon_vote.title;

      //Remplit les champs réponses du formulaire 

      mes_responses.forEach(function(item) {
        if(item.defaultChoice == true){
          document.getElementById('answer_1').value = item.content;
        }else{
          $( ".new_question" ).append( '<div id="answer_'+ formLength+'"><input type="text" value="'+item.content+'"  name="answer_'+ formLength+'" placeholder="Choix n° '+ formLength +'" /></div>');
          formLength++;
        }
      });
     }
    //Si il n'existe pas de vote associé à ce média
     else{
      Session.set('isVoteExist',false);
     }
      

      // Affiche l'overlay
      $(".overlay").show();

  },
  'click img.add_film': function(e, template){
    e.preventDefault();

    var templateName = "film_submit";
    Blaze.render( Template.filmSubmit, $('body').get(0) );
  },
  'click .film_launch': function(e, template){
    e.preventDefault();
    var currentMedia = $('.ajouter_text').attr('id')
   // console.log(currentMedia)
    // Blaze.render( Template.mediaTest, $('body').get(0) );
    Blaze.renderWithData(Template.mediaTest, {_id: currentMedia}, $('body').get(0));
  },
  'click .onglet': function(e, template){
    e.preventDefault();

    //console.log(this, e, template)


    if(!$('.onglet.onglet_add').hasClass('onglet_actif')){
      $('.onglet.onglet_add').addClass('onglet_actif');
      $('.onglet.onglet_modif').removeClass('onglet_actif');
      $('.ajouter_text').attr('id', 'newMedia')
    }else if (e.currentTarget == 'div.onglet_modif'){
       // console.log('teub')
    }

  },



  
  
})
