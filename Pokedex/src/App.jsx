import React from 'react'
import CustomRoute from './Routes/CustomRoute'
import Footer from './Components/Footer/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-black via-purple-500 to-pink-600">
      {/* Main content grows to fill space */}
      <div className="flex-grow">
        <CustomRoute />
      </div>
      
      {/* Footer always stays at the bottom */}
      <Footer />
    </div>
  )
}
