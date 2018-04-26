Template.surveyFilmOverlay.helpers({

});

Template.surveyFilmOverlay.helpers({
  responses: function() {
    return Responses.find({voteId: this._id});
  }
})
