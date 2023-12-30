import React, { useState } from 'react';
import { storage } from '../CRUD/firebase_conection';
import { ref, uploadBytes } from "firebase/storage";


export const UploadProductImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile != null) {
            const imgRef = ref(storage, `Products_Imgs/${selectedFile.name}`);
            uploadBytes(imgRef, selectedFile).then((UploadResult) => {
                alert("image uploaded")
            }).catch(error => {
                alert("error", error);
            });
        } else {
            console.warn('No file selected');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};