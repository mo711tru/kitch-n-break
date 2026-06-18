import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'

const col = () => collection(db, 'recipes')

export async function fetchRecipes(){
  const q = query(col(), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createRecipe(data){
  const recipeOwner = data.owner || data.userId || null
  const recipe = {
    ...data,
    owner: recipeOwner,
    userId: recipeOwner,
    createdAt: serverTimestamp()
  }
  const docRef = await addDoc(col(), recipe)
  return {
    ...recipe,
    id: docRef.id,
    createdAt: new Date().toISOString()
  }
}

export async function getRecipe(id){
  const ref = doc(db, 'recipes', id)
  const snap = await getDoc(ref)
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function updateRecipe(id, data){
  const ref = doc(db, 'recipes', id)
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
}

export async function deleteRecipe(id){
  const ref = doc(db, 'recipes', id)
  await deleteDoc(ref)
}

export async function addReview(recipeId, review){
  const colRef = collection(db, 'recipes', recipeId, 'reviews')
  const docRef = await addDoc(colRef, { ...review, createdAt: serverTimestamp() })
  return docRef.id
}

export async function fetchReviews(recipeId){
  const colRef = collection(db, 'recipes', recipeId, 'reviews')
  const q = query(colRef, orderBy('createdAt','desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d=>({ id: d.id, ...d.data() }))
}
