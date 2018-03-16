
Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #upload_film': function (e, template) {
    window.URL = window.URL || window.webkitURL;
    setFileInfo()
    console.log('change')
  }
});


function setFileInfo() {
  var files = $('#upload_film')[0].files;
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
