import React from 'react'
export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled }) {
  const baseStyle = "px-4 py-2 rounded-md font-semibold transition-all duration-200 disabled:opacity-50"
  const variants = {
    primary: "bg-bd-neon text-white hover:brightness-95 bd-neon-glow",
    secondary: "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  }
  return (
    <button type={type} className={`${baseStyle} ${variants[variant]}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}