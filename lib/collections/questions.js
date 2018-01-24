Questions = new Mongo.Collection("questions");

Questions.schema = new SimpleSchema({
    content: {type: String},
    voteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}

  });