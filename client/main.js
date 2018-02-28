import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

if (Meteor.isClient) {
    Template.registerPage.events({
        'submit form': function(event) {
            event.preventDefault();
            var emailVar = event.target.registerEmail.value;
            var passwordVar = event.target.registerPassword.value;
            console.log("Form register submitted.");
            Accounts.createUser({
                email: emailVar,
                password: passwordVar
            });
        }
    });

    Template.loginPage.events({
      'submit form': function(event) {
          event.preventDefault();
          var emailVar = event.target.loginEmail.value;
          var passwordVar = event.target.loginPassword.value;
          Meteor.loginWithPassword(emailVar, passwordVar);
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
