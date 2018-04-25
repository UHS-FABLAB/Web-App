Template.filmPage.helpers({
  sequences: function() {
    return Sequences.find({filmId: this._id});
  }
});


Template.filmPage.events({
  'click .videoPlayer-reponse': function (e) {
    console.log()
    $('.active-button').removeClass('active-button')
    $(e.currentTarget).addClass('active-button')
  //  $(this).addClass('.active-button')
    console.log("You pressed the button");
  }
})

var barLoader;
var wait = true;
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


function loadWebGLGame(idBuild){
  let newWebGL = $('<iframe src="http://localhost:3000/webgl/'+idBuild+'"  width="100%"  height="100%"></iframe>');
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

function loadNVP (idVIdeo) {

  let newVideo = $('<video class="fullscreen" id="videoPlayer'+idVIdeo+'" ><source id="SourceVd" src="http://localhost:3000/video/'+idVIdeo+'" type="video/mp4"></video>');
console.log('oko')
//  setTimeout(function () {
   $('.vplayer').append(newVideo);
   $('#videoPlayer'+current+'').remove();
   $('#webGL').remove()
   newVideo.show();
   $('.videoPlayer-choix').hide()
   $('video').each( function () {
     this.play();
   });
   $('div').find('#myLoader').width('0px')
    wait = true;
   barLoader()
   current = idVIdeo
  //}, 3000);
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
  //  console.log('actual :', actual)

    return actual;
  }

$(document).ready(function(){

  $('videoPlayer-reponse').click(function () {

    alert('ok')
  })

  function findSize(el, size) {
    //console.log(getComputedStyle(el[0],null))
      /* size must be 'width' or ' height' */
      return window.getComputedStyle
          ? getComputedStyle(el[0],null).getPropertyValue(size)
          : el[0]['client'+size.substr(0,1).toUpperCase() + size.substr(1)] + 'px';
  }

  if ($('#videoPlayer').length > 0) {
    barLoader = function(){

      launchTime = new Date();
      console.log('ok')
       $('.videoPlayer-choix').show()
      var wdthActu = findSize($('.videoPlayer-bloc-loader').find('.loader-line'), 'width');
      var wdthPxPar = findSize($('.videoPlayer-bloc-loader'), 'width');

      wdthPxPar = Math.round(parseFloat(wdthPxPar.split('px')[0]))
      if(parseFloat(wdthActu.split('px')[0]) < wdthPxPar){
        console.log('pl', wait)
        if(wait){
          console.log('wait passed')
      //    console.log(wdthPxPar)
      //    console.log('wait')
          actual = elapsedTime();
          wait = false;
          getProgress(actual,20,wdthPxPar);
        }
      }else{
       console.log('inferior values : ', parseFloat(wdthActu.split('px')[0]) < parseFloat(wdthPxPar.split('px')[0]))
      }

    }
  }

  function getProgress(actual,timeSet,wdthPxPar){
    actual = elapsedTime()
    actWdt = $('div').find('#myLoader').width();
  //  console.log(actWdt)
  //  console.log(actual,actWdt)
    if(actWdt < wdthPxPar){
      // px/s = pixels max / temps max
      pxByS = wdthPxPar/timeSet

      //1px ttes les x secondes => 1/pxByS
      var sForPx = 1/pxByS
    //    console.log(pxByS, sForPx);
       var remainder = actual % sForPx;
     // console.log(remainder, pxByS, actual,sForPx)
       if (remainder == 0){
        //console.log($('div').find('#myLoader'),dt,$(dt).width());
        actWdt = Math.round(actWdt / wdthPxPar * 100)
        // console.log('wdt',actWdt,'pxbs', pxByS/100,'wdtmax', wdthPxPar)
        actWdt = actWdt+1
        // console.log(actWdt);
        $('div').find('#myLoader').width('' + actWdt+ 'px')
        // console.log('act wdth :', $('div').find('#myLoader').width())
      }
      setTimeout(function(){
        // console.log(sForPx,actual,wdthPxPar);
        actual = elapsedTime()
        getProgress(actual,20,wdthPxPar)
      }, sForPx*100);
    }else{
      actual = elapsedTime()
      console.log('fin ',actual)
      // Recpu réponse depuis serveur

        //Pour poster un nouveau vote :
        /*
            Meteor.call('postNewVoteFirebase', NOM_ECRAN, VOTE_ID, (error,response) => {
                console.log(response);
            });
            NOM_ECRAN : est le nom de l'écran qui va aller dans firebase : DE BASE METTRE ecran1
            VOTE_ID : Numéro de vote DANS LA BASE DE DONNEES METEOR qu'on souhaite poster.
            Il va récupérer automatiquement les réponses à envoyer à firebase

            RETOUR :
            {message : 'OK'}
        */

        //Pourobtenir l'ID du média gagnant du vote ACTUEL:
        /*
            Meteor.call('getWinnerCurrentVoteFirebase', NOM_ECRAN, (error,response) => {
                console.log(response);
            });
            NOM_ECRAN : est le nom de l'écran qui va aller dans firebase : DE BASE METTRE ecran1
            Il va récupérer automatiquement l'ID du vote acutel

            RETOUR :
            Si OK : {response : response, nbVote : winner.votes, error : false }
            Si ERREUR : {message : 'Impossible de trouver le gagnant !', error : true }
        */

      $("#SourceVd").onload = function() {
          console.log( this.src );
      }

      //envoi nextid au serveur
      //redirectotoroute avec id


      var stri = $('#videoPlayer'+current+"").find('source').attr('src');
      //console.log()
      strFine = stri.substring(0,stri.lastIndexOf('/')+1);
      console.log(strFine)

      // Selon la value du bouton (vid_id || wgl_id )
      // switch
      // loadNVP ou loadWebGLGame
      var isGame = $('.videoPlayer-reponses').find('.active-button').find('i.mediaType').attr('name')

      if(isGame){
        loadNVP($('.videoPlayer-reponses').find('.active-button').attr('value'))
      }else{
        loadWebGLGame($('.videoPlayer-reponses').find('.active-button').attr('value'))
      }

      // créer le template de questionnaire
      // Lors du load préparer le questionnaire
      // Charger le template avec les questions et les values ( foreach )
      // Au sein du inner fullscreen append en display none
      // réinitialiser les Controles boutons




    }
  }

  setTimeout(function(){
    console.log('go');
  if (typeof barLoader == 'function') {
    barLoader()
  }
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
