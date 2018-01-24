Votes = new Mongo.Collection('votes');

Votes.schema = new SimpleSchema({
    title: {type: String},
    duree: {type: Number},
    filmId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
  });
