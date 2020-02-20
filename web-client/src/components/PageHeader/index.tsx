import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

export const PageHeader = () => <Jumbotron fluid={true}>
    <Container>
        <h1>
            Your Personal Proof Assistant<sup><i className="text-primary"><b> made with <a
                rel="noopener noreferrer" href="https://simpy.readthedocs.io/en/latest/"
                target="_blank">Simpy</a></b></i></sup>
        </h1>
        {/* TODO: Replace with css */}
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