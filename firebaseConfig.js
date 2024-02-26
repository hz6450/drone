// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDucswjZQslL4RQMvexUTisDDXBa_0yxO0",
  authDomain: "drone-7e7af.firebaseapp.com",
  projectId: "drone-7e7af",
  storageBucket: "drone-7e7af.appspot.com",
  messagingSenderId: "466100149077",
  appId: "1:466100149077:web:80bcea68f44a0a0893eddc",
  measurementId: "G-GKMGM89TJ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);