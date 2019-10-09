import firebase from 'firebase'
// eslint-disable-next-line
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyDI-KgHGmzbFdzCmtLxLK9yFFYgHxAt4pQ',
    authDomain: 'ninja-smoothies-ae7fe.firebaseapp.com',
    databaseURL: 'https://ninja-smoothies-ae7fe.firebaseio.com',
    projectId: 'ninja-smoothies-ae7fe',
    storageBucket: 'ninja-smoothies-ae7fe.appspot.com',
    messagingSenderId: '448441774976',
    appId: '1:448441774976:web:58c3eb0241a6a244ba0765'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()
