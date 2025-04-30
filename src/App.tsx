import React from 'react';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import News from "./images/News.png";
import "./App.css";

const App: React.FC = () => {
  return (
    <Container>
      <div className="newstitle" style={{display:"flex"}}>
        <h1 className="text-center my-4">Headlines Hub</h1>
        <img src={News} className='newsicon my-4 ml-10'></img>
      </div>
      <Home />
    </Container>
  );
};

export default App;