Template.questionFilmOverlay.onCreated(function bodyOnCreated() {

 Meteor.subscribe('votes');
 Meteor.subscribe("responses");
 })


Template.questionFilmOverlay.helpers({
  responses: function() {
    console.log(Responses.find({voteId: this.idQ}))
    return Responses.find({voteId: this.idQ});
  },
  question: function(){
    return Votes.findOne({_id: this.idQ});
  }
})
