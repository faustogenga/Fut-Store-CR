import { Navbar } from '../components/Navbar'
import { Main } from '../components/Main'
import { Products } from '../components/Products'
import { Banner } from '../components/Banner'
import { Footer } from '../components/Footer'
import { useEffect } from 'react'

export const Home = ({user, loggedIn, logOut, isVendor, isCatalog, setIsCatalog}) => {
  
  useEffect(() => {  setIsCatalog(false); }, []);

  return (
    <div style={{ position: 'relative' }} >
        <Navbar 
        loggedIn = {loggedIn}
        user = {user}
        logOut = {logOut}
        isVendor = {isVendor}
        />
        <Main/>
        <Products isCatalog = {isCatalog} isVendor = {isVendor} loggedIn={loggedIn}  user={user}/>
        <Banner isVendor = {isVendor}/>
        <Footer/>
    </div>
  )
}
