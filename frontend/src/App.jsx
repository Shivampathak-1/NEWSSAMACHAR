import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debouncing search input to prevent unnecessary re-renders
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500); // Debounce time is 500ms
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <div>
      <Router>
        <Navbar setSearchQuery={setSearchQuery} /> {/* Pass setSearchQuery to Navbar */}
        <LoadingBar height={1.5} color="#f11946" progress={progress} />
        <Routes>
          <Route
            path="/"
            element={<News setProgress={setProgress} key="general" category="general" searchQuery={debouncedSearch} />}
          />
          <Route
            path="/business"
            element={<News setProgress={setProgress} key="business" category="business" searchQuery={debouncedSearch} />}
          />
          <Route
            path="/entertainment"
            element={<News setProgress={setProgress} key="entertainment" category="entertainment" searchQuery={debouncedSearch} />}
          />
          <Route
            path="/health"
            element={<News setProgress={setProgress} key="health" category="health" searchQuery={debouncedSearch} />}
          />
          <Route
            path="/science"
            element={<News setProgress={setProgress} key="science" category="science" searchQuery={debouncedSearch} />}
          />
          <Route
            path="/sports"
            element={<News setProgress={setProgress} key="sports" category="sports" searchQuery={debouncedSearch} />}
          />
          <Route
            path="/technology"
            element={<News setProgress={setProgress} key="technology" category="technology" searchQuery={debouncedSearch} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
