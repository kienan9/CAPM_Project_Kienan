import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [visits] = useState(() => {
    const savedVisits = localStorage.getItem('visits');
    return savedVisits ? parseInt(savedVisits, 10) + 1 : 1;
  });

  const [isSpinning, setIsSpinning] = useState(true); 
  const logoRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  useEffect(() => {
    localStorage.setItem('visits', visits);
  }, [visits]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const toggleSpin = () => {
    setIsSpinning((prev) => !prev);
  };

  function setRandomSpin() {
    if (!logoRef.current) return;

    const duration = (Math.random() * 2.5 + 0.5).toFixed(1);
    logoRef.current.style.animationDuration = `${duration}s`;

    const direction = Math.random() < 0.5 ? 'normal' : 'reverse';
    logoRef.current.style.animationDirection = direction;
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      setRandomSpin();
      const intervalId = setInterval(setRandomSpin, 3000);
      return () => clearInterval(intervalId);
    } else {
      if (logoRef.current) {
        logoRef.current.style.animation = 'none';
      }
    }
  }, []);
  useEffect(() => {
    if (!logoRef.current) return;

    if (isSpinning) {
      logoRef.current.style.animationPlayState = 'running';
    } else {
      logoRef.current.style.animationPlayState = 'paused';
    }
  }, [isSpinning]);

  return (
    <div className="App">
      <header className="App-header">
        <button className="theme-toggle" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>

        <button
          className="theme-toggle"
          onClick={toggleSpin}
          style={{ marginLeft: '10px', backgroundColor: '#28a745' }}
        >
          {isSpinning ? 'Pause Spin' : 'Resume Spin'}
        </button>

        <img src={logo} className="App-logo" alt="logo" ref={logoRef} />
        <p>EGL307 Project</p>
        <p>Number of visits: {visits}</p>
        <p>members: Kienan and JingBo</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Solved OpenSSL problem related to React.
        </a>
      </header>
    </div>
  );
}

export default App;