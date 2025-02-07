import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import user from '../assets/user.png';

const Navbar = ({ setSearchQuery }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const loggedIn = window.localStorage.getItem('IsloggedIn');
  const navigator = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (loggedIn && window.localStorage.getItem('token')) {
      fetch('https://newssamachar.onrender.com/auth/fetchUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': window.localStorage.getItem('token'),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [loggedIn]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    setLoading(true);
    const APIKey = '8bd393cda5b7404987f95569842a04f6';
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${APIKey}&pageSize=5`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setSuggestions(parsedData.articles || []);
    setLoading(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    setSuggestions([]);
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
              <li className="nav-item"><Link className="nav-link" to="/">General</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
            { loggedIn && <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={query}
                onChange={handleSearchChange}
              />
              <button className="btn btn-success" type="submit">Search</button>
            </form>}
            {!loggedIn && (
              <Link to="/login" className="btn btn-light ms-3">Login</Link>
            )}
            {loggedIn && (
              <div className="dropdown ms-3">
                <button
                  className="btn btn-secondary p-0"
                  type="button"
                  style={{ borderRadius: '25px' }}
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  >
                  <img
                    // className="border border-light"
                    style={{ borderRadius: '25px' , objectFit:'cover'}}
                    src={data ? data.profile_image : user}
                    alt="Profile"
                    width="35"
                    height="35"
                    
                  />
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={() => {
                        window.localStorage.removeItem('IsloggedIn');
                        window.localStorage.removeItem('token');
                        window.location.reload();
                      }}
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
