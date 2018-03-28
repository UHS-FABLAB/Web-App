var firebase = require("firebase");

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAcCCbGaZeRBNkoa4ZlhpXpLW6Bqdz7XOY",
    authDomain: "uhs-api-v2.firebaseapp.com",
    databaseURL: "https://uhs-api-v2.firebaseio.com",
    projectId: "uhs-api-v2",
    storageBucket: "uhs-api-v2.appspot.com",
    messagingSenderId: "6007127132"
  };
  firebase.initializeApp(config);
  