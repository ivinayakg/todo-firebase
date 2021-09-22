import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseAPI";

// put your own data here
// const firebaseConfig = {
//   apiKey: "*******************************",
//   authDomain: "**********************",
//   projectId: "******************",
//   storageBucket: "**********************",
//   messagingSenderId: "**************",
//   appId: "*********************************",
// };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };
