import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Newsitem from './Newsitem';
import Spinner from './Spinner';

const SearchResults = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // To get the query parameter
  const query = new URLSearchParams(location.search).get('q');

  const APIKey = '8bd393cda5b7404987f95569842a04f6';

  useEffect(() => {
    if (query) {
      fetchNews(query);
    }
  }, [query]);

  // Fetch articles based on the search query
  const fetchNews = async (query) => {
    setLoading(true);
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${APIKey}&pageSize=16`;
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles(parsedData.articles);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="container d-flex justify-content-center" style={{ marginTop: '90px' }}>
        Search results for "{query}"
      </h1>
      {loading ? <Spinner /> : (
        <div className="row">
          {articles.length > 0 ? (
            articles.map((element, index) => (
              <div className="col-md-3 my-3" key={index}>
                <Newsitem
                  tittle={element.title && element.title.length >= 45 ? `${element.title.slice(0, 45)}...` : element.title || 'Title not available'}
                  description={element.description && element.description.length >= 60 ? `${element.description.slice(0, 60)}...` : element.description || 'Description not available'}
                  imageURL={element.urlToImage}
                  newsURL={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
