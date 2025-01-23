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

  const APIKey = import.meta.env.VITE_API_KEY; // Make sure your API Key is set in Vercel's environment variables

  useEffect(() => {
    document.title = searchQuery
      ? `${category} - Search Results for "${searchQuery}"`
      : `${category} - NEWSamachaar`;

    setArticles([]); // Clear previous articles when query or category changes
    setPage(1); // Reset page
    fetchNews(); // Fetch news for the new state
  }, [searchQuery, category]);

  const fetchNews = async () => {
    try {
      setProgress(0);
      setLoading(true);
  
      const url = `/api/fetchNews?searchQuery=${searchQuery || ''}&category=${category}&page=${page}&pageSize=${pageSize}&APIKey=${APIKey}`;
      const response = await fetch(url);
  
      setProgress(30);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }
  
      const parsedData = await response.json();
  
      setProgress(50);
  
      if (!parsedData.articles) {
        throw new Error('Invalid data structure from API');
      }
  
      console.log('Fetched Data:', parsedData);
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setProgress(100);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };
  

  const fetchMoreData = async () => {
    const nextPage = page + 1;

    try {
      const url = `/api/fetchNews?searchQuery=${searchQuery || ''}&category=${category}&page=${nextPage}&pageSize=${pageSize}&APIKey=${APIKey}`;

      const data = await fetch(url);
      const parsedData = await data.json();

      const fetchedArticles = parsedData.articles || [];
      setArticles((prevArticles) => [...prevArticles, ...fetchedArticles]);
      setTotalResults(parsedData.totalResults || 0);
      setPage(nextPage);
    } catch (error) {
      console.error('Error fetching more data:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center" style={{ marginTop: '90px' }}>
        NEWSamachaar - Top {category} Headlines
      </h1>

      <InfiniteScroll
        className="container"
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults && !loading}
        loader={<Spinner />}
      >
        <div className="row">
          {articles.length === 0 && !loading && (
            <p className="text-center">No articles found for "{searchQuery}"</p>
          )}
          {articles.map((element, index) => (
            <div className="col-md-3 my-3" key={index}>
              <Newsitem
                title={element.title?.length >= 45 ? `${element.title.slice(0, 45)}...` : element.title || 'No Title'}
                description={
                  element.description?.length >= 60
                    ? `${element.description.slice(0, 60)}...`
                    : element.description || 'No Description'
                }
                imageURL={element.urlToImage || 'https://via.placeholder.com/150'}
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
