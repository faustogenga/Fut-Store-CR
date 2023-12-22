import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import '../CSS/Video.css'

export const Video = ({ isVendor }) => {

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position /90);
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            <div className='responsiveVideo container-fluid d-flex mb-1 bg-black' style={{ height: '650px' }}>
                <div className='responsiveVideo col-10 d-flex justify-content-center align-items-center p-4' style={{ height: '100%' }}>
                    <ReactPlayer
                        class="responsiveVideo"
                        width={"90%"}
                        height={"100%"}
                        playing={true}
                        loop={true}
                        volume={0}

                        url='https://www.youtube.com/watch?v=eGUor824a74&ab_channel=SportsOnScreen'
                    />
                </div>
                <div className='responsivePics col-2 overflow-hidden mt-3'>
                    <div className='responsivePics2'>
                        <img
                            className=' responsivePics3 rounded m-2'
                            alt="futbol"
                            width={"82%"}
                            style={{ transform: `rotate(${scrollPosition - 13}deg)` }}
                            src='https://i.pinimg.com/564x/6c/cd/60/6ccd60c6920ce2041ec084b312614fee.jpg' />
                        <img
                            className='responsivePics3 rounded m-2'
                            alt="futbol"
                            width={"82%"}
                            height={"25%"}
                            style={{ transform: `rotate(-${scrollPosition - 13}deg)` }}
                            src='https://i.pinimg.com/564x/07/76/da/0776daded68920d37af6e46d08e989ba.jpg' />
                        <img
                            className='responsivePics3 rounded m-2'
                            alt="futbol"
                            width={"82%"}
                            height={"25%"}
                            style={{ transform: `rotate(${scrollPosition - 13}deg)` }}
                            src='https://i.pinimg.com/564x/68/00/90/680090c1960a48f53f8cbc9778db33e8.jpg' />
                        <img
                            className='responsivePics3 rounded m-2'
                            alt="futbol"
                            width={"82%"}
                            height={"25%"}
                            style={{ transform: `rotate(-${scrollPosition - 13}deg)` }}
                            src='https://i.pinimg.com/564x/77/2e/80/772e80a8b1683dfa0b59846253f09cf1.jpg' />

                    </div>
                </div>
            </div>
            
        </>
    )
}
