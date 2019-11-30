import React from 'react';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { PageFooter } from './components/PageFooter';
import { PageHeader } from './components/PageHeader';
import { CustomToggle } from './components/CustomToggle';
import { MathTable } from './components/MathTable';

const App: React.FC = () => {
  return (
    <>
      <PageHeader />
      <Container className="text-center">
        <Row>
          <Col md={{ offset: 9, span: 1 }}>
            <CustomToggle />
          </Col>
        </Row>
        <h5>Enter your input, simplifying line by line:</h5>
        <Row>
          <Col md={{ offset: 2, span: 8 }}>
            <MathTable />
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <PageFooter />
    </>
  );
}

export default App;
