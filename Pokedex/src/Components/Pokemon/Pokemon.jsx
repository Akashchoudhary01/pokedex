import React from 'react'

export default function Pokemon({ name, image }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 m-2 text-center w-48 hover:scale-105 transition-transform duration-300">
      <img 
        src={image} 
        alt={name} 
        className="w-32 h-32 mx-auto object-contain" 
      />
      <h2 className="text-xl font-bold capitalize mt-2">{name}</h2>
    </div>
  )
}
