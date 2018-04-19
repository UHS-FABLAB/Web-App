import { Meteor } from 'meteor/meteor';
// import { FilesCollection } from 'meteor/ostrio:files';

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
