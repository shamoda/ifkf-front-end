import React, { Component } from 'react';
import { Card, Button,Container, Table, ButtonGroup } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
// import { Link } from 'react-router-dom';



class EnrolEvents extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Container>
                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>NIC</th>
                        <th>Weight</th>
                        <th>Belt-Color</th>
                        <th>kyu</th>
                        <th>Phone</th>
                        <th>E-mail</th>
                        <th>Guardian Name</th>
                        <th>Guardian Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr >
                                <td>Entry 01</td>
                                <td>Entry 01</td>
                                <td>Entry 01</td>
                                <td>Entry 01</td>
                                <td>Entry 01</td>
                                <td>Entry 01</td>
                                <td>Entry 01</td>
                                <td>Entry 01</td>
                                <td>Entry 01</td>
                                <td>Entry 01</td>
                                <td>
                                    <ButtonGroup>
                                        <a href="/" className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></a> &nbsp;&nbsp;
                                        <Button size="sm" variant="outline-danger" ><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>

                            <tr >
                                <td>Entry 02</td>
                                <td>Entry 02</td>
                                <td>Entry 02</td>
                                <td>Entry 02</td>
                                <td>Entry 02</td>
                                <td>Entry 02</td>
                                <td>Entry 02</td>
                                <td>Entry 02</td>
                                <td>Entry 02</td>
                                <td>Entry 02</td>
                                <td>
                                    <ButtonGroup>
                                        <a href="/" className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></a> &nbsp;&nbsp;
                                        <Button size="sm" variant="" ><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                    </tbody>
                    </Table>
                    </Card.Body>
                    </Card>

                </Container>   

                <br />
                <br />
                <br/>
                <br />

            </div>
        );
    }
}

export default EnrolEvents;