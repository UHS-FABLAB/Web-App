Meteor.publish('films', function() {
  return Films.find();
});

Meteor.publish('medias', function(filmId) {
  check(filmId, String);
  return Medias.find({filmId: filmId});
});

Meteor.publish('votes', function() {
  return Votes.find();
});


Meteor.publish('responses', function() {
  return Responses.find();
});