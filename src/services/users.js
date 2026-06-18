import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

export async function setUserDoc(uid, data){
  const ref = doc(db, 'users', uid)
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

export async function getUserDoc(uid){
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function toggleFavorite(uid, recipeId){
  const ref = doc(db, 'users', uid)
  const snap = await getDoc(ref)
  let favs = []
  if(snap.exists()) favs = snap.data().favorites || []
  const exists = favs.includes(recipeId)
  const newFavs = exists ? favs.filter(id=>id!==recipeId) : [...favs, recipeId]
  await setDoc(ref, { favorites: newFavs, updatedAt: serverTimestamp() }, { merge: true })
  return !exists
}

export async function getFavorites(uid){
  const user = await getUserDoc(uid)
  return (user && user.favorites) ? user.favorites : []
}
