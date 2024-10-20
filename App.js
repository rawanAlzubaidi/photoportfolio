import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './src/Navbar'; // Import the Navbar component
import './App.css'; // Make sure to import your main CSS file if you have one

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Add the Navbar component here */}
        {/* Your other components and routes */}
        <main>
          {/* Your main content goes here */}
        </main>
      </div>
    </Router>
  );
}

export default App;
