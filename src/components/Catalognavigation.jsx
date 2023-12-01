import React from 'react'
import '../CSS/Catalognavigation.css'
import SearchIcon from '@mui/icons-material/Search';
export const Catalognavigation = ({ handleInputChange, query }) => {
    return (
        <>
        <nav>
            <div className="nav-container">
                <SearchIcon/>
                <input
                
                className="search-input"
                type="text"
                onChange={handleInputChange}
                value={query}
                placeholder="Buscar por nombre" 
                >
                </input>
            </div>
            <div>
                
            </div>
        </nav>
        
        </>
    )
}

export default Catalognavigation;