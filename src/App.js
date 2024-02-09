import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageToText from './pages/imageToTextPage';
import TextToImage from './pages/textToImagePage';
import VideoToText from './pages/videoToTextPage';
import AudioToText from './pages/audioToTextPage';
import TextToAudio from './pages/textToAudioPage';
import Home from './pages/home';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route exact path="/imageToText" element={<ImageToText/>} />
          <Route exact path="/textToImage" element={<TextToImage/>} />
          <Route exact path="/audioToText" element={<AudioToText/>} />
          <Route exact path="/textToAudio" element={<TextToAudio/>} />
          <Route exact path="/videoToText" element={<VideoToText/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;


