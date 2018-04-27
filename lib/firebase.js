// Initialize Firebase
var firebase = require('firebase');

const DEFAULT_TIMER = 10;

var data = null;

var config = {
    apiKey: "AIzaSyAcCCbGaZeRBNkoa4ZlhpXpLW6Bqdz7XOY",
    authDomain: "uhs-api-v2.firebaseapp.com",
    databaseURL: "https://uhs-api-v2.firebaseio.com",
    projectId: "uhs-api-v2",
    storageBucket: "uhs-api-v2.appspot.com",
    messagingSenderId: "6007127132"
};

firebase.initializeApp(config);

// When we vote
firebase.database().ref('/').on('value', function(snapshot) {
    let value = snapshot.val();
    if (value) {
        data = value;
    }
});

function getResultVote(display, voteId) {
    let results = {};
    let listVotes = getVotes(display, voteId);
    Object.keys(listVotes).map(function(objectKey, index) {
        let value = listVotes[objectKey]['resultat'];
        if (!results[value]) {
            results[value] = 0;
        }
        results[value] += 1;
    });
    return results;
}

function getVotes(display, voteId) {
    if (!data) return null;
    return data[display]['vote'][voteId];
}

function getWinnerVote(display, voteId) {
    let results = getResultVote(display, voteId);
    let winner = null;
    if (results) {
        Object.keys(results).map(function(objectKey, index) {
            let value = results[objectKey];
            if (!winner || (winner && winner.votes < value)) {
                winner = { 'reponse' : objectKey, 'votes' : value };
            }
        });
    }
    return winner;
}

function postNewVote(display, voteId, question, responsesArr, timer) {
    if (data) {
        let refDisplay = firebase.database().ref(display);
        let id = parseInt(data[display]['id'])+1;
        let responses = {};
        responsesArr.map(function (response) {
            responses['reponse' + Object.keys(responses).length] = response;
        });

        refDisplay.update({ id: id, vote_id: voteId, question : question, reponse : responses, timer: timer, attenteQuestion: false });

        let interval = setInterval(() => {
            timer--;
            if (timer >= 0) {
                refDisplay.update({ timer : timer });
            } else {
                refDisplay.update({ attenteQuestion : true });
                clearInterval(interval);
            }
        },  1000)
        return id;
    }

    return null;
}

function getCurrentVoteId(display) {
    if (!data) return null;
    return data[display]['vote_id'];
}

Meteor.methods({
    postNewVoteFirebase(display, voteId) {
        let vote = Votes.findOne({ _id : voteId });
        let responses = Responses.find({ voteId : voteId }).fetch();
        let responsesArr = [];
        let timer = parseInt(vote.duree) || DEFAULT_TIMER
        responses.map(response => {
            responsesArr.push(response.content);
        });
        postNewVote(display, voteId, vote.title, responsesArr, vote.duree);
        return {message : 'OK'}
    },
    getWinnerCurrentVoteFirebase(display) {
        let voteId =  getCurrentVoteId(display);
        let winner = getWinnerVote(display, voteId);
        if (winner && winner.response && winner.votes) {
            let response = Responses.findOne({ voteId : voteId, content: winner.response });
            return {response : response, nbVote : winner.votes, error : false }
        }
        return {message : 'Impossible de trouver le gagnant !', error : true }
    }
});


//listenVoteOnDisplay('ecran1', 2);
//console.log(getWinnerVote('ecran1', 2));
//postNewVote('ecran1', ['jean', 'jkack', 'mochk']);
