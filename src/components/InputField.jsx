import React from 'react'
export default function InputField(props){
  return (
    <input 
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" 
      {...props} 
    />
  )
}