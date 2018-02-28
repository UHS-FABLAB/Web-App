Meteor.publish('films', function() {
  return Films.find();
});

Meteor.publish('medias', function(filmId) {
  check(filmId, String);
  return Medias.find({filmId: filmId});
});
