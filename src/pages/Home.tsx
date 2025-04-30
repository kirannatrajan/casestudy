import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchArticles } from '../store/newsReducer';
import SearchBar from '../components/DiscoverNews';
import Filters from '../components/Filters';
import NewsList from '../components/NewsList';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles({ query: 'latest', source: 'newsapi', date: '', category: '', author: '' }) as any);
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      <Filters />
      <NewsList />
    </div>
  );
};

export default Home;