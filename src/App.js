import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {

  // Initialize state with value from localStorage
  const [visits] = useState(() => {
    const savedVisits = localStorage.getItem('visits');
    return savedVisits ? parseInt(savedVisits, 10) + 1 : 1;
  });

  // Update localStorage whenever visits state changes
  useEffect(() => {
    localStorage.setItem('visits', visits);
  }, [visits]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
