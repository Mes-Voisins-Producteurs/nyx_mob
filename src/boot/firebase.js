// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// Add the Firebase products that you want to use
import 'firebase/auth'

let firebaseui = require('firebaseui')

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
firebase.analytics()
let firebaseAuth = firebaseApp.auth()

// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(firebaseAuth)

export { firebaseAuth }
