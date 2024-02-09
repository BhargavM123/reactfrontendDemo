import React, { useState } from 'react'

const TextToImage = () => {
    const [inputText, setInputText] = useState('');
    const [imageSrc, setImageSrc] = useState('');
  
    const handleInputChange = (event) => {
      setInputText(event.target.value);
    };
  
    const handleQuery = async () => {
      try {
        const payload = { inputs: inputText };
        const response = await fetch('/api/textToImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
          mode: 'cors'
        });
        const blob = await response.blob();
        setImageSrc(URL.createObjectURL(blob)); // Convert blob to a URL
      } catch (error) {
        console.error('Error querying the model:', error);
      }
    };
  
    return (
      <div className="App">
        <h1>Hugging Face Model Query</h1>
        <div>
          <textarea
            placeholder="Enter text to query the model"
            rows="4"
            cols="50"
            value={inputText}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <button onClick={handleQuery}>Query Model</button>
        </div>
        <div>
          <h2>Response:</h2>
          {imageSrc && <img src={imageSrc} alt="Response Image" />}
        </div>
      </div>
    );
}

export default TextToImage