// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase'
import 'firebase/app'
import 'firebase/auth'

import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics

// Add the Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDEOIhIsEoPoqPtcaPa8R3ZCIVSaccos9w',
  authDomain: 'nyx-mob.firebaseapp.com',
  projectId: 'nyx-mob',
  storageBucket: 'nyx-mob.appspot.com',
  messagingSenderId: '598264318577',
  appId: '1:598264318577:web:a0b826e847f4d05b0729d0',
  measurementId: 'G-VWJZJXGFM4'
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
//firebaseAuth.useEmulator('http://localhost:9099')

// Initialize the FirebaseUI Widget using Firebase.
//let ui = new firebaseui.auth.AuthUI(firebaseAuth)
/*
firebaseApp
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(userCredential => {
    // Signed in
    let user = userCredential.user
    // ...
  })
  .catch(error => {
    let errorCode = error.code
    let errorMessage = error.message
    // ..
  })

firebaseApp
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(userCredential => {
    // Signed in
    let user = userCredential.user
    // ...
  })
  .catch(error => {
    let errorCode = error.code
    let errorMessage = error.message
  })

firebaseApp
  .auth()
  .signOut()
  .then(() => {
    // Sign-out successful.
  })
  .catch(error => {
    // An error happened.
  })
*/

export { firebaseAuth }
