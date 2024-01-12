// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { env } from "process";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQAu91jDJUIc0_ewrLAuHTBq9AQ1eNMH0",
  authDomain: "coursexxx-c4f70.firebaseapp.com",
  projectId: "coursexxx-c4f70",
  storageBucket: "coursexxx-c4f70.appspot.com",
  messagingSenderId: "283056874113",
  appId: "1:283056874113:web:7152040c50dd8f50a02380",
  measurementId: "G-L23V0WG2FF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
    return getToken(messaging, {vapidKey: process.env.FIREBASE_VAPID_KEY})
            .then((currentToken) => {
                if (currentToken) {
                    console.log('current token: ', currentToken);
                }
                else {
                    console.log('no token available: ');
                    
                }
            })
            .catch((err : any) => {
                console.log('Error while retrieving token', err); 
            })
}