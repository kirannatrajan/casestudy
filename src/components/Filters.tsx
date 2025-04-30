import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchArticles, setFilters } from '../store/newsReducer';
import { AppDispatch } from '../store/store';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Source from "../images/source.png";
import Author from "../images/writer.png";
import Date from "../images/calendar.png";
import Category from "../images/category.png";
import Filter from "../images/filter.png";

const Filters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [source, setSource] = useState('newsapi');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const handleFilterChange = () => {
    dispatch(setFilters({ date, category, author, source }) as any);
    dispatch(fetchArticles({ query: 'latest', source, date, category, author }) as any);
  };

  return (
    <div className="filters mb-4 p-3 bgfilter rounded">
    <Row className="g-2">
      <Col md={3} sm={6} xs={12}>
        <Form.Group controlId="sourceSelect">
          <Form.Label>Source<img className='icons' src={Source} /></Form.Label>
          <Form.Select value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="newsapi">NewsAPI</option>
            <option value="nytimes">NY Times</option>
            <option value="guardian">The Guardian</option>
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={3} sm={6} xs={12}>
        <Form.Group controlId="dateFilter">
          <Form.Label>Date<img className='icons' src={Date} /></Form.Label>
          <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </Form.Group>
      </Col>
      <Col md={3} sm={6} xs={12}>
      <Form.Group controlId="categoryFilter">
          <Form.Label>Category<img className='icons' src={Category} /></Form.Label>
          <Form.Select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
          >
              <option value="">All</option>
              <option value="business">Business</option>
              <option value="entertainment">Entertainment</option>
              <option value="general">General</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
          </Form.Select>
          </Form.Group>
      </Col>
      <Col md={3} sm={6} xs={12}>
        <Form.Group controlId="authorFilter">
          <Form.Label>Author<img className='icons' src={Author} /></Form.Label>
          <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. John Doe" />
        </Form.Group>
      </Col>
    </Row>
    <div className="text-center mt-3">
      <Button variant="primary" onClick={handleFilterChange}>Personalize Feed<img className='icons' src={Filter} /></Button>
    </div>
  </div>
  );
};

export default Filters;
