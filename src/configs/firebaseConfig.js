// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // src/firebaseConfig.js
// // import firebase from 'firebase/app';
// // import 'firebase/storage'; //
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCdHaaI6aHlD0fAdVT1f64EDuT4flPDHyI",
//     authDomain: "final-project-4deb4.firebaseapp.com",
//     projectId: "final-project-4deb4",
//     storageBucket: "final-project-4deb4.appspot.com",
//     messagingSenderId: "1065433814112",
//     appId: "1:1065433814112:web:e03e5000a272dc20e35f05",
//     measurementId: "G-9LRVT33ZHQ"
// };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// // const storages = firebase.storage();

// // export default { storages, firebase };
// // Initialize Firebase
// const firebase = initializeApp(firebaseConfig);

// // Export Firebase storage service
// const storage = firebase.storage();

// export { storage, firebase as default };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdHaaI6aHlD0fAdVT1f64EDuT4flPDHyI",
  authDomain: "final-project-4deb4.firebaseapp.com",
  projectId: "final-project-4deb4",
  storageBucket: "final-project-4deb4.appspot.com",
  messagingSenderId: "1065433814112",
  appId: "1:1065433814112:web:e03e5000a272dc20e35f05",
  measurementId: "G-9LRVT33ZHQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app)