import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

export default function TestFirestoreButton() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function handleClick() {
    setLoading(true)
    setMsg('')
    try {
      await addDoc(collection(db, 'test'), {
        name: 'Max',
        datum: new Date().toString()
      })
      setMsg('Gespeichert!')
    } catch (e) {
      console.error(e)
      setMsg('Fehler: ' + (e.message || e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleClick} disabled={loading} className="btn">
        {loading ? 'Speichern...' : 'Firestore testen'}
      </button>
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </div>
  )
}
