// src/components/NewsItem.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const NewsItem: React.FC<{ article: any }> = ({ article }) => {
  let title = article.title || article.headline?.main || article.webTitle;
  let description = article.description || article.abstract || article.fields?.trailText;
  let url = article.url || article.web_url || article.webUrl;
  let imageUrl = article.urlToImage || article.multimedia?.[0]?.url || article.fields?.thumbnail;
  let author = article.author || article.byline?.original || article.fields?.byline || 'Unknown Author';

  return (
    <Card className="h-100">
      {imageUrl && <Card.Img variant="top" src={imageUrl} alt="news" />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <p><strong>Author:</strong> {author}</p>
        <Button variant="primary" href={url} target="_blank">Read More</Button>
      </Card.Body>
    </Card>
  );
};

export default NewsItem;
