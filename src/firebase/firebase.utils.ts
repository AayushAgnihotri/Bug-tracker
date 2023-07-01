import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCgEpswpI7RC6PdMDFI8bWRTtF7Xd-OsjE",
  authDomain: "bugtrackingsystem-a3ba2.firebaseapp.com",
  databaseURL: "https://bugtrackingsystem-a3ba2-default-rtdb.firebaseio.com",
  projectId: "bugtrackingsystem-a3ba2",
  storageBucket: "bugtrackingsystem-a3ba2.appspot.com",
  messagingSenderId: "525483199073",
  appId: "1:525483199073:web:7b03761c3c0924037b7820",
  measurementId: "G-WTPT5HFZQ5"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
  additionalData: any
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        additionalData,
        createdAt,
        myTickets: [""],
        ...additionalData,
      });
    } catch (err) {
      if(err instanceof Error){
        console.log(err.message);
      }
      console.log("error creating user", err);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
