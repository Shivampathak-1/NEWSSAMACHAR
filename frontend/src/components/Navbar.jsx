import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); // Holds the suggestions
  const [loading, setLoading] = useState(false);
  const APIKey = '8bd393cda5b7404987f95569842a04f6'; // Make sure to use your API key

  // Handle the change in search input
  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Set the query for search

    if (e.target.value.length > 2) {
      // Fetch suggestions if the user typed more than 2 characters
      fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]); // If the query is too short, clear suggestions
    }
  };

  // Fetch search suggestions from the News API
  const fetchSuggestions = async (query) => {
    setLoading(true);

    // Make sure to use your actual API key
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${APIKey}&pageSize=5`; // Fetching first few articles
    const data = await fetch(url);
    const parsedData = await data.json();
    
    setSuggestions(parsedData.articles || []); // Set the suggestions (we're using articles as suggestion results)
    setLoading(false);
  };

  // Handle search submit (trigger search)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query); // Update global search query
    setSuggestions([]); // Clear suggestions on submit
  };

  // Show suggestion items
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title || suggestion.name || suggestion.description); // Select suggestion text
    setSearchQuery(suggestion.title); // Trigger global query with the selected suggestion
    setSuggestions([]); // Clear suggestions after click
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NEWSamachaar</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      {/* Suggestion dropdown */}
      {suggestions.length > 0 && (
        <div className="suggestions-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            suggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                <p>{suggestion.title || suggestion.name || suggestion.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
