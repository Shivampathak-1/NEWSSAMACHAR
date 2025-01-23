import React, { useState, useEffect } from 'react';
import Newsitem from './Newsitem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

const News = ({ category = 'general', pageSize = 16, setProgress, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const APIKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    // Dynamic document title based on category and search query
    const title = searchQuery ? `${category} - Search: ${searchQuery}` : `${category} - NEWSamachaar`;
    document.title = title;

    // Fetch news whenever searchQuery or category changes
    fetchNews();
  }, [searchQuery, category]); // Re-fetch when searchQuery or category changes

  const fetchNews = async () => {
    setProgress(0);

    const url = searchQuery
      ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${APIKey}&page=${page}&pageSize=${pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${APIKey}&page=${page}&pageSize=${pageSize}`;

    setLoading(true);
    const data = await fetch(url);
    setProgress(30);
    const parsedData = await data.json();
    setProgress(50);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = searchQuery
      ? `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${APIKey}&page=${nextPage}&pageSize=${pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${APIKey}&page=${nextPage}&pageSize=${pageSize}`;

    const data = await fetch(url);
    const parsedData = await data.json();

    // Avoid overwriting previous data, using callback function to update state
    setArticles((prevArticles) => [...prevArticles, ...parsedData.articles]);
    setTotalResults(parsedData.totalResults);
    setPage(nextPage);
  };

  return (
    <div className="container">
      <h1 className="container d-flex justify-content-center" style={{ marginTop: '90px' }}>
        NEWSamachaar - Top {category} headlines
      </h1>

      <InfiniteScroll
        className="container"
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.map((element, index) => (
            <div className="col-md-3 my-3" key={index}>
              <Newsitem
                title={element.title && element.title.length >= 45 ? `${element.title.slice(0, 45)}...` : element.title || 'Title not available'}
                description={element.description && element.description.length >= 60 ? `${element.description.slice(0, 60)}...` : element.description || 'Description not available'}
                imageURL={element.urlToImage}
                newsURL={element.url}
                author={element.author}
                date={element.publishedAt}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
};

export default News;
