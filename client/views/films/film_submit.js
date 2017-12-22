Template.filmSubmit.onCreated(function() {
  Session.set('filmSubmitErrors', {});
});

Template.filmSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('filmSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('filmSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.filmSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var film = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validateFilm(film);
    if (errors.title || errors.url)
      return Session.set('filmSubmitErrors', errors);

    Meteor.call('filmInsert', film, function(error, result) {
        // affiche l'erreur à l'utilisateur et s'interrompt
        if (error)
            return throwError(error.reason);

        // affiche ce résultat mais route tout de même
        if (result.filmExists)
            throwError('Ce lien a déjà été utilisé');

      //  Router.go('filmPage', {_id: result._id});
    });

    Router.go('filmsList');
  }
});
