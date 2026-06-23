// Firebase initialization
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// 🔑 Deine Config (aus Firebase Console)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA8sp84GfVpR1vm8wqvIaFs5rcHsch2gJA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kitch-n-break.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kitch-n-break",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kitch-n-break.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "256041595721",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:256041595721:web:7321fc698ca8cb8712e098",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PFDB6J27DE"
}

// 🚀 Firebase App starten
const app = initializeApp(firebaseConfig)

// 📊 Analytics (nur im Browser)
let analytics
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app)
  } catch (e) {
    console.warn('Firebase analytics nicht gestartet', e)
  }
}

// 🔐 Auth (Login/Register)
const auth = getAuth(app)

// 🗄️ Firestore Datenbank
const db = getFirestore(app)

// 📦 Storage (Dateien, Bilder)
const storage = getStorage(app)

// 📤 Export damit du es überall nutzen kannst
export { app, analytics, auth, db, storage }