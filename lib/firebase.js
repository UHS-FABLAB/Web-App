// Initialize Firebase
var firebase = require('firebase');

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
				winner = { 'response' : objectKey, 'votes' : value };
			}
		});
	}
	return winner;
}

function postNewVote(display, responsesArr) {
	if (data) {
		let id = parseInt(data[display].id) + 1;
		firebase.database().ref(display + '/id').set(id);
		
		let responses = {};
		responsesArr.map(function (response) {
			responses['reponse' + Object.keys(responses).length] = response;
		});

		firebase.database().ref(display + '/reponse').set(responses);
		return id;
	}

	return null;
}

//listenVoteOnDisplay('ecran1', 2);
//console.log(getWinnerVote('ecran1', 2));
//postNewVote('ecran1', ['jean', 'jkack', 'mochk']);
