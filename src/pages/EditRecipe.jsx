import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRecipe, updateRecipe } from '../services/recipes'
import { useLanguage } from '../context/LanguageContext'

export default function EditRecipe(){
  const { t } = useLanguage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading,setLoading] = useState(true)
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')

  useEffect(()=>{
    let mounted = true
    getRecipe(id).then(r=>{ if(mounted && r){ setTitle(r.title||''); setDescription(r.description||'') } }).finally(()=>mounted && setLoading(false))
    return ()=> mounted = false
  },[id])

  async function save(e){
    e.preventDefault()
    setLoading(true)
    try{
      await updateRecipe(id, { title, description })
      navigate(`/recipe/${id}`)
    }catch(err){
      console.error(err)
      setLoading(false)
    }
  }

  if(loading) return <div className="loading">{t('edit.loading')}</div>

  return (
    <div className="container">
      <h1>{t('edit.heading')}</h1>
      <form onSubmit={save} style={{maxWidth:700}}>
        <div style={{marginBottom:8}}>
          <input className="input" placeholder={t('edit.titlePlaceholder')} value={title} onChange={e=>setTitle(e.target.value)} required />
        </div>
        <div style={{marginBottom:8}}>
          <textarea className="input" placeholder={t('edit.descriptionPlaceholder')} rows={6} value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <div>
          <button className="btn">{t('edit.save')}</button>
        </div>
      </form>
    </div>
  )
}
