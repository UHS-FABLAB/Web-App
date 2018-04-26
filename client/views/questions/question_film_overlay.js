
Template.questionFilmOverlay.helpers({
  responses: function() {
    return Responses.find({voteId: this.idQ});
  },
  question: function(){
    console.log(this.idQ);
    console.log(Questions.findOne({_id: this.idQ}))
    return Questions.findOne({_id: this.idQ});
  }
})
