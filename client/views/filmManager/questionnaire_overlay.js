
     /** @TODO
      * - bouton confirmer qui lie le film-id et la réponse
      * - Oncrate lié les question associé
      * - valider le formulaire insére les données en bdd
      */
     Template.questionnaireOverlay.onCreated(function bodyOnCreated() {

    
      Meteor.subscribe('votes');
      Meteor.subscribe("responses");


      })

     Template.questionnaireOverlay.events({
        // Lorsqu'on clique sur annuler, on cache l'overlay et on vide le formulaire
      'click .btn_exit_form' : function(event){
        event.preventDefault();
        //cache l'overlay
        $(".overlay").hide();
        // réinitialise les champs du formulaire à null
        
        // var formData = $('#new_question_form').serializeArray();
        // var formLength = formData.length;
        // // Tant qu'il reste des champ input ajoutés les supprime
        // while (formLength > 2){
        //   $("#new_question_form").children().last().remove();
        //   formLength--;
        // }

        Session.set('isVoteExist',false);

      },

      // Lorsqu'on clique sur le bouton "+" on ajoute une réponse possible au form
      'click .btn_add_answer' : function(event){
        event.preventDefault();
        var formData = $('#new_question_form').serializeArray();
        var formLength = formData.length;

        $( ".new_question" ).append( '<div id="answer_'+ formLength+'"><input type="text"  name="answer_'+ formLength+'" placeholder="Choix n° '+ formLength +'" /></div>');
  
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

        // Check si un vote existe déjà pour ce film, si oui l'update sinon l'insert dans la BDD
        if(!isVote){
          Meteor.call('voteInsert', vote, mon_media);
        }else {
          Meteor.call('voteUpdate',vote, mon_media)          
        }

        
        var reponse = {
          content: "",
          defaultChoice: false,
          mediaId: mon_media._id,
          voteId: ""
        }
        // Pour chaque réponse, si la réponse n'est pas vide créer une réponse dans la bdd
        formData.forEach(function(item) {
          if(item.name!="question"){
            if(item.name == "answer_1"){
              reponse.defaultChoice=true;
            }else{
              reponse.defaultChoice=false;
            }
            reponse.content= item.value;
            Meteor.call('responseInsert', reponse); 

          }
        });

        //Met fin au formulaire et cache l'overlay
       $(".overlay").hide();
       
        Session.set('isVoteExist',true);

      }
    })