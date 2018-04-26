
     /** @TODO
      * - bouton confirmer qui lie le film-id et la réponse
      * - Oncrate lié les question associé
      * - valider le formulaire insére les données en bdd
      */
     Template.questionnaireOverlay.onCreated(function bodyOnCreated() {


      Meteor.subscribe('votes');
      Meteor.subscribe("responses");


      })

     Template.questionnaireOverlay.fillMediaOutputOptions = function(indiceAnswer){
        var idFilm = $(".onglet_film_actif").attr("id");
        idFilm = idFilm.split('_')[1];//good
        var mediasFilmActif = Medias.find({filmId: idFilm});
        var answerSelect = $('#select_media_output_'+indiceAnswer);
        if($(answerSelect).children().length==1){
        mediasFilmActif.forEach(function(index){
          var htmlOption = '<option value="' + idFilm + '">' + index.title + '</option>';
          $(answerSelect).append(htmlOption);
        });
      }
     }

     Template.questionnaireOverlay.events({
        // Lorsqu'on clique sur annuler, on cache l'overlay et on vide le formulaire
      'click .btn_exit_form' : function(event){
        event.preventDefault();
        //cache l'overlay
        $(".overlay").hide();

        Session.set('isVoteExist',false);

      },

      // Lorsqu'on clique sur le bouton "+" on ajoute une réponse possible au form
      'click .btn_add_answer' : function(event){
        event.preventDefault();
        var formData = $('#new_question_form').serializeArray();
        var formLength = formData.length;

        $( ".new_question" ).append( '<div id="answer_'+ formLength+'"><input type="text"  name="answer_'+ formLength+'" placeholder="Choix n° '+ formLength +'" /><span>Media associé :</span><select id="select_media_output_' + formLength + '"><option value="null"></option></select></div>');
        console.log(formLength);
        Template.questionnaireOverlay.fillMediaOutputOptions(formLength);
      },
      // Lorsqu'on clique sur le bouton "-" on supprime la dernière ligne du form si il y a un bn de réponse > 1
      'click .btn_remove_answer' : function(event){
        event.preventDefault();
        var formData = $('#new_question_form').serializeArray();
        var formLength = formData.length;

        if(formLength > 2){
         $("#new_question_form").children().last().remove();
        }


      },

      // Lorsqu'on valide le formulaire
      'click .btn_validate_form'(event) {
        //Récupère "si il y avait déjà un vote associé au média" et l'id du film ainsi que le média
        var isVote = Session.get('isVoteExist');
        var film_id = Session.get('filmId');
        var mon_media = Session.get('media');
        var mediaIdReponse = $('#select_media_output_1').val();
        var indexReponse = "";
        var idMedia = Session.get('mediaId');
        event.preventDefault();

        //Stocke les données du questionnaire sous forme d'Array
        var formData = $('#new_question_form').serializeArray();
        //Récupère la valeur de la Question
        var contentQuestion = document.getElementById("questionId").value;
        // Créer le vote
        var vote = {
          title: contentQuestion,
          content: contentQuestion,
          duree: 10,
          filmId: film_id
          
        };
        var reponse = {
          content: "",
          defaultChoice: false,
          mediaId: "",
          voteId: ""
        }

        // Check si un vote existe déjà pour ce film, si oui l'update sinon l'insert dans la BDD
        if(!isVote){
          //insert le vote
          Meteor.call('voteInsert', vote, mon_media, function(error, voteId) {
            Medias.update(idMedia, {$set: {voteId: voteId }});
            // Pour chaque réponse, si la réponse n'est pas vide créer une réponse dans la bdd
            console.log(formData)
            $.each(formData, function(idx, item) {
              console.log(item)
              if(item.name!="question"){
                if(item.name == "answer_1"){
                  reponse.defaultChoice=true;
                }else{
                  reponse.defaultChoice=false;
                  indexReponse = item.name.split('_')[1];
                  mediaIdReponse = $('#select_media_output_'+indexReponse).val();
                  reponse.mediaId=mediaIdReponse;
                }
                reponse.voteId = voteId
                reponse.mediaId=mediaIdReponse;
                reponse.content= item.value;
                Meteor.call('responseInsert', reponse,function (error, responseId) {

                  console.log(error, responseId)
                });

              }
            });
          });


        }else {
          // update le vote
          Meteor.call('voteUpdate',vote, mon_media, function(error, voteId){
            //update les réponses
            var arrayResponses = Session.get('responses');
            formData.forEach(function(item) {
              if(item.name!="question"){

              }
            });
          })



        }





        //Met fin au formulaire et cache l'overlay
       $(".overlay").hide();

        Session.set('isVoteExist',true);

      }
    })
