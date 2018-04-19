import { Meteor } from 'meteor/meteor';
// import { FilesCollection } from 'meteor/ostrio:files';

Meteor.startup(() => {
  // code to run on server at startup
  
  /* Imports for server-side startup go here. */

// Configure la variable d'environement MAIL URL  pour envoyer les mails de vérification par smtp
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var smtp = {
  username: 'uhs.api.ynov',
  password: 'uhs-api-ynov',
  server:   'smtp.gmail.com',
  port: 465
}
process.env.MAIL_URL = 'smtps://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;


});

Meteor.publish('films', function(title) {
  return Films.find({flagged: false, title: title});
});

Meteor.methods({

  // Fonction qui envoie un mail de vérification.
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      // Réécrit l'url de vérification pour supprimer le '#' ce qui permet de call la  fonction toute faite de Accounts. 
      Accounts.urls.verifyEmail = function(token){
        return Meteor.absoluteUrl("verify-email/" + token);
      };
      return Accounts.sendVerificationEmail( userId );
    }
  }
});

Meteor.publish('allFilmsByTitle', function(){
  return Films.find({'title':'Meteor'}, {fields: {
    date: false
  }});
});

Zips.allow({
    'insert': function (userId, fileObj) {
      //  console.log("insert currentUser:" + userId);
        //console.log(fileObj);

        return userId && userId === fileObj.owner._id;
    },
    'download': function(userId, fileObj) {
        return true;
    },
    'update': function(userId, fileObj){
        //console.log("update currentUser:" + userId);

        return userId && fileObj.owner._id === userId;
    },
    'remove' : function(userId, fileObj){
        //console.log("currentUser:" + userId);

        var file = Meteor.settings.public.zipFolder+fileObj.copies.zips.key;

        //console.log("remove file:" + file);
        return userId && userId === fileObj.owner._id;
    }
});
