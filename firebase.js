import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDhZ0zl6RzsJRAB9lchB9pV4If9axuwMJw",
    authDomain: "test-online-shop-dc95f.firebaseapp.com",
    projectId: "test-online-shop-dc95f",
    storageBucket: "test-online-shop-dc95f.firebasestorage.app",
    messagingSenderId: "856392396146",
    appId: "1:856392396146:web:2a729fea5e6bf1aa0bc1eb",
    measurementId: "G-01EV3PH0F2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);