// TextToAudio.js

import React, { useState } from 'react';

const TextToAudio = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState(0); // 0 for male, 1 for female
  const [audioSrc, setAudioSrc] = useState(null);

  const handleSubmit = async () => {
    setAudioSrc(null);
    try {
      const response = await fetch('/api/textToAudio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          voice: voice
        })
      });

      // Handle response
      if (response.ok) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        setAudioSrc(audioUrl);
      } else {
        console.error('Failed to generate audio');
      }
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Text to Audio Converter</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
      />
      <div>
        <label>
          <input
            type="radio"
            value={0}
            checked={voice === 0}
            onChange={() => setVoice(0)}
          />
          Male Voice
        </label>
        <label>
          <input
            type="radio"
            value={1}
            checked={voice === 1}
            onChange={() => setVoice(1)}
          />
          Female Voice
        </label>
      </div>
      <button onClick={handleSubmit}>Convert to Audio</button>
      {audioSrc && (
        <audio controls>
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default TextToAudio;
