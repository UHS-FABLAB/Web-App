Responses = new Mongo.Collection("responses");

Responses.schema = new SimpleSchema({
    content: {type: String},
    defaultChoice: {type: Boolean},
    mediaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    voteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
  });


  Responses.allow({
    update: function(userId, response) { return ownsDocument(userId, response); },
    remove: function(userId, response) { return ownsDocument(userId, response); },
  });

  Meteor.methods({
    responseInsert: function(responseAttributes) {
      check(Meteor.userId(), String);
      check(responseAttributes, {
          content: String,
          defaultChoice: Boolean,
          mediaId: String,
          voteId: String
      });
      var user = Meteor.user();
      response = _.extend(responseAttributes, {
        userId: user._id,
        author: user.email,
        submitted: new Date()
      });

     var myResponse = Responses.insert(response);
      return myResponse;
  },
    responseUpdate: function(responseAttributes){

      var user = Meteor.user();
      var response = _.extend(responseAttributes, {
          userId: user._id,
          author: user.username,
          submitted: new Date(),
    });
    return Responses.update(media.voteId, { $set: vote });
 },
 responseGet: function(){
     return Responses.find();
  },
  responseGetOne: function(responseId){
      return Responses.findOne({_id: responseId});
  },
  responseDelete: function(responseId){
      return Responses.remove({_id: responseId});
  }

  });
