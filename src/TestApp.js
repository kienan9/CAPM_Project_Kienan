import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function TestApp() {

  // Separate visit counter for test mode
  const [visits] = useState(() => {
    const savedVisits = localStorage.getItem('test_visits');
    return savedVisits ? parseInt(savedVisits, 10) + 1 : 1;
  });

  useEffect(() => {
    localStorage.setItem('test_visits', visits);
  }, [visits]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>This is the TEST server</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Test server visit count: {visits}</p>
        <p>members: Kienan and JingBo</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default TestApp;
