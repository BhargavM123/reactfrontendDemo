import React, { useState } from 'react';

const AudioToText = () => {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      console.log('Please select a file.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('audio', file);

      const response = await fetch('/api/audioToText', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the response contains transcription
        const transcription = data.transcription;
        setTranscription(transcription);
      } else {
        console.error('Failed to upload audio file.');
      }
    } catch (error) {
      console.error('Error uploading audio file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        {transcription && (
          <div>
            <h2>Transcription:</h2>
            <p>{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioToText
