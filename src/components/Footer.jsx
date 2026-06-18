import React from 'react'
export default function Footer(){
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
        <div className="font-bold text-orange-500 text-base">Kitch n Break</div>
        <div>© {new Date().getFullYear()} — Alle Rechte vorbehalten</div>
      </div>
    </footer>
  )
}