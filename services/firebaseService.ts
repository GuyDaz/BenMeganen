import { Lead } from '../types';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuh2aFm3zfvq0BKGF1oXIiNwCBatjYgEo",
  authDomain: "ben-hameganen.firebaseapp.com",
  projectId: "ben-hameganen",
  storageBucket: "ben-hameganen.firebasestorage.app",
  messagingSenderId: "285832378102",
  appId: "1:285832378102:web:7cd651116017a830f4ded7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const submitLead = async (leadData: Omit<Lead, 'createdAt'>): Promise<boolean> => {
  try {
    console.log("Attempting to write to Firestore collection 'leads'...", leadData);
    
    // Use serverTimestamp() for accurate server-side timing
    await addDoc(collection(db, "leads"), {
      ...leadData,
      createdAt: serverTimestamp()
    });

    console.log("Successfully wrote lead to Firestore.");
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
};