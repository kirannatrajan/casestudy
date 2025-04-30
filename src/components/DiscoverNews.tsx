import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../store/newsReducer';
import { RootState } from '../store/store';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Search from "../images/search.png";

const DiscoverNews: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { source, date, category, author } = useSelector((state: RootState) => state);
  const discoverHandle = () => {
    dispatch(fetchArticles({ query, source, date, category, author }) as any);
  };

  return (
    <div className="search-bar my-3">
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Discover News ..."
        />
        <Button variant="primary" onClick={discoverHandle}><img src={Search} className='iconsearch'/></Button>
      </InputGroup>
    </div>
  );
};

export default DiscoverNews;
