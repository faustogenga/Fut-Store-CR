import React from 'react'
import {Navbar} from '../components/Navbar'
import { Footer } from '../components/Footer'
import { MyCart } from '../components/MyCart'

export const Cart = ({user, loggedIn, logOut, isVendor}) => {
    return (
      <>
      <Navbar 
          loggedIn = {loggedIn}
          user = {user}
          logOut = {logOut}
          isVendor = {isVendor}
          />
      <MyCart/>
      <Footer/>
      </>
    )
  }
  