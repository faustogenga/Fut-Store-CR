import React from 'react'
import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'
import { Products } from '../components/Products'
import { Banner } from '../components/Banner'
import { Footer } from '../components/Footer'

export const Home = (props) => {
    const {email} = props
    const loggedIn = false;

  return (
    <div className='mx-1'>
        <Navbar 
        loggedIn = {loggedIn}
        email = {email}/>
        <Main/>
        <Products/>
        <Banner/>
        <Footer/>
    </div>
  )
}
