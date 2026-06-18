import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function SearchBar({value,onChange,placeholder}){
  const { t } = useLanguage()

  return (
    <div className="search">
      <input className="input" value={value} onChange={e=>onChange?.(e.target.value)} placeholder={placeholder || t('search.placeholder')} />
    </div>
  )
}
