import React, { Component } from 'react';
import { Card, Form, Button, Col, Container, Table, ButtonGroup, InputGroup, FormControl, Alert, ControlLabel, FormGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faSave, faUndo, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
class Attendance extends Component {
    state = {}
    render() {
        return (

            <div class="container" style={{ marginTop: 150 }}>
                <div class="row">
                    <div class="col" >


                        <Container >
                            {this.state.message && <Alert variant="success">{this.state.message}</Alert>}
                            <Card className={"border border-dark bg-dark text-white"}>
                                <Card.Header><FontAwesomeIcon icon={faList} /> List

                                     </Card.Header>
                                <Card.Body>
                                    <Table bordered hover striped variant="dark" style={{ textAlign: "center" }}>
                                        <thead>
                                            <tr>
                                                <th>Student ID</th>
                                                <th>Student Name</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>

                                        <tr align="center">
                                            <td>ST123</td>
                                            <td>Santha uncle</td>



                                            <td>

                                                <ButtonGroup>

                                                    <Button size="sm" variant="outline-primary" ><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                              </ButtonGroup>
                                            </td>
                                        </tr>

                                        <tr align="center">
                                            <td>ST123</td>
                                            <td>Santha uncle</td>



                                            <td>

                                                <ButtonGroup>

                                                    <Button size="sm" variant="outline-primary" ><FontAwesomeIcon icon={faEdit} /></Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                              </ButtonGroup>
                                            </td>
                                        </tr>





                                    </Table>
                                </Card.Body>
                                <Card.Footer style={{ "textAlign": "right" }}>


                                </Card.Footer>
                            </Card>

                        </Container>


                        <br />
                        <br />
                        <br />
                        <br />


                    </div>
                    <div class="col"> 
                    <Container  >
                      {this.state.Errormessage && <Alert variant="danger">{this.state.Errormessage}</Alert>}
                  
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header  >Attendance Record</Card.Header>
                    <Form onSubmit={this.onSubmitDonations} id="Id"  method ="post">
                    <Card.Body>
                    
                        <Form.Row>
                            

                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Student ID</Form.Label>
                       
                                <h4>ST1234</h4>
                        
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Student Name</Form.Label>
                       
                                <h4>Senath Sadeesha</h4>
                        
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Rank</Form.Label>
                            <Form.Control as="select" name="fRank" className={"bg-dark text-white"}>
                                <option value="">-- Select --</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                              
                            </Form.Control>
                            </Form.Group>

                        </Form.Row>

                      
                        
                        
                    </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit">
                            <FontAwesomeIcon icon={faSave} /> 
                            </Button>{' '}
                            <Button variant="info" size="sm" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                           
                            {/* <Button variant="primary" size="sm" type="button" onClick={this.resultsList.bind()}>
                            <FontAwesomeIcon icon={faSave} /> Results
                            </Button> */}
                        </Card.Footer>
                    </Form>
                    </Card>
                </Container>
              </div>

                </div>
            </div>






        );
    }
}

export default Attendance;