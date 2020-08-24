import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"


const config = {
  apiKey: "AIzaSyAEhUWdsEqDv9RghSgu38FkRNBnCjXFf20",
  authDomain: "thinkpiece2.firebaseapp.com",
  databaseURL: "https://thinkpiece2.firebaseio.com",
  projectId: "thinkpiece2",
  storageBucket: "thinkpiece2.appspot.com",
  messagingSenderId: "739233581077",
  appId: "1:739233581077:web:6d29bb1fd946b59417a61c",
};

firebase.initializeApp(config);

window.firebase = firebase; // for debug TODO:

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user ", error);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid)
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage()
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
