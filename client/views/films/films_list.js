
Template.filmsList.helpers({
  films: function() {
     return Films.find({}, {sort: {submitted: -1}});
  }
});
