import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';
import { firebaseConfig } from '@/lib/loadEnvVars';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();
const functions = firebase.functions();
const storage = firebase.storage();

export {
    auth,
    googleAuthProvider,
    db,
    functions,
    storage
}