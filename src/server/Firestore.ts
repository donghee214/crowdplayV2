import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDmUL2-8JiIXvzEzKtFd5LJ3McsEiGp3CA",
  authDomain: "crowdplayv2.firebaseapp.com",
  databaseURL: "https://crowdplayv2.firebaseio.com",
  projectId: "crowdplayv2",
  storageBucket: "crowdplayv2.appspot.com",
  messagingSenderId: "357291700440"
};

firebase.initializeApp(config);


export default firebase

