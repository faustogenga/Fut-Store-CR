import React, { useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import '../CSS/Video.css'

export const Video = ({ isVendor }) => {

    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <>
            <div className='container-fluid d-flex bg-black overflow-hidden' style={{ marginBottom: "1px" }}>
                <div className='responsiveBrands col-1 mx-3 p-1' style={{ color: "white", fontFamily: "Oswald", fontWeight: "700" }}>FUTSTORE cr</div>
                <div className='responsiveBrandsNames col-9 mx-3 p-1 d-flex overflow-hidden'>
                    <div className='texto1 text-nowrap'>
                        NIKE - ADIDAS - PUMA - UNDER ARMOUR - NEW BALANCE - MIZUNO - UMBRO - DIADORA - LOTTO - KAPPA -
                        REEBOK - ASICS - JOMA - UHLSPORT - HUMMEL - ERREA - CANTERBURY - KELME - PENALTY - LECOQSPORTIF -
                        MOLTENI - WARRIOR - XARA - AVIA - PEAK - YONEX - MITRE - VOIT - GOLA - CUERVO - STANNO  -
                    </div>
                    <div className='texto2 text-nowrap'>
                        NIKE - ADIDAS - PUMA - UNDER ARMOUR - NEW BALANCE - MIZUNO - UMBRO - DIADORA - LOTTO - KAPPA -
                        REEBOK - ASICS - JOMA - UHLSPORT - HUMMEL - ERREA - CANTERBURY - KELME - PENALTY - LECOQSPORTIF -
                        MOLTENI - WARRIOR - XARA - AVIA - PEAK - YONEX - MITRE - VOIT - GOLA - CUERVO - STANNO  -
                    </div>
                </div>
                <div className='responsiveBrands col-1 mx-3 p-1' style={{ color: "white", fontFamily: "Oswald", fontWeight: "700" }}>FUTSTORE cr</div>
            </div>
            <div className='responsiveVideo container-fluid d-flex mb-0 bg-black' style={{ height: '800px', marginBottom: '0', position: 'relative' }}>
                <div className='responsiveVideo2 d-flex justify-content-center align-items-center p-4' style={{ height: '100%', width: "100%", position: 'relative', flex: '1' }}>
                    <ReactPlayer
                        width={"100%"}
                        height={"100%"}
                        playing={true}
                        loop={true}
                        muted={isMuted}
                        volume={isMuted ? 0 : 0.5}
                        url='https://www.youtube.com/watch?v=eGUor824a74&ab_channel=SportsOnScreen'
                    />
                    <button
                        onClick={toggleMute}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            zIndex: 10,
                            background: isMuted ? 'rgba(239, 68, 68, 0.8)' : 'rgba(37, 99, 235, 0.8)',
                            backdropFilter: 'blur(10px)',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '50%',
                            width: '42px',
                            height: '42px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '1.1rem',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = isMuted ? 'rgba(239, 68, 68, 1)' : 'rgba(37, 99, 235, 1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                            e.currentTarget.style.transform = 'scale(1.15)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = isMuted ? 'rgba(239, 68, 68, 0.8)' : 'rgba(37, 99, 235, 0.8)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                        }}
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        title={isMuted ? 'Click to unmute' : 'Click to mute'}
                    >
                        <i className={isMuted ? 'bi bi-volume-mute-fill' : 'bi bi-volume-up-fill'}></i>
                    </button>
                </div>
                <div className='responsivePics col-2 overflow-hidden d-none d-md-flex' style={{ 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '2rem 1rem',
                    height: '100%'
                }}>
                    <div className='responsivePics2' style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '100%',
                        gap: '1.5rem'
                    }}>
                        <img
                            className='responsivePics3 rounded'
                            alt="futbol"
                            style={{ 
                                width: "100%", 
                                height: "auto",
                                objectFit: "cover",
                                transform: 'rotate(0deg)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }}
                            src='https://i.pinimg.com/564x/6c/cd/60/6ccd60c6920ce2041ec084b312614fee.jpg' />
                        <img
                            className='responsivePics3 rounded'
                            alt="futbol"
                            style={{ 
                                width: "100%", 
                                height: "auto",
                                objectFit: "cover",
                                transform: 'rotate(0deg)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }}
                            src='https://i.pinimg.com/564x/07/76/da/0776daded68920d37af6e46d08e989ba.jpg' />
                        <img
                            className='responsivePics3 rounded'
                            alt="futbol"
                            style={{ 
                                width: "100%", 
                                height: "auto",
                                objectFit: "cover",
                                transform: 'rotate(0deg)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }}
                            src='https://i.pinimg.com/564x/68/00/90/680090c1960a48f53f8cbc9778db33e8.jpg' />
                        <img
                            className='responsivePics3 rounded'
                            alt="futbol"
                            style={{ 
                                width: "100%", 
                                height: "auto",
                                objectFit: "cover",
                                transform: 'rotate(0deg)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                            }}
                            src='https://i.pinimg.com/564x/77/2e/80/772e80a8b1683dfa0b59846253f09cf1.jpg' />
                    </div>
                </div>
            </div>
            
        </>
    )
}
