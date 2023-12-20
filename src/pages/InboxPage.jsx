import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Cart } from '../components/Cart'
import { Inbox } from '../components/Inbox'

export const InboxPage = ({ user, loggedIn, logOut, isVendor }) => {
  return (
    <>
      <Navbar
        loggedIn={loggedIn}
        user={user}
        logOut={logOut}
        isVendor={isVendor}
      />
      <Inbox user={user} isVendor={isVendor}/>
      <Footer />
    </>
  )
}
