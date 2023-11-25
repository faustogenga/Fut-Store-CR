import React from 'react'
import {Navbar} from '../components/Navbar'
import {BasicTable} from '../components/Table'
import { Footer } from '../components/Footer'

export const AdminVendor = ({user, loggedIn, logOut, isVendor}) => {
  return (
    <>
    <Navbar 
        loggedIn = {loggedIn}
        user = {user}
        logOut = {logOut}
        isVendor = {isVendor}
        />
    <BasicTable user={user}/>
    <Footer/>
    </>
  )
}
