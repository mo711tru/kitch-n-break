import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { RECIPES } from '../data/recipes'
import { getRecipe, fetchReviews, addReview } from '../services/recipes'
import { auth } from '../firebase'
import { useLanguage } from '../context/LanguageContext'

export default function RecipeDetails(){
  const { t } = useLanguage()
  const { id } = useParams()
  const local = RECIPES.find(x=>x.id===id)
  const [recipe, setRecipe] = useState(local || null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    let mounted = true
    const load = async ()=>{
      setLoading(true)
      try{
        const remote = await getRecipe(id)
        if(mounted && remote) setRecipe(remote)
        const revs = await fetchReviews(id)
        if(mounted) setReviews(revs)
      }catch(e){
        console.warn('Could not load recipe or reviews', e)
      }finally{ if(mounted) setLoading(false) }
    }
    load()
    return ()=>{ mounted = false }
  },[id])

  function avgRating(){
    if(!reviews || reviews.length===0) return null
    const sum = reviews.reduce((s,r)=>s+(r.rating||0),0)
    return (sum / reviews.length).toFixed(1)
  }

  async function submitReview(e){
    e.preventDefault()
    const user = auth.currentUser
    if(!user){ alert(t('details.loginForReview')); return }
    const payload = { userId: user.uid, displayName: user.displayName || '', rating: Number(rating), text }
    await addReview(id, payload)
    const revs = await fetchReviews(id)
    setReviews(revs)
    setRating(5); setText('')
  }

  if(!recipe) return <div className="container">{t('details.notFound')} - <Link to="/">{t('details.back')}</Link></div>
  return (
    <div className="container">
      <h1>{recipe.title}</h1>
      {recipe.image && <img src={recipe.image} alt={recipe.title} style={{maxWidth:600,width:'100%',borderRadius:8}} />}
      <p>{recipe.description}</p>
      {recipe.ingredients && (
        <>
          <h3>{t('details.ingredients')}</h3>
          <ul>{recipe.ingredients.map(i=> <li key={i}>{i}</li>)}</ul>
        </>
      )}
      {recipe.steps && (
        <>
          <h3>{t('details.preparation')}</h3>
          <ol>{recipe.steps.map((s,idx)=> <li key={idx}>{s}</li>)}</ol>
        </>
      )}

      <section style={{marginTop:20}}>
        <h3>{t('details.reviews')} {avgRating() ? ` - ${avgRating()} ★` : ''}</h3>
        <form onSubmit={submitReview} style={{marginBottom:12}}>
          <label>{t('details.rating')}</label>
          <select value={rating} onChange={e=>setRating(e.target.value)} style={{marginLeft:8}}>
            {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n} ★</option>)}
          </select>
          <div style={{marginTop:8}}>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder={t('details.reviewPlaceholder')} style={{width:'100%',minHeight:80}} />
          </div>
          <div style={{marginTop:8}}>
            <button className="btn" type="submit">{t('details.submitReview')}</button>
          </div>
        </form>

        <div>
          {loading && <div className="loading">{t('details.loadingReviews')}</div>}
          {!loading && reviews.length===0 && <div>{t('details.noReviews')}</div>}
          {reviews.map(r=> (
            <div key={r.id} style={{borderTop:'1px solid rgba(0,0,0,0.04)',padding:'8px 0'}}>
              <strong>{r.displayName || t('details.anonymous')}</strong> - {r.rating} ★
              <div style={{color:'var(--muted-text)'}}>{r.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
