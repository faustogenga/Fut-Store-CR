import React from 'react'
import '../CSS/Catalognavigation.css'
import SearchIcon from '@mui/icons-material/Search';
export const Catalognavigation = ({handleSearchInput}) => {
    return (
        <>
            <nav>
                <div className="responsiveSearchBar">
                    <SearchIcon />
                    <input
                        className="search-input m-2 p-2"
                        type="text"
                        onChange={handleSearchInput}
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