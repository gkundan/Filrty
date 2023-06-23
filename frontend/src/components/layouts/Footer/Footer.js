import React from 'react'
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
        <div className='left-footer'>
            <h1>Download Our App</h1>
            <p>We are Availbale on Play Store and App Store</p>
        </div>
        <div className='mid-footer'>
            <h1>Flirty</h1>
            <p>High Quality Is Our First Priority</p>
            <p>Copyright &copy; Flirty</p>
        </div>
        <div className='right-footer'>
            <h2>Follow Us</h2>
            <p>Twitter</p>
            <p>FaseBook</p>
            <p>InstaGram</p>
        </div>
        
    </footer>
  )
}

export default Footer