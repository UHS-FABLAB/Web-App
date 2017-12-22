Template.filmPage.helpers({
  sequences: function() {
    return Sequences.find({filmId: this._id});
  }
});



// Vidéo actuelle
var current = 2
// Statut de la vidéo
var videoStatus = 1;


// Controles du lecteur
$('body').keyup(function(e) {
  if(e.keyCode == 8){
    $('video').each( function () {
      if (videoStatus == 0) {
        this.play();
        videoStatus = 1;
      }else {
        this.pause();
        videoStatus = 0;
      }
    });
   }
   if(e.keyCode == 32){
     $('video').each( function () {
       if (videoStatus == 0) {
         this.play();
         videoStatus = 1;
       }else {
         this.pause();
         videoStatus = 0;
       }
     });
   }
   // Monter le volume
   if (e.keyCode == 38) {
     $('video').each( function () {
       if (this.volume < 1) {
        this.volume  = this.volume + 0.2;
      }
     });
   }
   // Baisser le volume
   if (e.keyCode == 40) {
    $('video').each( function () {
      if (this.volume  > 0) {
        this.volume  = this.volume - 0.2;
      }
    });
   }
});


function loadWebGLGame(url){
  let newWebGL = $('<iframe src="'+url+'"  width="100%"  height="100%"></iframe>');
  let divA = $('<div class="fullscreen" id="webGL" style="display:inline-block;"></div>');
  let divB = $('<div class="divB"></div>');

  divB.append(newWebGL);
  divA.append(divB)
  $('body').append(divA);
  idNXV = 3;

  setTimeout(function () {
    $('#videoPlayer'+current+'').remove();

    setTimeout(function () {
      loadNVP(idNXV)
    }, 14010);
  }, 4500)

}

function loadNVP (id) {

  let newVideo = $('<video class="fullscreen" id="videoPlayer'+id+'" ><source src="http://localhost:3000/video/aGrgrTe9BRbKhtMFc/'+id+'" type="video/mp4"></video>');
console.log('oko')
  setTimeout(function () {
   $('body').append(newVideo);
   $('#videoPlayer'+current+'').remove();
   $('#webGL').remove()
   newVideo.show();
   $('video').each( function () {
     this.play();
   });
   current = id
  }, 3000);
}

  var launchTime = "";
  var actual = 0;

  function elapsedTime() {
    // later record end time
    var endTime = new Date();

    // time difference in ms
    var timeDiff = endTime - launchTime;

    // strip the miliseconds
    timeDiff /= 1000;

    // get seconds
    actual = timeDiff % 60;
    console.log('actual :', actual)

    return actual;
  }

$(document).ready(function(){

  function findSize(el, size) {
    //console.log(getComputedStyle(el[0],null))
      /* size must be 'width' or ' height' */
      return window.getComputedStyle
          ? getComputedStyle(el[0],null).getPropertyValue(size)
          : el[0]['client'+size.substr(0,1).toUpperCase() + size.substr(1)] + 'px';
  }
  var wait = true;
  function loadBAR(){

    if(launchTime == ""){
      launchTime = new Date();
    }

    var wdthActu = findSize($('.videoPlayer-bloc-loader').find('.loader-line'), 'width');
    var wdthPxPar = findSize($('.videoPlayer-bloc-loader'), 'width');

    wdthPxPar = Math.round(parseFloat(wdthPxPar.split('px')[0]))
    if(parseFloat(wdthActu.split('px')[0]) < wdthPxPar){
      if(wait){
        console.log(wdthPxPar)
        console.log('wait')
        actual = elapsedTime();
        wait = false;
        getProgress(actual,10,wdthPxPar);
      }
    }else{
      console.log('inferior values : ', parseFloat(wdthActu.split('px')[0]) < parseFloat(wdthPxPar.split('px')[0]))
    }

  }

  function getProgress(actual,timeSet,wdthPxPar){
    actual = elapsedTime()
    actWdt = $('div').find('#myLoader').width();
    console.log(actWdt)
    console.log(actual,actWdt)
    if(actWdt < wdthPxPar){
      // px/s = pixels max / temps max
      pxByS = wdthPxPar/timeSet

      //1px ttes les x secondes => 1/pxByS
      var sForPx = 1/pxByS
        console.log(pxByS, sForPx*1000);
       var remainder = actual % sForPx;
     // console.log(remainder, pxByS, actual,sForPx)
    //   if (remainder == 0){
        //console.log($('div').find('#myLoader'),dt,$(dt).width());
        //actWdt = Math.round(actWdt / wdthPxPar * 100)
        console.log('wdt',actWdt,'pxbs', pxByS/100,'wdtmax', wdthPxPar)
        actWdt = actWdt+1
        console.log(actWdt);
        $('div').find('#myLoader').width('' + actWdt+ 'px')
        console.log('act wdth :', $('div').find('#myLoader').width())
  //    }
      setTimeout(function(){
        console.log(sForPx,actual,wdthPxPar);
        actual = elapsedTime()
        getProgress(actual,10,wdthPxPar)
      }, sForPx*1000);
    }else{
      actual = elapsedTime()
      console.log('fin ',actual)
    }
  }

  setTimeout(function(){
    console.log('go');
  loadBAR()
}, 1000);


});




  // setTimeout(function () {
  //   loadNVP(1)
  // }, 1010);
  // setTimeout(function () {
  //   loadNVP(2)
  // }, 3000);
  // setTimeout(function () {
  //   loadWebGLGame("/unity/jeu_webgl/index.html")
  // }, 12000);
