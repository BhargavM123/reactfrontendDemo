import React, { useState } from "react";

const TextToAudio = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [durationSeconds, setDurationSeconds] = useState(6.5);
  const [guidanceScale, setGuidanceScale] = useState(0);
  const [seed, setSeed] = useState(5);
  const [numWaveforms, setNumWaveforms] = useState(1);

  const handleTextToAudio = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input_text: inputText,
        negative_prompt: negativePrompt,
        duration_seconds: durationSeconds,
        guidance_scale: guidanceScale,
        seed: seed,
        num_waveforms: numWaveforms,
      }),
    };

    const response = await fetch("/api/textToAudio", requestOptions);
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);
    //   const data = await response.json();

    // Assuming the audio file URL is returned in the 'audio_url' field of the response
    //   setAudioUrl(data.audio_url);
  };
  const clearAudio = () => {
    setAudioUrl("");
  };

  return (
    <div>
      <div>
        <label>Input Text:</label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <label>Negative Prompt:</label>
        <input
          type="text"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
        />
      </div>
      <div>
        <label>Duration (seconds):</label>
        <input
          type="number"
          value={durationSeconds}
          onChange={(e) => setDurationSeconds(parseFloat(e.target.value))}
          max="10"
        />
      </div>
      <div>
        <label>Guidance Scale:</label>
        <input
          type="number"
          value={guidanceScale}
          onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Seed:</label>
        <input
          type="number"
          value={seed}
          onChange={(e) => setSeed(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Number of Waveforms:</label>
        <input
          type="number"
          value={numWaveforms}
          onChange={(e) => setNumWaveforms(parseFloat(e.target.value))}
        />
      </div>
      <button onClick={handleTextToAudio}>Convert This Text to Audio</button>
      <button onClick={clearAudio}>Clear Audio Output</button>

      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default TextToAudio;
