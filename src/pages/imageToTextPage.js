// ImageToTextComponent.js

import React, { useState } from 'react';

function ImageToText() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [outputText, setOutputText] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            if (!selectedFile) {
                setError('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('image', selectedFile);

            const response = await fetch('/api/imageToText', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Failed to upload image: ${response.status}`);
            }

            const data = await response.json();
            const outputText = data[0].generated_text;
            // console.log(outputText);
            setOutputText(outputText);
        } catch (error) {
            setError(`Error uploading image: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Image to Text</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {error && <div>{error}</div>}
            <div>
                <h2>Output Text:</h2>
                <p>{outputText}</p>
            </div>
        </div>
    );
}

export default ImageToText;
