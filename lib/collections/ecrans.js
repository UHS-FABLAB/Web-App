Ecrans = new Mongo.Collection('ecrans');

Ecrans.schema = new SimpleSchema({
    number: {type: Number},
    description: {type: String},
    filmId: {type: String, regEx: SimpleSchema.RegEx.Id}
  });
