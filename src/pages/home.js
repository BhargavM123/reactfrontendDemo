import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <h1>Welcome to the Home Page</h1>
    <ul>
      <li><Link to="/imageToText">Image to Text</Link></li>
      <li><Link to="/textToImage">Text to Image</Link></li>
      <li><Link to="/audioToText">Audio to Text</Link></li>
      <li><Link to="/textToAudio">Text to Audio</Link></li>
      <li><Link to="/videoToText">Video to Text</Link></li>
    </ul>
  </div>
  )
}

export default Home