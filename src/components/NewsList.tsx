import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import NewsItem from './NewsItem';
import { Container, Row, Col } from 'react-bootstrap';

const NewsList: React.FC = () => {
  const { articles, status } = useSelector((state: RootState) => state);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Failed to load news.</p>;

  return (
    <Container>
      <Row>
        {articles && articles.length > 0 ? (
          articles.map((article: unknown, index: number) => (
            <Col key={index} md={4} sm={6} xs={12} className="mb-4">
              <NewsItem article={article} />
            </Col>
          ))
        ) : (
          <p className="text-center">No articles found</p>
        )}
      </Row>
    </Container>
  );
};

export default NewsList;