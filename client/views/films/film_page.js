var current = 0

Template.filmPage.helpers({
  sequences: function() {
    return Sequences.find({filmId: this._id});
  },
  monQuestionnaire: function(){
    console.log(this.firstMediaId)
    var q = Medias.findOne({_id: this.firstMediaId});

    console.log(q, q.voteId)
    return q.voteId;
  }
});
var barLoader;
var wait = true;
// Vidéo actuelle
var currTemplateData;
// Statut de la vidéo
var videoStatus = 1;

function loadWebGLGame(idMedia){
  // recup du build via le title == mediaId
  Meteor.call('zipGetOneByMediaId', idMedia, function(error, idBuild){
    console.log(idBuild)
    //let newWebGL = $('<iframe src="http://localhost:3000/webgl/'+idBuild+'"  width="100%"  height="100%"></iframe>');
    let divA = $('<div class="fullscreen" id="webGL" style="display:inline-block;"></div>');
    let divB = $('<div class="divB"></div>');
    divA.append(divB)
    $('body').append(divA);
    Blaze.renderWithData(Template.play, {_id: idBuild}, $('#webGL').get(0));

    // divB.append(newWebGL);

//    idNXV = 3;

    setTimeout(function () {
      $('#videoPlayer'+current+'').remove();

      // setTimeout(function () {
      //   loadNVP(idNXV)
      // }, 14010);
    }, 4500)
  })
}

function loadNVP (idVideo) {

  let newVideo = $('<video class="fullscreen" id="videoPlayer'+idVideo+'" ><source id="SourceVd" src="http://localhost:3000/video/'+idVideo+'" type="video/mp4"></video>');
console.log('oko')
//  setTimeout(function () {
   $('#videoPlayer'+current+'').remove();
   $('.vplayer').append(newVideo);

   $('#webGL').remove()
   newVideo.show();
   $('.videoPlayer-choix').hide()
   $('video').each( function () {
     this.play();
   });
   $('div').find('#myLoader').width('0px')
    wait = true;
   barLoader()
   current = idVideo
  //}, 3000);
}

  var launchTime = "";
  var actual = 0;
  var actWdt = 50 ;

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


Template.filmPage.onRendered( function(){
  $('videoPlayer-reponse').click(function () {

    alert('ok')
  })

  current = this.data.firstMediaId
  currTemplateData = this

  function findSize(el, size) {
    //console.log(getComputedStyle(el[0],null))
      /* size must be 'width' or ' height' */
      return window.getComputedStyle
          ? getComputedStyle(el[0],null).getPropertyValue(size)
          : el[0]['client'+size.substr(0,1).toUpperCase() + size.substr(1)] + 'px';
  }

  if ($('#videoPlayer'+current+'').length > 0) {
    console.log('ok video player')
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
    console.log("div width : ", $('div').find('#myLoader').width())
    actWdt = $('div').find('#myLoader').width();
  //  console.log(actWdt)
    //console.log(actual,actWdt)
    if(actWdt < wdthPxPar){
      // px/s = pixels max / temps max
      pxByS = wdthPxPar/timeSet

      //1px ttes les x secondes => 1/pxByS
      var sForPx = 1/pxByS
    //    console.log(pxByS, sForPx);
       var remainder = actual % sForPx;
    //  console.log(parseFloat(remainder.toFixed(2)), pxByS, actual,sForPx)
       if (parseFloat(remainder.toFixed(3)) == 0.001){
        //console.log($('div').find('#myLoader'),dt,$(dt).width());
        console.log("addwidth", actWdt)
        //actWdt = Math.round(actWdt / wdthPxPar * 100)
        actWdt = actWdt / wdthPxPar * 100
        console.log(actWdt, wdthPxPar);
        // console.log('wdt',actWdt,'pxbs', pxByS/100,'wdtmax', wdthPxPar)
        actWdt = actWdt+1
        console.log(actWdt);
        $('div').find('#myLoader').width('' + actWdt+ '%')
        console.log('act wdth  end:', $('div').find('#myLoader').width())
      }
      setTimeout(function(){
      //   console.log("next");
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
      console.log(current)

      var stri = $('#videoPlayer'+current+"").find('source').attr('src');
      //console.log()
      strFine = stri.substring(0,stri.lastIndexOf('/')+1);
      console.log(strFine)

      // Selon la value du bouton (vid_id || wgl_id )
      // switch
      // loadNVP ou loadWebGLGame
    //  var isGame = $('.videoPlayer-reponses').find('.active-button').find('input.mediaId').attr('name');
      var myNextIdMed = $('.videoPlayer-reponses').find('.active-button').find('input.mediaId').attr('id');
      myNextIdMed = myNextIdMed.split('_')
      var isGame = myNextIdMed[1]
      var myNextIdMed = myNextIdMed[0]
      console.log(isGame,myNextIdMed)
      if(typeof isGame == 'undefined'){
        isGame = true
      }

      if(!isGame){
        console.log("nvp")
        loadNVP(myNextIdMed)
      }else{
        console.log("webgl")
        loadWebGLGame(myNextIdMed)
      }
      console.log(currTemplateData, myNextIdMed)

      // Récupération du questionnaire
      Meteor.call('voteGetOneByMedia', myNextIdMed, function(error, nexQuestio){
            console.log(nexQuestio)
        // Lors du load préparer le questionnaire
        // Charger le template avec les questions et les values ( foreach )

        $(".videoPlayer-bloc-question").remove()

        Blaze.renderWithData(Template.questionFilmOverlay, {idQ: nexQuestio._id}, $('#question_monQuestionnaire')[0]);


        // Au sein du inner fullscreen append en display none
        // réinitialiser les Controles boutons
      })





    }
  }

  setTimeout(function(){
    console.log('go');
    if (typeof barLoader == 'function') {
      console.log('gogogogogo')
      barLoader()
    }
  }, 5000);
})

$(document).ready(function(){




});
//
// Template.questionFilmOverlay.onRendered(function () {
//   barLoader();
// });




Template.filmPage.events({
  'click .videoPlayer-reponse': function (e) {
    console.log()
    $('.active-button').removeClass('active-button')
    $(e.currentTarget).addClass('active-button')
  //  $(this).addClass('.active-button')
    console.log("You pressed the button");
  }
})




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






  // setTimeout(function () {
  //   loadNVP(1)
  // }, 1010);
  // setTimeout(function () {
  //   loadNVP(2)
  // }, 3000);
  // setTimeout(function () {
  //   loadWebGLGame("/unity/jeu_webgl/index.html")
  // }, 12000);
