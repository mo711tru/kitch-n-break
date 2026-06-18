import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function RecipeCard({item, onToggleFav, onEdit, onDelete, isFavorite=false}){
  const { t } = useLanguage()
  const translatedCategory = item.category ? t(`category.${item.category}`) : ''
  const categoryLabel = translatedCategory.startsWith('category.') ? item.category : translatedCategory
  const placeholder = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=600&auto=format&fit=crop'
  
  return (
    <article className="rounded-xl overflow-hidden flex flex-col h-full transition-transform transform hover:-translate-y-1 bd-card">
      <div className="w-full h-44 bg-black/10 overflow-hidden">
        <img 
          src={item.image || placeholder} 
          alt={item.title} 
          className="w-full h-full object-cover filter contrast-95 saturate-105"
          onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src=placeholder}} 
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-semibold tracking-wide text-bd-accent uppercase">{categoryLabel}</span>
        <h3 className="text-lg font-bold text-white mt-1 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-300 mt-2 line-clamp-2 flex-grow">{item.description}</p>

        <div className="mt-4 pt-4 border-t border-gray-700 flex flex-wrap gap-2">
          <Link to={`/recipe/${item.id}`} className="px-3 py-1.5 text-xs font-medium bg-bd-neon text-white rounded-md hover:brightness-95 transition-colors">{t('card.view')}</Link>
          <button 
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${isFavorite ? 'bg-amber-500 text-white' : 'bg-gray-800 text-gray-200'}`} 
            onClick={()=>onToggleFav && onToggleFav(item)}
          >
            {isFavorite ? `★ ${t('card.favorite')}` : `☆ ${t('card.favorite')}`}
          </button>
          {onEdit && <button className="px-3 py-1.5 text-xs font-medium bg-gray-800 text-gray-200 rounded-md hover:bg-gray-700" onClick={()=>onEdit(item)}>{t('card.edit')}</button>}
          {onDelete && <button className="px-3 py-1.5 text-xs font-medium bg-red-600 text-white rounded-md hover:bg-red-700 ml-auto" onClick={()=>onDelete(item)}>{t('card.delete')}</button>}
        </div>
      </div>
    </article>
  )
}
