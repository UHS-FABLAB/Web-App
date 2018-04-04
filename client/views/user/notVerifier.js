import { Meteor } from 'meteor/meteor';

// Fonction qui permet de renvoyer un lien de vérification en cliquant sur un bouton.
Template.notVerified.events({
    'click a': function(){
    Meteor.call('sendVerificationLink',(error,response) => {
        if (error){
            console.log(error);
        }
    });
}
    
});


