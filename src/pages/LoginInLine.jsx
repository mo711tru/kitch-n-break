import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { setUserDoc } from '../services/users'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useLanguage } from '../context/LanguageContext'

export default function LoginInline() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    setError('')
    setResetMessage('')
    try {
      if (isRegister) {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        if (name) { await updateProfile(cred.user, { displayName: name }) }
        await setUserDoc(cred.user.uid, { displayName: name || '', email })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/recipes-hub')
    } catch (err) {
      setError(err.message)
    }
  }

  async function resetPassword() {
    setError('')
    setResetMessage('')
    if (!email) {
      setError(t('auth.enterEmail') || 'Bitte E-Mail angeben')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email)
      setResetMessage(t('auth.resetSent') || 'Passwort‑Reset E‑Mail gesendet. Bitte prüfe dein Postfach.')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{isRegister ? t('auth.registerTitle') : t('auth.loginTitle')}</h3>
      <form onSubmit={submit} className="space-y-3">
        {isRegister && (
          <InputField placeholder={t('auth.namePlaceholder')} value={name} onChange={e => setName(e.target.value)} required />
        )}
        <InputField placeholder={t('auth.emailPlaceholder')} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <InputField placeholder={t('auth.passwordPlaceholder')} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="text-xs text-red-500 font-medium">{error}</div>}
        {resetMessage && <div className="text-xs text-emerald-600 font-medium">{resetMessage}</div>}
        <div className="flex flex-col gap-2 pt-2">
          <Button type="submit">{isRegister ? t('auth.registerButton') : t('auth.loginButton')}</Button>
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-xs text-gray-500 hover:text-orange-500">
              {isRegister ? t('auth.switchToLogin') : t('auth.switchToRegister')}
            </button>
            {!isRegister && (
              <button
                type="button"
                onClick={resetPassword}
                aria-label={'Passwort vergessen'}
                className="text-xs text-gray-500 hover:text-orange-500"
              >
                {'Passwort vergessen'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
