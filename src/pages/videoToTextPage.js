import React, { useState } from 'react';

const VideoToText = () =>{
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [model, setModel] = useState('BART');
    const [result, setResult] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/videoToText', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            youtube_url: youtubeUrl,
            model_name: model
          })
        });
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            YouTube Video Link:
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </label>
          <label>
            Model:
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="BART">BART</option>
              {/* Add other model options if needed */}
            </select>
          </label>
          <button type="submit">Predict</button>
        </form>
        {result && <div>Prediction Result: {result}</div>}
      </div>
    );
  }

export default VideoToText;
