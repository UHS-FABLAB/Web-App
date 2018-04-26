Meteor.publish('films', function() {
  return Films.find();
});

Meteor.publish('medias', function(filmId) {
  check(filmId, String);
  return Medias.find({filmId: filmId});
});

Meteor.publish('allBuilds', function(){
    return Zips.find();
});

Meteor.publish('build', function(id){
    return Zips.find({_id:id});
});

Meteor.publish('files', function(){
    return Files.find();
});

Meteor.publish('file', function(id){
    return Files.find({_id: id});
});


Meteor.publish('votes', function() {
  return Votes.find();
});


Meteor.publish('responses', function() {
  return Responses.find();
});
