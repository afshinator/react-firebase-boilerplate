import firebase from 'firebase/app';
import'firebase/firestore'

const config = {
  apiKey: "AIzaSyAEhUWdsEqDv9RghSgu38FkRNBnCjXFf20",
  authDomain: "thinkpiece2.firebaseapp.com",
  databaseURL: "https://thinkpiece2.firebaseio.com",
  projectId: "thinkpiece2",
  storageBucket: "thinkpiece2.appspot.com",
  messagingSenderId: "739233581077",
  appId: "1:739233581077:web:6d29bb1fd946b59417a61c"
};

firebase.initializeApp(config);

window.firebase = firebase;   // for debug TODO:

export const firestore = firebase.firestore()
export default firebase;