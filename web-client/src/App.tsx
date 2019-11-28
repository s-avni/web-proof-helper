import React from 'react';
import './App.css';
import { Jumbotron, Container, Row, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const App: React.FC = () => {
  const [domain, setDomain] = React.useState<"reals" | "complex">("reals");
  const toggleDomain = () => setDomain(domain === "reals" ? "complex" : "reals")
  return (
    <>
      <Jumbotron fluid={true}>
        <Container>
          <h1>
            Your Personal Proof Assistant<sup><i className="text-primary"><b> made with <a
              rel="noopener noreferrer" href="https://simpy.readthedocs.io/en/latest/"
              target="_blank">Simpy</a></b></i></sup>
          </h1>
          <blockquote>
            If IDEs can help coders with their coding errors, why isn't there a handy program to help mathematicians
            with
                their calculations?<br />
            <cite>- A forelorn mathematician</cite>
          </blockquote>
          {/* TODO: Replace with styles */}
          <br />
          <br />
          <h5>Input examples, press "enter" for each row simplification: </h5>
          <h6>
            <ol>
              <li>x^2 - 4 <br />(x+2)(x-2)</li>
              <li>x^2+3x+2=12<br /> (x+1)(x+2)=12</li>
              <li>x*y+z-12=2z<br />x*y-12=z</li>
            </ol>
          </h6>
        </Container>
      </Jumbotron>
      <Container className="text-center">
        <Row>
          <Col md={{ offset: 9, span: 1 }}>
            <ToggleButtonGroup name="domain" id="domain-toggle" className={domain === "complex" ? "selected-complex" : "selected-reals"} type="radio" value={domain}>
              <ToggleButton className="reals" value="reals" type="radio" onClick={() => setDomain("complex")}>Reals</ToggleButton>
              <div className="toggle-handle btn btn-light" onClick={toggleDomain} />
              <ToggleButton className="complex" value="complex" type="radio" onClick={() => setDomain("reals")}>Complex</ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
        <h5>Enter your input, simplifying line by line:</h5>
        <Row>
          <Col md={{ offset: 2, span: 8 }}>
            <table id="math_table" style={{ width: "100%" }}>
              <colgroup>
                <col span={1} style={{ width: "80%" }} />
                <col span={1} style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <th>Expression</th>
                <th>Validity</th>
              </thead>
              <tbody>
                <tr>
                  <td className="mathInput">
                    <span className="math-field"></span>
                    {/* <!-- <input type="text" /> --> */}
                  </td>
                  <td style={{ backgroundColor: "#aaa" }}>
                    <p className="status"></p>
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
      <br />
      <br />
      <footer className="footer">
        <div className="container">
          <p className="text-muted text-center" style={{ fontSize: "14px" }}>For questions or comments, please email
                avni.shiri@gmail.com.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
