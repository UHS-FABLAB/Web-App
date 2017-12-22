Meteor.publish('films', function() {
  return Films.find();
});

Meteor.publish('sequences', function(filmId) {
  check(filmId, String);
  return Sequences.find({filmId: filmId});
});
