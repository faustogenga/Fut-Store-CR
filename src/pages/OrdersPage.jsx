import React from 'react'
import {Navbar} from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Orders } from '../components/Orders'

export const OrdersPage = ({user, loggedIn, logOut, isVendor}) => {
    return (
      <>
      <Navbar 
          loggedIn = {loggedIn}
          user = {user}
          logOut = {logOut}
          isVendor = {isVendor}
          />
      <Orders  user={user} />
      <Footer/>
      </>
    )
  }