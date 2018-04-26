Template.mediaSubmit.onCreated(function() {
  Session.set('mediaSubmitErrors', {});
});




var videoDuration = 0;
var uploadFileAfterInsert = function(_idMedia, _filetype){

  // var fileObj = new FileObject(event.target.files[0]);
  // fileObj.metadata = {owner: Meteor.userId()};
  //


  var file;

  if(_filetype){
    file = $("input.image-bug.webgl-upload-manager")[0].files[0];
  }else {
    file = $("input.image-bug.video-upload-manager")[0].files[0];
  }


  console.log(file, _filetype);

  var fileObj = new FS.File(file);
  console.log('oo')
  fileObj.title = _idMedia;
  fileObj.owner = Meteor.user();
  fileObj.width = 1600;
  fileObj.height = 1200;
  console.log(fileObj)

  if(!_filetype){
    console.log('insert file');
    Files.insert(fileObj,function(err){
        Medias.update(media.fileId, {$set: {fileId: fileObj.id}});
    });
  }else {
    console.log("insert zip")
    Zips.insert(fileObj,function(err){
        Medias.update(media.fileId, {$set: {fileId: fileObj.id}});
    });
  }



  // var fileUploader = $('#upload_film')[0];
  // var fileId = "";
  // if (fileUploader.files && fileUploader.files[0]) {
  //   // We upload only one file, in case
  //   // there was multiple files selected
  //   console.log('increase metadata')
  //   var file = fileUploader.files[0];
  //   //file.metadata = {owner: Meteor.userId()};
  //   if (file) {
  //     var uploadObject = {
  //       file: file,
  //       streams: 'dynamic',
  //       chunkSize: 'dynamic'
  //     }
  //
  //
  //     console.log(Meteor.userId(), uploadObject, file)
  //     var uploadInstance = Files.insert(uploadObject, false);
  //     console.log(this, Template.instance())
  //
  //
  //     uploadInstance.on('start', function() {
  //       console.log(fileUploader)
  //       //this.currentUpload.set(this);
  //     });
  //
  //     uploadInstance.on('end', function(error, fileObj) {
  //       if (error) {
  //         window.alert('Error during upload: ' + error.reason);
  //       } else {
  //         console.log(fileObj)
  //
  //         // update the post with the number of comments
  //         Medias.update(media.fileId, {$set: {fileId: fileObj.id}});
  //
  //         window.alert('File "' + fileObj.name + '" successfully uploaded');
  //       }
  //       //this.currentUpload.set(false);
  //     });
  //
  //     uploadInstance.start();
  //   }
  // }
}


Template.mediaSubmit.rendered = function(evt, instance) {



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
    console.log('submit')
    var isGameOrVideo = false;
    if($('.film_add_video_onglet.film_add_onglet_actif').children('.ajout_video').text() == 'Vidéo'){
      isGameOrVideo = false
    } else {
      isGameOrVideo = true
    }

    var urlMedia= ""
    var descriptionM = "";
    var titleM = "";
    if(isGameOrVideo){
      descriptionM = $('#description_jeu').val();
      titleM = $('#titre_jeu').val();
      urlMedia = $("input.image-bug.webgl-upload-manager").val().split("\\")[$('input.image-bug.webgl-upload-manager').val().split("\\").length-1]
    }else {
      descriptionM = $('#description_film').val();
      titleM = $('#titre_film').val();
      urlMedia = $("input.image-bug.video-upload-manager").val().split("\\")[$('input.image-bug.video-upload-manager').val().split("\\").length-1]
    }

    console.log(urlMedia)
    var media = {
      title: titleM,
      duree: videoDuration,
      isGame: isGameOrVideo,
      url: urlMedia,
      alt: urlMedia,
      description: descriptionM,
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
          console.log(mediaId)
          uploadFileAfterInsert(mediaId, isGameOrVideo)
          $('#titre_film').val('');
          $('#description_film').val('');
          $('#upload_film').val('');
        }
      });
    } else {
      media._id = $('.film_add_elements').attr('id')

      Meteor.call('mediaUpdate', media, function(error, mediaId) {
        if (error){
          console.log(error)
          throwError(error.reason);
        } else {
          uploadFileAfterInsert(media._id, isGameOrVideo)


          $('#titre_film').val('');
          $('#description_film').val('');
          $('#upload_film').val('');
        }
      });
    }

  },
  /*manage video or game tabs*/
  'click .film_add_radio': function(e, template){
    console.log(e.currentTarget)
    if($(e.currentTarget).hasClass('film_add_video_onglet')){
      $('div.film_add_video_onglet').addClass('film_add_onglet_actif');
      $('div.film_add_jeuvideo_onglet').removeClass('film_add_onglet_actif');
      $('div.film_add_video').addClass('film_add_elem_active');
      $('div.film_add_jeuvideo').removeClass('film_add_elem_active');
    } else {
      $('div.film_add_video_onglet').removeClass('film_add_onglet_actif');
      $('div.film_add_jeuvideo_onglet').addClass('film_add_onglet_actif');
      $('div.film_add_jeuvideo').addClass('film_add_elem_active');
      $('div.film_add_video').removeClass('film_add_elem_active');
    }


  }
});
