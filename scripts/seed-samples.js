import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import fs from 'fs'

// This script seeds RECIPES into Firestore using web SDK. It requires that
// you set environment variables for the firebase config or edit the config below.
// It's intended for local use only, and you must have enabled Firestore and
// set up your project config in the src/firebase.js file.

const { FIREBASE_APIKEY, FIREBASE_AUTHDOMAIN, FIREBASE_PROJECTID, FIREBASE_STORAGEBUCKET, FIREBASE_MESSAGINGSENDERID, FIREBASE_APPID } = process.env

const config = {
  apiKey: FIREBASE_APIKEY || 'AIzaSyA8sp84GfVpR1vm8wqvIaFs5rcHsch2gJA',
  authDomain: FIREBASE_AUTHDOMAIN || 'kitch-n-break.firebaseapp.com',
  projectId: FIREBASE_PROJECTID || 'kitch-n-break',
  storageBucket: FIREBASE_STORAGEBUCKET || 'kitch-n-break.firebasestorage.app',
  messagingSenderId: FIREBASE_MESSAGINGSENDERID || '256041595721',
  appId: FIREBASE_APPID || '1:256041595721:web:7321fc698ca8cb8712e098'
}

const app = initializeApp(config)
const db = getFirestore(app)

async function main(){
  // Import the recipes module directly (safer than eval/parsing)
  let arr = []
  try{
    const mod = await import('../src/data/recipes.js')
    arr = mod.RECIPES || mod.default || []
  }catch(err){
    console.error('Could not import recipes module:', err.message)
    process.exit(1)
  }

  if(!Array.isArray(arr) || arr.length === 0){
    console.error('RECIPES is empty or not an array')
    process.exit(1)
  }

  for(const r of arr){
    try{
      await addDoc(collection(db,'recipes'), r)
      console.log('seeded', r.title)
    }catch(e){
      console.error('failed', r.title, e.message)
    }
  }
  process.exit(0)
}

main().catch(e=>{ console.error(e); process.exit(1) })
