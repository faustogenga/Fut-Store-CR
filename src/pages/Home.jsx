import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'
import { Products } from '../components/Products'
import { Banner } from '../components/Banner'
import { Footer } from '../components/Footer'

export const Home = ({user, loggedIn, logOut, isVendor}) => {


  return (
    <div>
        <Navbar 
        loggedIn = {loggedIn}
        user = {user}
        logOut = {logOut}
        isVendor = {isVendor}
        />
        <Main/>
        <Products/>
        <Banner/>
        <Footer/>
    </div>
  )
}
