import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import Logo from '../assets/logo.png'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar(){
  const { lang, setLang, t } = useLanguage()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('theme')) || 'light')

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u => setUser(u))
    return () => unsub()
  },[])

  useEffect(()=>{
    if(typeof document !== 'undefined'){
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', theme)
    }
  },[theme])

  async function logout(){
    await signOut(auth)
    navigate('/')
  }

  return (
    <header className="w-full sticky top-0 z-50 bd-neon-glow" style={{background:'linear-gradient(90deg, rgba(15,23,36,0.9), rgba(11,17,28,0.85))', borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to={'/'} aria-label="Kitch n Break home" className="flex items-center gap-3">
            <img src={Logo} alt="Kitch n Break logo" className="h-9 w-auto object-contain drop-shadow-sm"/>
            <span className="hidden sm:inline-block font-extrabold tracking-tight text-white text-lg">Kitch N Break</span>
          </Link>
          {user && user.displayName && (
            <div className="hidden sm:block text-sm text-gray-500">
              {t('nav.greeting')}, <strong className="text-gray-900 dark:text-gray-100">{user.displayName.split(' ')[0]}</strong>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <label htmlFor="lang" className="sr-only">Language</label>
            <select
              id="lang"
              value={lang}
              onChange={(e)=> setLang(e.target.value)}
              className="rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-200"
            >
              <option value="de">DE</option>
              <option value="en">EN</option>
            </select>
          </div>
          {/* Sichtbare Links NUR wenn eingeloggt */}
          {user && (
            <>
              <Link to="/recipes-hub" className="text-gray-300 hover:text-bd-neon font-medium text-sm">{t('nav.recipesHub')}</Link>
              <Link to="/create" className="text-gray-300 hover:text-bd-accent font-medium text-sm">{t('nav.createRecipe')}</Link>
              <button onClick={logout} className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">{t('nav.logout')}</button>
            </>
          )}

          {/* Darkmode toggle rechts platziert */}
          <button 
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-500 hover:text-orange-500 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V2M12 22v-2M4.22 4.22L2.81 2.81M21.19 21.19l-1.41-1.41M4 12H2M22 12h-2M4.22 19.78l-1.41 1.41M21.19 2.81l-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
