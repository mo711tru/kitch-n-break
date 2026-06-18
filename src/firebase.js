// Firebase initialization
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA8sp84GfVpR1vm8wqvIaFs5rcHsch2gJA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kitch-n-break.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kitch-n-break",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kitch-n-break.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "256041595721",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:256041595721:web:7321fc698ca8cb8712e098",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PFDB6J27DE"
}

const app = initializeApp(firebaseConfig)

let analytics
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app)
  } catch (e) {
    // analytics may fail in certain dev environments; ignore
    console.warn('Firebase analytics not initialized', e)
  }
}

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, analytics, auth, db, storage }
