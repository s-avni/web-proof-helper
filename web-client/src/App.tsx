import React from 'react';
import './App.css';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { PageFooter } from './components/PageFooter';
import { PageHeader } from './components/PageHeader';
import { DomainToggle } from './components/DomainToggle';
import { MathTable } from './components/MathTable';
import { domain } from './types';

const App: React.FC = () => {
  const [currentDomain, setDomain] = React.useState<domain>("reals");
  const [readOnBlur, setReadOnBlur] = React.useState(false);
  return (
    <>
      <PageHeader />
      <Container className="text-center">

        <Button variant={readOnBlur ? "primary" : "secondary"} onClick={() => setReadOnBlur(!readOnBlur)}>
          {readOnBlur ? "Don't " : ""}Read Expressions
        </Button>
        <Row>
          <Col md={{ offset: 9, span: 1 }}>
            <DomainToggle domain={currentDomain} setDomain={setDomain} />
          </Col>
        </Row>
        <h5>Enter your input, simplifying line by line:</h5>
        <Row>
          <Col md={{ offset: 2, span: 8 }}>
            <MathTable
              isOverReals={currentDomain === "reals"}
              readOnBlur={readOnBlur}
            />
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
