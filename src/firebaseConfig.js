// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCv3TcVp1LiLA8f1yftgo-48eapEcXVaBs",
//   authDomain: "explainable-ai-in-healthcare.firebaseapp.com",
//   projectId: "explainable-ai-in-healthcare",
//   storageBucket: "explainable-ai-in-healthcare.firebasestorage.app",
//   messagingSenderId: "590220260526",
//   appId: "1:590220260526:web:089b85af003e1eea3f293f",
//   measurementId: "G-CC5YJ0QCD7",
// };


// const app = initializeApp(firebaseConfig);

// export { app };


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCv3TcVp1LiLA8f1yftgo-48eapEcXVaBs",
  authDomain: "explainable-ai-in-healthcare.firebaseapp.com",
  projectId: "explainable-ai-in-healthcare",
  storageBucket: "explainable-ai-in-healthcare.firebasestorage.app",
  messagingSenderId: "590220260526",
  appId: "1:590220260526:web:089b85af003e1eea3f293f",
  measurementId: "G-CC5YJ0QCD7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORT THESE
export const db = getFirestore(app);
export const auth = getAuth(app);
export { app };