import React from 'react'
import { useNavigate } from "react-router-dom";

export const Banner = ({ isVendor }) => {

    const navigate = useNavigate();

    return (
        <div className='container-fluid mx-auto d-flex justify-content-center align-items-center mt-5 px-3' style={{ minHeight: '420px' }}>
            <div className='responsiveBanner col-12 col-lg-10 banner-card text-center d-flex flex-column flex-md-row justify-content-between align-items-center px-4 py-5'>
                <div className='text-start'>
                    <div className="badge-soft mb-3">Programa para vendedores</div>
                    <h3 className='banner-heading fw-bold text-light'>Vende tus artículos con FutStore</h3>
                    <p className='cta-subtitle mt-2'>Recibe visibilidad, asesoría y herramientas de venta para conectar con jugadores y clubes en todo el país.</p>
                    <div className='d-flex flex-wrap gap-3 align-items-center mt-3'>
                        <button type="button" disabled={isVendor ? true : false} className="btn main-boton" onClick={() => (navigate('/NewVendor'))}>Inscribirme ahora</button>
                        <button type="button" className="cta-button" disabled={isVendor ? true : false} onClick={() => navigate('/AdminVendor')}>
                            {isVendor ? 'Gestionar catálogo' : 'Conoce beneficios'}
                        </button>
                    </div>
                </div>
                <div className='text-center mt-4 mt-md-0'>
                    <img
                        style={{
                            width: "190px",
                            filter: "drop-shadow(0 14px 25px rgba(0,0,0,0.35))"
                        }}
                        alt="soccerball"
                        src="https://media0.giphy.com/media/Lm5hxmmI6ucOQGfjKj/giphy.gif?cid=ecf05e47yzkw71pcxrsmp94cn2lc79qwbg257vfepgvrzx9r&ep=v1_stickers_search&rid=giphy.gif&ct=s" />
                    <p className='text-light-50 mt-3 mb-0 text-muted'>Logística simplificada • Pagos seguros • Marca destacada</p>
                </div>
            </div>
        </div>

    )
}
