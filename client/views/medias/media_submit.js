Template.mediaSubmit.onCreated(function() {
  Session.set('mediaSubmitErrors', {});
});



var videoDuration = 0;

Template.mediaSubmit.rendered = function(evt, instance) {


  window.URL = window.URL || window.webkitURL;
  document.getElementById('upload_film').onchange = setFileInfo;

  function setFileInfo() {
    var files = this.files;
    var video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      var duration = video.duration;
      videoDuration = duration;
      updateInfos();
    }

    video.src = URL.createObjectURL(files[0]);;
  }


  function updateInfos() {
    var infos = document.getElementById('film_duration');
    infos.innerHTML = videoDuration.toFixed(2) + 's.';
  }
}

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

    var isGameOrVideo = false;
    if($('.film_add_video_onglet.film_add_onglet_actif').children('.ajout_video').text() == 'Vidéo'){
      isGameOrVideo = false
    } else {
      isGameOrVideo = true
    }

    var urlMedia = $('#upload_film').val().split("\\")[$('#upload_film').val().split("\\").length-1]

    var media = {
      title: $('#titre_film').val(),
      duree: videoDuration,
      isGame: isGameOrVideo,
      url: urlMedia,
      alt: urlMedia,
      description: $('#description_film').val(),
      filmId: template.data._id
    };

    var errors = {};
    if (! media.title || ! media.url) {

      errors.body = "Please write some content";
      return Session.set('mediaSubmitErrors', errors);
    }
    if($('.onglet_actif').hasClass('onglet_add')){
      Meteor.call('mediaInsert', media, function(error, mediaId) {
        if (error){
          console.log(error)
          throwError(error.reason);
        } else {
          $('#titre_film').val('');
          $('#description_film').val('');
          $('#upload_film').val('');
        }
      });
    } else {
      media._id = $('.film_add_elements').attr('id')
      console.log(media, this)
      Meteor.call('mediaUpdate', media, function(error, mediaId) {
        if (error){
          console.log(error)
          throwError(error.reason);
        } else {
          $('#titre_film').val('');
          $('#description_film').val('');
          $('#upload_film').val('');
        }
      });
    }

  },
  'click .film_add_radio': function(e, template){
    console.log(e.currentTarget)
    if($(e.currentTarget).hasClass('film_add_video_onglet')){
      $('div.film_add_video_onglet').addClass('film_add_onglet_actif');
      $('div.film_add_jeuvideo_onglet').removeClass('film_add_onglet_actif');
    } else {
      $('div.film_add_video_onglet').removeClass('film_add_onglet_actif');
      $('div.film_add_jeuvideo_onglet').addClass('film_add_onglet_actif');
    }


  }
});
