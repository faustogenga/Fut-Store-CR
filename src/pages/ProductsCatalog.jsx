import React from 'react'
//import SearchIcon from '@mui/icons-material/Search';
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Catalogsidebar } from '../components/Catalogsidebar'
import { Catalognavigation } from '../components/Catalognavigation';
import { Catalogrecommended } from '../components/Catalogrecommended';
import { Catalog } from '../components/Catalog';

export const ProductsCatalog = (user, loggedIn, logOut) => {
    return (
        <>
        <Navbar 
        loggedIn = {loggedIn}
        user = {user}
        logOut = {logOut}
        /> 

        <div style={{ display: 'flex' }}>
            <div style={{ flex: '0 0 280px' }}>
                <Catalogsidebar />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
            {/* Catalognavigation and Catalogrecommended horizontally */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Catalognavigation />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Catalogrecommended />
            </div>
        {/* <SearchIcon></SearchIcon> */}
            <Catalog />
        </div>
        </div>
        <Footer/>
        
        </>
    )
}
