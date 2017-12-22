Sequences = new Mongo.Collection('sequences');

Meteor.methods({
  sequenceInsert: function(sequenceAttributes) {
    check(this.userId, String);
    check(sequenceAttributes, {
      filmId: String,
      body: String
    });
    var user = Meteor.user();
    var film = Films.findOne(sequenceAttributes.filmId);
    if (!film)
      throw new Meteor.Error('invalid-sequence', 'Vous devez commenter sur un film');
    sequence = _.extend(sequenceAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    // update the post with the number of comments
    Films.update(sequence.filmId, {$inc: {sequencesCount: 1}});

    return Sequences.insert(sequence);
  }
});
