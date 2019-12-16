import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA0dDn2SpUwxKiq0lOgcCIphDjy2Yar-C0",
    authDomain: "react-f3dff.firebaseapp.com",
    databaseURL: "https://react-f3dff.firebaseio.com",
    projectId: "react-f3dff",
    storageBucket: "react-f3dff.appspot.com",
    messagingSenderId: "35141142966",
    appId: "1:35141142966:web:3822b178fac7fbd129d917",
    measurementId: "G-RGGXBYP5XZ"
};

firebase.initializeApp(config);

export default firebase;