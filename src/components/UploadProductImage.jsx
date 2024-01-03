import React from 'react';


export const UploadProductImage = ({handleFileChange, name}) => {

    return (
        <div>
            <input 
            style={{fontSize : "10px"}}
            class="form-control" type="file" onChange={handleFileChange} />
        </div>
    );
};