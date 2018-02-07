Medias = new Mongo.Collection("media");

Medias.schema = new SimpleSchema({
    title: {type: String},
    duree: {type: Number},
    isGame: {type: Boolean},
    url:  {type: String},
    alt: {type: String, optional: true},
    filmId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    voteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}

  });

  Meteor.methods({
    // Insert a media
    mediaInsert: function(mediaAttributes) {
      check(this.userId, String);
      check(mediaAttributes, {
        title: String,
        duree: String,
        isGame: Boolean,
        url: String,
        alt: String,
        filmId: String,
        voteId: String
      });
      var user = Meteor.user();
      var film = Films.findOne(mediaAttributes.filmId);
      if (!film)
        throw new Meteor.Error('invalid-media', 'Vous devez commenter sur un film');
      media = _.extend(mediaAttributes, {
        userId: user._id,
        author: user.username,
        submitted: new Date()
      });
      // update the post with the number of comments
      Films.update(media.filmId, {$inc: {mediaCount: 1}});
  
      return Media.insert(media);
    },
  // Update a media
  mediaUpdate: function(mediaAttributes){
    var user = Meteor.user();
    media = _.extend(mediaAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

   return Media.update(media);
  },
  mediaGet: function(){
      return Medias.find();
   },
   mediaGetOne: function(mediaId){
       return Medias.findOne({_id: mediaId});
   },
   mediaDelete: function(mediaId){
       return Medias.remove({_id: mediaId});
   }

  }
);
  