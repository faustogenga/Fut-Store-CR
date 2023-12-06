import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Cart } from '../components/Cart'

export const CartPage = ({ user, loggedIn, logOut, isVendor }) => {
  return (
    <>
      <Navbar
        loggedIn={loggedIn}
        user={user}
        logOut={logOut}
        isVendor={isVendor}
      />
      <Cart user={user} />
      <Footer />
    </>
  )
}
