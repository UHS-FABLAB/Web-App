Template.filmEdit.onCreated(function() {
  Session.set('filmEditErrors', {});
});
Template.filmEdit.helpers({
  errorMessage: function(field) {
    return Session.get('filmEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('filmEditErrors')[field] ? 'has-error' : '';
  }
});


Template.filmEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentFilmId = this._id;

    var filmProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    var errors = validatePost(postProperties);
    if (errors.title || errors.url)
      return Session.set('postEditErrors', errors);

    Films.update(currentFilmId, {$set: filmProperties}, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
        throwError(error.reason);
      } else {
        Router.go('filmPage', {_id: currentFilmId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this film?")) {
      var currentFilmId = this._id;
      Films.remove(currentFilmId);
      Router.go('filmsList');
    }
  }
});
