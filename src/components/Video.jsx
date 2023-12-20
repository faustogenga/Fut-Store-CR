import React from 'react'
import ReactPlayer from 'react-player/youtube'

export const Video = ({ isVendor }) => {

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center mt-1 mb-1 bg-black' style={{ height: '600px' }}>
            <div className='col-10 bg-white d-flex justify-content-center' style={{ height: '90%' }}>
                <ReactPlayer 
                width={"75%"} 
                height={"99%"} 
                playing="true"
                loop="true"
                volume={0}

                url='https://www.youtube.com/watch?v=eGUor824a74&ab_channel=SportsOnScreen' 
                />
            </div>
            <div className='col-2'>Hola</div>
        </div>
    )
}
