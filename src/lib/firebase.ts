import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhT9ASheeeepH8f-Th6qZpgjjq37MwQz8",
  authDomain: "learnkana-ad1b2.firebaseapp.com",
  projectId: "learnkana-ad1b2",
  storageBucket: "learnkana-ad1b2.firebasestorage.app",
  messagingSenderId: "613830787349",
  appId: "1:613830787349:web:0ccbf7110b1170cbdfa91c",
  measurementId: "G-NMM6EMFYER"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
});

export { auth, googleProvider }; 