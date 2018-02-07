Responses = new Mongo.Collection("responses");

Responses.schema = new SimpleSchema({
    content: {type: String},
    gameId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    voteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}

  });

  Meteor.methods({
    responseInsert: function(responseAttributes) {
      check(Meteor.userId(), String);
      check(responseAttributes, {
          content: String,
          gameId: String,
          voteId: String
      });
  
      return Responses.insert(responseAttributes);
  },
    responseUpdate: function(responseAttributes){
        
      var user = Meteor.user();
      var response = _.extend(responseAttributes, {
          userId: user._id,
          author: user.username,
          submitted: new Date(),
    });
    return Responses.update(response);
 },
 responseGet: function(){
     return Responses.find();
  },
  responseGetOne: function(responseId){
      return Responses.findOne({_id: responseId});
  }
  
  });
