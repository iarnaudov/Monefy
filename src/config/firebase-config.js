import firebase from 'firebase/app';
import "firebase/firestore"
import "firebase/auth"

var config = {
    apiKey: "AIzaSyBCEL3P2SWPC9nLi91fkGr6Q7_1JvvFa8U",
    authDomain: "monefy-app.firebaseapp.com",
    databaseURL: "https://monefy-app.firebaseio.com",
    projectId: "monefy-app",
    storageBucket: "monefy-app.appspot.com",
    messagingSenderId: "1086339531439"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase