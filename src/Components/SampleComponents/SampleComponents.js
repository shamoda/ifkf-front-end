import React, { Component } from 'react';
// import { Card, Form, Button, Col, Container, Table, ButtonGroup } from 'react-bootstrap';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faSave, faUndo, faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import Rankings from '../Rankings-and-Perfomance-Management/Rankings/Rankings';
import GradingExaminations from '../Rankings-and-Perfomance-Management/Grading Examinations/GradingExaminations';
import Results from '../Rankings-and-Perfomance-Management/Results/Results';
import StudentReport from '../Rankings-and-Perfomance-Management/Student Report/StudentReport';
 



class SampleComponents extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                {/* <Container>
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faEdit} /> Add Entry</Card.Header>
                    <Form  method="post">
                    <Card.Body>
                    
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"  required autoComplete="off" placeholder="Title" className={"bg-dark text-white"} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"  required autoComplete="off" placeholder="Title" className={"bg-dark text-white"} />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridUrl">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"  required autoComplete="off" placeholder="Title" className={"bg-dark text-white"} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridIsbn">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"  required autoComplete="off" placeholder="Title" className={"bg-dark text-white"} />
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"  required autoComplete="off" placeholder="Title" className={"bg-dark text-white"} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLanguage">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"  required autoComplete="off" placeholder="Title" className={"bg-dark text-white"} />
                            </Form.Group>

                        </Form.Row>
                        
                    </Card.Body>

                    <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant="success" size="sm" type="submit">
                            <FontAwesomeIcon icon={faSave} /> Save
                            </Button> {' '}
                            <Button variant="info" size="sm" type="reset">
                            <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button variant="info" size="sm" type="button" >
                            <FontAwesomeIcon icon={faList} /> List
                            </Button>
                    </Card.Footer>
                    </Form>
                    </Card>
                </Container>    

            <br/>
            <br />

                <Container>

                <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark"  style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                        <th>Title</th>
                        <th>Title</th>
                        <th>Title</th>
                        <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr >
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
                                <td>
                                    <ButtonGroup>
                                        <a href="/" className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></a> &nbsp;&nbsp;
                                        // <Button size="sm" variant="outline-danger" ><FontAwesomeIcon icon={faTrash} /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>

                </Container>    */}

            <br />
            <br />
            <br/>
            <br />

                <Rankings />

            <br />
            <br />
            <br/>
            <br />

                <GradingExaminations />

            <br />
            <br />
            <br/>
            <br />

            <Results />

            <br />
            <br />
            <br/>
            <br />

            <StudentReport />

            <br />
            <br />
            <br/>
            <br />

            </div>
         );
    }
}
 
export default SampleComponents;