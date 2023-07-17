import React, { useState } from 'react';
import './Header.css';
import {  FaCartPlus, FaSearch, FaUser } from 'react-icons/fa';


const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div id="menu-icon-shape" onClick={handleMenuClick}>
        <div id="menu-icon">
          <div id="top" className={isMenuOpen ? 'active' : ''}></div>
          <div id="middle" className={isMenuOpen ? 'active' : ''}></div>
          <div id="bottom" className={isMenuOpen ? 'active' : ''}></div>
        </div>
      </div>
      

      <div id="overlay-nav" className={isMenuOpen ? 'active' : ''}>
        <div className='nav-contant'>
          <h1>
            Flirty
          </h1>     
      <p>Unlock Your Flirty Siide.</p>
        </div>
        <div id="nav-content">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/product">Product</a></li>
            <li><a href="/contact">Contact</a></li>          
            <li><a href="/account"> <FaUser /></a></li>
            <li><a href="/Search"><FaSearch /></a></li>
            <li><a href="/cart"><FaCartPlus /></a></li>
          </ul>
          
        </div>
      </div>
      
      </>
   
  );
};

export default App;
