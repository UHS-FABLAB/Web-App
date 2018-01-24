Template.mediaSubmit.onCreated(function() {
  Session.set('mediaSubmitErrors', {});
});

Template.mediaSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('mediaSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('mediaSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.mediaSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var media = {
      body: $body.val(),
      filmId: template.data._id
    };

    var errors = {};
    if (! media.body) {
      errors.body = "Please write some content";
      return Session.set('mediaSubmitErrors', errors);
    }

    Meteor.call('mediaInsert', media, function(error, mediaId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
