import React, { Component } from 'react';
import {Navbar, Container, Col} from 'react-bootstrap';

class Footer extends Component {
    state = {  }
    render() { 

        let fullYear = new Date().getFullYear();

        return ( 
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>{fullYear}-{fullYear+1}, All Rights Reserved by ITP2020_S2_06_G11</div>
                    </Col>
                </Container>
            </Navbar>
         );
    }
}
 
export default Footer;