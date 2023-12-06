import React from 'react'
import { CataloginputPrice } from './CataloginputPrice';

export const Catalogprices = ({ handleClickPrice, priceClicked }) => {
    return (
        <>
            <div className="mx-2">
                <h2 className="sidebar-title mt-3">Price</h2>

                <label className="sidebar-label-container">
                    <input
                        checked={priceClicked === 'All'}
                        onChange={handleClickPrice}
                        type="radio"
                        name="All" />
                    <span className="checkmark"></span>All
                </label>

                <CataloginputPrice
                    priceClicked={priceClicked}
                    handleClickPrice={handleClickPrice}
                    title="$0 - 50"
                    name="0-50"
                />

                <CataloginputPrice
                    priceClicked={priceClicked}
                    handleClickPrice={handleClickPrice}
                    title="$50 - $100"
                    name="50-100"
                />

                <CataloginputPrice
                    priceClicked={priceClicked}
                    handleClickPrice={handleClickPrice}
                    title="$100 - $150"
                    name="100-150"
                />

                <CataloginputPrice
                    priceClicked={priceClicked}
                    handleClickPrice={handleClickPrice}
                    title="Over $150"
                    name="over150"
                />
            </div>


        </>
    )
}

export default Catalogprices;