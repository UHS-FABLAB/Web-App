Template.mediaTest.helpers({
  isMediaGame: function() {
    var mBool = Medias.findOne(this._id);
    return mBool.isGame;
  },
  currentMediaId: function() {
    return this._id;
  }
});
