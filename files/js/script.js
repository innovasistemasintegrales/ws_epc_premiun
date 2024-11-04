/* DB */
const firebaseConfig = {
    apiKey: "AIzaSyDdT-be-qONznIx2vQ1mfOQbM3wiU8hANo",
    authDomain: "ws-epc-premiun.firebaseapp.com",
    projectId: "ws-epc-premiun",
    storageBucket: "ws-epc-premiun.firebasestorage.app",
    messagingSenderId: "239112323567",
    appId: "1:239112323567:web:85576bd8ce0ca53dd3f61a"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();