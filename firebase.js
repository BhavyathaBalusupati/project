import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDkLV43v0FzT31VHECdF23Qexwv92TrSrM",
    authDomain: "digital-issue-cart-management.firebaseapp.com",
    projectId: "digital-issue-cart-management",
    storageBucket: "digital-issue-cart-management.appspot.com",
    messagingSenderId: "722491035005",
    appId: "1:722491035005:web:f264d91b49e5f2b4ca1014"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
