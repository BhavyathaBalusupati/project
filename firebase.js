// Import Firebase core
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Import Firestore
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDkLV43v0FzT31VHECdF23Qexwv92TrSrM",
  authDomain: "digital-issue-cart-management.firebaseapp.com",
  projectId: "digital-issue-cart-management",
  storageBucket: "digital-issue-cart-management.firebasestorage.app",
  messagingSenderId: "722491035005",
  appId: "1:722491035005:web:f264d91b49e5f2b4ca1014",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore
const db = getFirestore(app);

// ✅ EXPORT THIS (VERY IMPORTANT)
export { db };
