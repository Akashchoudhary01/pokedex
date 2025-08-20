import React from 'react'

import CustomRoute from './Routes/CustomRoute'
import Footer from './Components/Footer/Footer'


export default function App() {
  return (
    <div className="h-full bg-gradient-to-r from-black via-purple-500 to-pink-600 flex flex-col  justify-top ">
      <CustomRoute/>
      <Footer/>
     
      
       </div>
  )
}
