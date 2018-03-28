import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

Meteor.startup(() => {
  // code to run on server at startup

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