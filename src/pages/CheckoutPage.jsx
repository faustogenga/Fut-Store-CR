import React from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Checkout } from '../components/Checkout'

export const CheckoutPage = ({ user, loggedIn, logOut, isVendor }) => {

    return (
        <>
            <Navbar
                loggedIn={loggedIn}
                user={user}
                logOut={logOut}
                isVendor={isVendor}
            />
            <Checkout user={user}/>
            <Footer />
        </>
    )
}
