import React from 'react'
import { Footer } from '../components/Footer'
import { Reviews } from '../components/Reviews'
import { Navbar } from '../components/Navbar'

export const ReviewsPage = ({  user, loggedIn, logOut, isVendor, selectedProduct, setSelectedProduct }) => {
  return (
    <>
        <Reviews user={user} 
        selectedProduct={selectedProduct} 
        />
    </>
  )
}
