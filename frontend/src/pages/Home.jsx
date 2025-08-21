
import { useState } from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Flavors from '../components/Flavors'
import Features from '../components/Features'


export default function Home() {


  return (
    <div>
      <NavBar/>
      <Hero/>
      <Flavors/>
      <Features/>
      <Footer/>
    </div>
   
  )


}
