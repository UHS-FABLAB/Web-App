Medias = new Mongo.Collection("medias");

Medias.schema = new SimpleSchema({
    title: {type: String},
    duree: {type: Number},
    isGame: {type: Boolean},
    url:  {type: String},
    alt: {type: String, optional: true},
    description: {type:String, optional: true},
    filmId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    voteId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true},
    fileId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true}
  });

  Medias.allow({
    update: function(userId, media) { return ownsDocument(userId, media); },
    remove: function(userId, media) { return ownsDocument(userId, media); },
  });
  Meteor.methods({
    // Insert a media
    mediaInsert: function(mediaAttributes) {
      check(this.userId, String);
      check(mediaAttributes, {
        title: String,
        duree: Number,
        isGame: Boolean,
        url: String,
        alt: String,
        description: String,
        filmId: String
      });
      var user = Meteor.user();
      var film = Films.findOne(mediaAttributes.filmId);
      if (!film)
        throw new Meteor.Error('invalid-media', 'Vous devez commenter sur un film');
      media = _.extend(mediaAttributes, {
        userId: user._id,
        author: user.email,
        submitted: new Date()
      });
      // update the post with the number of comments
      Films.update(media.filmId, {$inc: {mediaCount: 1}});

      return Medias.insert(media);
    },
  // Update a media
  mediaUpdate: function(mediaAttributes){
    check(mediaAttributes, {
      title: String,
      duree: Number,
      isGame: Boolean,
      url: String,
      alt: String,
      description: String,
      filmId: String,
      _id: String
    });

    var user = Meteor.user();
    media = _.extend(mediaAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

   return Medias.update(media._id, { $set: media });
  },
  mediaGet: function(){
      return Medias.find();
   },
   mediaGetOne: function(mediaId){
       return Medias.findOne({_id: mediaId});
   },
   mediaDelete: function(mediaId){
       return Medias.remove({_id: mediaId});
   },
   buildGetOneByMediaId: function(mediaId){
      var b = Builds.findOne({title: mediaId});
      return b

   },
   zipGetOneByMediaId: function(mediaId){
      var b = Zips.findOne({title: mediaId});
      return b

   },

  }
);
