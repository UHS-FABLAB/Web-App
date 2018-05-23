
Votes = new Mongo.Collection('votes');

Votes.schema = new SimpleSchema({
    title: {type: String},
    duree: {type: Number},
    content: {type: String},
    mediaId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
  });

  Meteor.methods({
    voteInsert: function(voteAttributes) {
        
      check(Meteor.userId(), String);
      check(voteAttributes, {
          title: String,
          duree: Number,
          content: String,
          mediaId: String
      });
      var user = Meteor.user();
      vote = _.extend(voteAttributes, {
        userId: user._id,
        author: user.email,
        submitted: new Date()
      });
      var monVote= Votes.insert(vote);
      return monVote;
  },
    voteUpdate: function(voteAttributes,media){
        
      var user = Meteor.user();
      var vote = _.extend(voteAttributes, {
          userId: user._id,
          author: user.username,
          submitted: new Date(),
    });
    return Votes.update(media.voteId, { $set: vote });

  },
  voteGet: function(){
      console.log(Votes.find());
      return Votes.find();
   },
   voteGetOne: function(voteId){
       return Votes.findOne({_id: voteId});
   },
   voteGetByFilmId: function(film_id){
    return Votes.findOne({filmId: film_id});
    }, 
   voteDelete: function(voteId){
       return Votes.remove({_id: voteId});
   }
  });