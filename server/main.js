import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  
  /* Imports for server-side startup go here. */

process.env.MAIL_URL = "smtp://postmaster@sandbox7182c35800f14d0ea13ed1dad692b926.mailgun.org:ad1f50961b55a2f2014730938bd11466-833f99c3-5c74770e@smtp.mailgun.org:2525";

});

Meteor.publish('films', function(title) {
  return Films.find({flagged: false, title: title});
});

Meteor.methods({
  sendVerificationLink() {
    console.log("test serveur side");
    let userId = Meteor.userId();
    console.log(userId);
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }
});

Meteor.publish('allFilmsByTitle', function(){
  return Films.find({'title':'Meteor'}, {fields: {
    date: false
  }});
});
// test