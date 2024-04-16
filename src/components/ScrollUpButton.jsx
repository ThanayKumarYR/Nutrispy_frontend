// ScrollUpButton.js

import React, { useState, useEffect } from 'react';
import './css/ScrollUpButton.css'; // Import your CSS file for styling

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-up-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      ^
    </button>
  );
};

export default ScrollUpButton;
