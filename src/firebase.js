/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const configapp = firebase.initializeApp({
  apiKey: 'AIzaSyDT3H3GBgFF5C3GqQXw1abfKRB39kxadUM',
  authDomain: 'petmanager-8ced5.firebaseapp.com',
  databaseURL: 'https://petmanager-8ced5-default-rtdb.firebaseio.com',
  projectId: 'petmanager-8ced5',
  storageBucket: 'petmanager-8ced5.appspot.com',
  messagingSenderId: '313376347987',
  appId: '1:313376347987:web:444693c4b386a4b13373a6',
  measurementId: 'G-C35Y27RHM8'
});
// const fauth = configapp.auth();
// const fire = configapp.firestore();
const storage = firebase.storage();
export { configapp, storage };
