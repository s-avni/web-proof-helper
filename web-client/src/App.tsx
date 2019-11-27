import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Jumbotron, Container } from 'react-bootstrap';

const App: React.FC = () => {
  return (
    <Jumbotron fluid={true}>
      <Container>
        <h1>
          Your Personal Proof Assistant<sup><i className="text-primary"><b> made with <a
            rel="noopener noreferrer" href="https://simpy.readthedocs.io/en/latest/"
            target="_blank">Simpy</a></b></i></sup>
        </h1>
      </Container>
    </Jumbotron>
  );
}

export default App;
