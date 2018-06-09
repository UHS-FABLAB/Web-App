Questions = new Mongo.Collection("questions");

Questions.schema = new SimpleSchema({
    content: {type: String},
    voteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
  });

  Meteor.methods({
    questionInsert: function(questionAttributes) {
      check(Meteor.userId(), String);
      check(questionAttributes, {
          content: String,
          filmId: String
      });

      return Questions.insert(questionAttributes);
  },
    questionUpdate: function(questionAttributes){

      var user = Meteor.user();
      var question = _.extend(questionAttributes, {
          userId: user._id,
          author: user.username,
          submitted: new Date(),
    });
    return Questions.update(question);
   },
   questionGet: function(){
       return Questions.find();
    },
    questionGetOne: function(questionId){
        return Questions.findOne({_id: questionId});
    },
    questionDelete: function(questionId){
        return Questions.remove({_id: questionId});
    },
    questionGetOneByMedia: function(mediaId){
      var m = Medias.findOne({_id: mediaId})
      return Questions.findOne({_id: m.voteId})
    }
});
