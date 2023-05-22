import React, { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className={`header ${isVisible ? 'fade-in' : ''}`}>
      <h1>Welcome to the Website</h1>
    </header>
  );
};

export default Header;
