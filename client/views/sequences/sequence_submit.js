Template.sequenceSubmit.onCreated(function() {
  Session.set('sequenceSubmitErrors', {});
});

Template.sequenceSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('sequenceSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('sequenceSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.sequenceSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var sequence = {
      body: $body.val(),
      filmId: template.data._id
    };

    var errors = {};
    if (! sequence.body) {
      errors.body = "Please write some content";
      return Session.set('sequenceSubmitErrors', errors);
    }

    Meteor.call('sequenceInsert', sequence, function(error, sequenceId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
