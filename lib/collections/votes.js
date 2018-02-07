Votes = new Mongo.Collection('votes');

Votes.schema = new SimpleSchema({
    title: {type: String},
    duree: {type: Number},
    filmId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
  });

  Meteor.methods({
    voteInsert: function(voteAttributes) {
      check(Meteor.userId(), String);
      check(voteAttributes, {
          title: String,
          duree: String,
          filmId: String
      });
  
      return Votes.insert(voteAttributes);
  },
    voteUpdate: function(voteAttributes){
        
      var user = Meteor.user();
      var vote = _.extend(voteAttributes, {
          userId: user._id,
          author: user.username,
          submitted: new Date(),
    });
    return Votes.update(vote);

  },
  voteGet: function(){
      return Votes.find();
   },
   voteGetOne: function(voteId){
       return Votes.findOne({_id: voteId});
   }
  });