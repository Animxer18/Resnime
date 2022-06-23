import { initializeApp } from 'firebase/app';

//for using firestore
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCCgz6q31G2MprGxAEH1aigkkuQ0LIwthM",
  authDomain: "resnime-38604.firebaseapp.com",
  projectId: "resnime-38604",
  storageBucket: "resnime-38604.appspot.com",
  messagingSenderId: "864125115613",
  appId: "1:864125115613:web:eaf90a5d67bb36ce24cf34"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app,db} 