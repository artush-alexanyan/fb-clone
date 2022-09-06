import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyBcWe90ZlZoP_NBKuQoVARpPCQm05Ome-A",
    authDomain: "fb-clone-fb914.firebaseapp.com",
    projectId: "fb-clone-fb914",
    storageBucket: "fb-clone-fb914.appspot.com",
    messagingSenderId: "841572101116",
    appId: "1:841572101116:web:791c04d0007284bfc26079"
};


firebase.initializeApp(config);

export const db = firebase.firestore()
export const Authentication = firebase.auth()


export default firebase

