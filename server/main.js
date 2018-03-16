import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

Meteor.startup(() => {
  // code to run on server at startup


});

Meteor.publish('films', function(title) {
  return Films.find({flagged: false, title: title});
});


Meteor.publish('allFilmsByTitle', function(){
  return Films.find({'title':'Meteor'}, {fields: {
    date: false
  }});
});
