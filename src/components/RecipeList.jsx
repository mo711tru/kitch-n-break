import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import RecipeCard from './RecipeCard'

export default function RecipeList({items=[], onToggleFav, onEdit, onDelete, favorites=[], canManage}){
  const { t } = useLanguage();
  if(items.length===0) return <div className="text-center py-8 text-gray-500">{t('list.noResults')}</div>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => {
        const canManageItem = canManage ? canManage(item) : true;

        return (
          <RecipeCard 
            key={item.id} 
            item={item} 
            onToggleFav={onToggleFav} 
            onEdit={canManageItem ? onEdit : undefined} 
            onDelete={canManageItem ? onDelete : undefined} 
            isFavorite={favorites.includes(item.id)} 
          />
        );
      })}
    </div>
  )
}
