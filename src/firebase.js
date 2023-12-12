import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDgcnVfkmdq3YPcEL0GpbN1RaaH_vWGtro",
  authDomain: "linkedin-portfolio-78c73.firebaseapp.com",
  databaseURL: "https://linkedin-portfolio-78c73-default-rtdb.firebaseio.com",
  projectId: "linkedin-portfolio-78c73",
  storageBucket: "linkedin-portfolio-78c73.appspot.com",
  messagingSenderId: "583470706188",
  appId: "1:583470706188:web:ea3ea9813482a36f78c829",
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// init firestore services
const db = getFirestore(app);
const auth = getAuth();

// collection firestore ref
const colRef = collection(db, "posts");

// get collection data
getDocs(colRef).then((snapshot) => {
  let posts = [];

  snapshot.docs.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
  });

  console.log(posts);
});

export {
  db,
  colRef,
  deleteDoc,
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  auth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
};
