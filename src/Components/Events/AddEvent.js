import React, { Component } from 'react';
import {Button, Card, Col, Container, Form, InputGroup} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import "react-datepicker/dist/react-datepicker.css";


export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }

    render() {
        return (
            <div>
                <Container className={"pt-5"}>
                    <Card>
                        <Card.Header as={"h3"}>Create Event</Card.Header>
                        <Form>
                            <Card.Body>
                                <Form.Group controlId={"formEventName"}>
                                    <Form.Label>Event name</Form.Label>
                                    <Form.Control type={"text"} placeholder={"Enter event name"} />
                                </Form.Group>
                                <Form.Row>
                                    <Col className={"mr-3"}>
                                        <Form.Group controlId={"formEventType"}>
                                            <Form.Label>Event type</Form.Label>
                                            <Form.Control as={"select"} defaultValue={"Choose..."}>
                                                <option>Choose...</option>
                                                <option>Tournament</option>
                                                <option>Championship</option>
                                                <option>Workshop</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId={"formDateTime"}>
                                            <Form.Label>Date and Time</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>
                                                        <FontAwesomeIcon icon={faCalendarAlt}/>
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <DatePicker className={"form-control"}
                                                    selected={this.state.startDate}
                                                    onChange={this.handleChange}
                                                    name={"startDate"}
                                                    dateFormat={"MMMM dd, yyyy h:mm aa"}
                                                    minDate={new Date()}
                                                    timeInputLabel={"Time"}
                                                    showDisabledMonthNavigation
                                                    showTimeInput
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Group controlId={"formEventOrganizer"}>
                                    <Form.Label>Organizer</Form.Label>
                                    <Form.Control type={"text"} placeholder={"Enter organizer's name"} />
                                </Form.Group>
                                <Form.Group controlId={"formEventDescription"}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as={"textarea"} rows={"3"} placeholder={"Enter description here..."} />
                                </Form.Group>
                                <Form.Group controlId={"formEventOrganizer"}>
                                    <Form.File id={"eventFileUpload"} label={"File Upload"} />
                                    <Form.Text className="text-muted">
                                        Please upload one pdf file.
                                    </Form.Text>
                                </Form.Group>
                            </Card.Body>
                            <Card.Footer style={{textAlign:'right'}}>
                                <Button variant={"success"} className={"px-3"} type={"submit"}>Submit</Button>{' '}
                                <Button variant={"secondary"} className={"px-3"} type={"reset"}>Reset</Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </Container>
            </div>
        )
    }
}