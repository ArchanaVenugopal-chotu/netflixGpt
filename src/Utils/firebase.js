import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfGcSarOTy0vQsmCm-NvTfDhXTSK8zhes",
  authDomain: "netfixgpt-4930f.firebaseapp.com",
  projectId: "netfixgpt-4930f",
  storageBucket: "netfixgpt-4930f.firebasestorage.app",
  messagingSenderId: "562630822937",
  appId: "1:562630822937:web:6a65cb247998792097ee88",
  measurementId: "G-HM46FWP5RP"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

export default app;

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDfGcSarOTy0vQsmCm-NvTfDhXTSK8zhes",
//   authDomain: "netfixgpt-4930f.firebaseapp.com",
//   projectId: "netfixgpt-4930f",
//   storageBucket: "netfixgpt-4930f.firebasestorage.app",
//   messagingSenderId: "562630822937",
//   appId: "1:562630822937:web:6a65cb247998792097ee88",
//   measurementId: "G-HM46FWP5RP"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

