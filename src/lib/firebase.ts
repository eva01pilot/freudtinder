import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKLeXRa4pe_nLKmxdlWjYn9gJP0uAcNkw",
  authDomain: "freudtinder.firebaseapp.com",
  projectId: "freudtinder",
  storageBucket: "freudtinder.appspot.com",
  messagingSenderId: "436169603001",
  appId: "1:436169603001:web:c28d7717a4f6697e0c2868",
  measurementId: "G-YKZ3BJH4JF"
};




const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);