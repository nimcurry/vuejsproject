import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6zVECDr12Qix_NZAFsIrn2VCf6Ep0l2U',
  authDomain: 'musicnimcurry.firebaseapp.com',
  projectId: 'musicnimcurry',
  storageBucket: 'musicnimcurry.appspot.com',
  appId: '1:927522350076:web:343ec4d5cb758ff3b5c879',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth, db, usersCollection, storage, songsCollection, commentsCollection,
};
