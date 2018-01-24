Reponses = new Mongo.Collection("reponses");

Reponses.schema = new SimpleSchema({
    content: {type: String},
    gameId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    voteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}

  });