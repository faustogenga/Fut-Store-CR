import React from 'react'
import { useNavigate } from "react-router-dom";

export const Banner = ({ isVendor }) => {

    const navigate = useNavigate();

    return (
        <div className='container-fluid mx-auto d-flex justify-content-center align-items-center mt-4' style={{ height: '500px', backgroundColor: '#e3e3e3' }}>
            <div className='responsiveBanner col-8 mx-auto bg-white text-center d-flex flex-column justify-content-center align-items-center' style={{ height: '70%' }}>
                <h3 className='m-4 px-3 py-1 bg-black' style={{ color: "white", fontFamily: "Oswald", fontWeight: "700", fontStyle:"italic"}}>Vende tus Articulos con Nosotros</h3>
                <div className='m-3'>
                    <blockquote className="blockquote">
                        <p className="mb-0">Tus productos en nuestra pagina a solo un click 👈</p>
                    </blockquote>
                    <div className='flex-column'>
                        <div className=''>
                            <img
                                style={{
                                    width: "10%",
                                    position: "relative",
                                    left: "60px",
                                    top: "10px",
                                    opacity:"0.8"
                                }}
                                alt="soccerball" 
                                src="https://media0.giphy.com/media/Lm5hxmmI6ucOQGfjKj/giphy.gif?cid=ecf05e47yzkw71pcxrsmp94cn2lc79qwbg257vfepgvrzx9r&ep=v1_stickers_search&rid=giphy.gif&ct=s" />
                        </div>
                        <div>
                            <button type="button" disabled={isVendor ? true : false} className="btn btn-info" onClick={() => (navigate('/NewVendor'))}>Inscribete</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
