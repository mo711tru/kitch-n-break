import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import RecipeList from '../components/RecipeList'
import LoginInline from './LoginInLine' // Wir binden das Login-Formular direkt ein
import TestFirestoreButton from '../components/TestFirestoreButton'
import { fetchRecipes } from '../services/recipes'
import { RECIPES } from '../data/recipes'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useLanguage } from '../context/LanguageContext'

export default function Home(){
  const { t } = useLanguage()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    return () => unsub()
  }, [])

  useEffect(() => {
    let mounted = true
    fetchRecipes()
      .then(r => {
        if (!mounted) return
        const recipes = (r && r.length) ? r : RECIPES
        setItems(recipes || [])
        setLoading(false)
      })
      .catch(() => {
        if (!mounted) return
        setItems(RECIPES)
        setLoading(false)
      })
    return () => { mounted = false }
  }, [])

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        
        {/* Hero & Login Sektion kombiniert */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-12">
          <div className="lg:col-span-2 p-8 flex flex-col justify-center bg-gradient-to-br from-orange-50 to-transparent dark:from-gray-800/20">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white">
              {t('home.heroTitle')} <span className="text-orange-500">Kitch n Break</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-md">
              {t('home.heroSubtitle')}
            </p>
          </div>
          
          <div className="p-8 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800 flex items-center justify-center">
            {!user ? <LoginInline /> : (
              <div className="text-center">
                <p className="text-emerald-500 font-semibold">✓ {t('home.signedIn')}</p>
                <Link to="/recipes-hub" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">{t('home.goToHub')}</Link>
              </div>
            )}
          </div>
        </div>

        {/* Test Firestore Button (sichtbar für alle) */}
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 text-center">
            <TestFirestoreButton />
          </div>
        </div>

        {/* Rezept-Katalog */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('home.latestRecipes')}</h2>
            <div className="w-full sm:w-64">
              <SearchBar value={query} onChange={setQuery} />
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-12 text-gray-500">{t('home.loadingRecipes')}</div>
          ) : (
            <RecipeList items={items.filter(it => {
              const q = query.toLowerCase()
              return !q || (it.title||'').toLowerCase().includes(q) || (it.category||'').toLowerCase().includes(q)
            })} />
          )}
        </section>
      </div>
    </div>
  )
}
