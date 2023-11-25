import React from 'react'
import {Navbar} from './Navbar'
import {Products} from './Products'

export const Cart = ({user, loggedIn, logOut, isVendor}) => {
  return (
    <>
        <Navbar 
            loggedIn = {loggedIn}
            user = {user}
            logOut = {logOut}
            isVendor = {isVendor}
        />
       <button>PRUEBA</button>
        <Products/>
    </>
  )
}
