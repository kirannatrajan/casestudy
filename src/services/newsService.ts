import axios from 'axios';

const API_KEYS = {
  newsapi: process.env.REACT_APP_NEWSAPI_KEY,
  nytimes: process.env.REACT_APP_NYTIMES_KEY,
  guardian: process.env.REACT_APP_GUARDIAN_KEY,
};

const fetchNews = async (query: string, source: string, date: string, category: string, author: string) => {
  let url = '';

  switch (source) {
    case 'newsapi':
      if (category) {
        url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEYS.newsapi}`;
      } else {
        url = `https://newsapi.org/v2/everything?q=${query}&from=${date}&apiKey=${API_KEYS.newsapi}`;
        if (author) {
          url += `&author=${encodeURIComponent(author)}`;
        }
      }
      break;

    case 'nytimes':
      url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&begin_date=${date.replace(/-/g, '')}&api-key=${API_KEYS.nytimes}`;
      if (author) {
        url += `&fq=byline:("${encodeURIComponent(author)}")`;
      }
      if (category) {
        url += `&fq=news_desk:("${encodeURIComponent(category)}")`;
      }
      break;

    case 'guardian':
      url = `https://content.guardianapis.com/search?q=${query}&from-date=${date}&api-key=${API_KEYS.guardian}&show-fields=all`;
      if (category) {
        url += `&section=${encodeURIComponent(category)}`;
      }
      break;
  }

  const response = await axios.get(url);
  return response.data;
};

export { fetchNews };
