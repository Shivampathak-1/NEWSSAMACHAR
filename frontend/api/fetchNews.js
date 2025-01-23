export default async function handler(req, res) {
    const { searchQuery, category, page, pageSize, APIKey } = req.query;
  
    const baseURL = searchQuery
      ? `https://newsapi.org/v2/everything?q=${searchQuery}`
      : `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;
  
    const url = `${baseURL}&apiKey=${APIKey}&page=${page}&pageSize=${pageSize}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch news. Status: ${response.status}`);
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to fetch news',
        message: error.message,
      });
    }
  }
  