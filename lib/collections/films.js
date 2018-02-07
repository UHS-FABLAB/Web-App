Films = new Mongo.Collection('films');

Films.schema = new SimpleSchema({
    title: {type: String},
    description: {type: String},
    firstMediaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
  });
validateFilm = function (film) {
  var errors = {};
  if (!film.title)
    errors.title = "Please fill in a title";
  if (!film.description)
    errors.description = "Please fill in a description";
  return errors;
}


Films.allow({
  update: function(userId, film) { return ownsDocument(userId, film); },
  remove: function(userId, film) { return ownsDocument(userId, film); },
});

Films.deny({
  update: function(userId, film, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'title', 'description').length > 0);
  }
});

Films.deny({
    update: function(userId, film, fieldNames, modifier) {
      var errors = validateFilm(modifier.$set);
      return errors.title || errors.url;
    }
});

 Meteor.methods({
     filmInsert: function(filmAttributes) {
         check(Meteor.userId(), String);
         check(filmAttributes, {
             title: String,
             url: String
         });

         var errors = validateFilm(filmAttributes);
         if (errors.title || errors.url)
            throw new Meteor.Error('invalid-film', "You must set a title and URL for your film");


         if (Meteor.isServer) {
            filmAttributes.title += filmAttributes.title + "(server)";
            // attente de 5 secondes
            Meteor._sleepForMs(5000);
          } else {
              filmAttributes.title += "(client)";
          }

         var filmWithSameLink = Films.findOne({url: filmAttributes.url});
         if (filmWithSameLink) {
             return {
                 filmExists: true,
                 _id: filmWithSameLink._id
             }
         }

         var user = Meteor.user();
         var film = _.extend(filmAttributes, {
             userId: user._id,
             author: user.username,
             submitted: new Date(),
             mediaCount: 0
         });
         var filmId = Films.insert(film);
         return {
             _id: filmId
         };
     },
    filmUpdate: function(filmAttributes){
         
        var user = Meteor.user();
        var film = _.extend(filmAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            mediaCount: 0
        });
        return Film.update(film);
     },
     filmGet: function(){
         return Film.find();
      },
      filmGetOne: function(filmId){
          return Film.findOne({_id: filmId});
      }
 }
);
