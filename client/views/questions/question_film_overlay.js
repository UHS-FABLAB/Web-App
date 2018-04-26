
Template.questionFilmOverlay.helpers({
  responses: function() {
    console.log(Responses.findOne({voteId: this.idQ}))
    return Responses.find({voteId: this.idQ});
  },
  question: function(){
    console.log(this.idQ);
    console.log(Votes.findOne({_id: this.idQ}))
    return Votes.findOne({_id: this.idQ});
  }
})
