import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyBouTmTXCi_qcs-9dflEuqi1jzOyRa7lcA",
    authDomain: "chatwithall-7ea43.firebaseapp.com",
    projectId: "chatwithall-7ea43",
    storageBucket: "chatwithall-7ea43.appspot.com",
    messagingSenderId: "709278753555",
    appId: "1:709278753555:web:c3251c8e4529a757eab0e6"
}).auth();