import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';



if (Meteor.isClient) {
    Template.registerPage.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar = event.target.registerEmail.value;
            var passwordVar = event.target.registerPassword.value;
            var surnameVar = event.target.registerSurname.value;
            var nameVar = event.target.registerName.value;
        
            // Gestion des erreurs : 
            var error_message = document.getElementById("connect_error_register");
            if(!emailVar || !passwordVar || !surnameVar || !nameVar || surnameVar.replace(/\s/g,'').length == 0 || nameVar.replace(/\s/g,'').length == 0){
                error_message.innerHTML = "Veuillez remplir correctement tous les champs."
                error_message.style.opacity = "100";

            }else {

            Accounts.createUser({
                email: emailVar,
                password: passwordVar,
                surname: surnameVar,
                name: nameVar
                
            }, function(error){
                if (error){
                    console.log(error);
                }else {
                    Meteor.call('sendVerificationLink',(error,response) => {
                        if (error){
                            console.log(error);
                        }
                    })
                }
            });
        }
    }});




    

    Template.loginPage.events({
      'submit form': function(event) {

          event.preventDefault();
          var emailVar = event.target.loginEmail.value;
          var passwordVar = event.target.loginPassword.value;
          Meteor.loginWithPassword(emailVar, passwordVar, (error) => {
              if (error.error == '403'){
              var messageErreur = document.getElementById("connect_error");
                messageErreur.style.opacity = "100";
            
            }
          });

      }
    });

    Template.header.events({

      'click .logout': function(event){
          event.preventDefault();
          Meteor.logout();
      }
    });
}
