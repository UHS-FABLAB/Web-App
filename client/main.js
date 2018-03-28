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

            console.log("Form register submitted.");

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
                        }else {
                            console.log("mail send");
                        }
                    })
                }
            });
    }});






    Template.loginPage.events({
      'submit form': function(event) {
          event.preventDefault();
          var emailVar = event.target.loginEmail.value;
          var passwordVar = event.target.loginPassword.value;
          Meteor.loginWithPassword(emailVar, passwordVar);
          // Redirection
          console.log("Form login submitted.");
      }
    });

    Template.header.events({

      'click .logout': function(event){
          event.preventDefault();
          Meteor.logout();
      }
    });
}
