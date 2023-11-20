import React, { useEffect, useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'
import { Products } from '../components/Products'
import { Banner } from '../components/Banner'
import { Footer } from '../components/Footer'
import { auth } from '../CRUD/firebase_conection'
import { onAuthStateChanged } from 'firebase/auth'

export const Home = ({user, loggedIn, logOut}) => {


  return (
    <div className='mx-1'>
        <Navbar 
        loggedIn = {loggedIn}
        user = {user}
        logOut = {logOut}/>
        <Main/>
        <Products/>
        <Banner/>
        <Footer/>
    </div>
  )
}
