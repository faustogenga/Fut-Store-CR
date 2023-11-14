import React from 'react'
import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'
import { Products } from '../components/Products'
import { Banner } from '../components/Banner'
import { Footer } from '../components/Footer'
import { useNavigate } from 'react-router'

export const Home = (props) => {
    const {email} = props
    const loggedIn = false;
    const navigate = useNavigate();

  return (
    <div>
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
