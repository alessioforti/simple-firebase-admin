// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4JP1p2Bm8lPyz-h5CFOCfFU94R7dIMIY",
  authDomain: "simple-firebase-admin.firebaseapp.com",
  projectId: "simple-firebase-admin",
  storageBucket: "simple-firebase-admin.appspot.com",
  messagingSenderId: "808303756377",
  appId: "1:808303756377:web:98b16072cf13ed083b5d48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { createApp } from 'vue'
import App from './App.vue'

import './assets/base.css'

createApp(App).mount('#app')
