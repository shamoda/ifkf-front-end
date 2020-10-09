import React, { Component } from 'react';
import {Figure,Button, Card, Col, Container, Form, Row} from 'react-bootstrap';
import moment from 'moment';

import EventDataService from './EventDataService';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";


export default class AddEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: -1,
            eventName: '',
            eventType: 'Choose...',
            eventDate: moment(new Date()).format('YYYY-MM-DD'),
            eventTime: moment(new Date()).format('HH:mm'),
            organizer: '',
            eventDesc: '',
            bgImgName: 'events-bg1',

            today: moment(new Date()).format('YYYY-MM-DD'),
            errors: '',
            show: false
        };

        // this.fileUpload = React.createRef();
    }

    componentDidMount() {
        const eventId = +this.props.match.params.id;

        if(eventId !== -1){
            EventDataService.retrieveEvent(eventId)
                .then( response =>
                    this.setState({
                        eventId: response.data.eventId,
                        eventName: response.data.eventName,
                        eventType: response.data.eventType,
                        eventDate: moment(response.data.eventDate).format('YYYY-MM-DD'),
                        eventTime: moment(response.data.eventDate).format('HH:mm'),
                        organizer: response.data.organizer,
                        eventDesc: response.data.eventDesc,
                        bgImgName: response.data.bgImgName
                    })

                )
        }

    }

    handleDataChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //called inside the submit
    handleValidation = () => {
        let type = this.state.eventType;
        let desc = this.state.eventDesc;
        let errors = {};
        let formIsValid = true;

        if(type === 'Choose...') {
            formIsValid = false;
            errors = "Please choose an event type";
            this.setState({show:true})

        } else if (desc.length < 10) {
            formIsValid = false;
            errors = "There must be at least 10 characters in the description";
            this.setState({show:true})
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleSubmit = event => {
        //preventing from refreshing
        event.preventDefault();

        if(this.handleValidation()) {

            if(this.state.eventId === -1) {

                let ev = {
                    eventName: this.state.eventName,
                    eventType: this.state.eventType,
                    eventDate: this.state.eventDate,
                    eventTime: this.state.eventTime,
                    organizer: this.state.organizer,
                    eventDesc: this.state.eventDesc,
                    bgImgName: this.state.bgImgName
                }

                EventDataService.createEvent(ev)
                    .then( response =>
                        {
                            this.props.history.push('/events/list')
                        }
                    )

            } else {

                let ev = {
                    eventId: this.state.eventId,
                    eventName: this.state.eventName,
                    eventType: this.state.eventType,
                    eventDate: this.state.eventDate,
                    eventTime: this.state.eventTime,
                    organizer: this.state.organizer,
                    eventDesc: this.state.eventDesc,
                    bgImgName: this.state.bgImgName
                }

                EventDataService.updateEvent(ev)
                    .then( response =>
                    {
                        this.props.history.push('/events/list')
                    })
            }

        }

    }

    render() {
        const {eventId, eventName, eventType, eventDate, eventTime, organizer, eventDesc, bgImgName} = this.state

        return (
            <div>
                <Container className={"pt-5"}>

                    {/*msg model will be hidden by default*/}
                    {
                        this.state.show &&

                        <div className="alert alert-danger">
                            <Row>
                                <Col className={"pt-1"}>{this.state.errors}</Col>
                                <Col>
                                    <Button onClick={() => this.setState({show: false})}
                                            style={{backgroundColor:'transparent', borderColor:'transparent', color:'#808080', float:'right'}}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </Button>
                                </Col>
                            </Row>
                        </div>


                    }

                    <Card>
                        <Card.Header as={"h3"}>Create Event</Card.Header>
                        <Form onSubmit={this.handleSubmit} method={"post"}>
                            <Card.Body>
                                <Form.Group controlId={"formEventName"}>
                                    <Form.Label>Event name</Form.Label>
                                    <Form.Control type={"text"} name={"eventName"} maxLength="100" value={eventName} onChange={this.handleDataChange} placeholder={"Enter event name"} required />
                                </Form.Group>
                                <Form.Row>
                                    <Col className={"mr-3"}>
                                        <Form.Group controlId={"formEventType"}>
                                            <Form.Label>Event type</Form.Label>
                                            <Form.Control as={"select"} name={"eventType"} value={eventType} onChange={this.handleDataChange} required>
                                                <option value={"Choose..."}>Choose...</option>
                                                <option value={"Tournament"}>Tournament</option>
                                                <option value={"Training Session"}>Training Session</option>
                                                <option value={"Special Events"}>Special Events</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3} className={"mr-3"}>
                                        <Form.Group controlId={"formDate"}>
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type={"date"} name={"eventDate"} min={this.state.today} value={eventDate} onChange={this.handleDataChange} required/>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={3}>
                                        <Form.Group controlId={"formTime"}>
                                            <Form.Label>Time</Form.Label>
                                            <Form.Control type={"time"} name={"eventTime"} value={eventTime} onChange={this.handleDataChange} required/>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                                <Form.Group controlId={"formEventOrganizer"}>
                                    <Form.Label>Organizer</Form.Label>
                                    <Form.Control type={"text"} name={"organizer"} maxLength="50" value={organizer} onChange={this.handleDataChange} placeholder={"Enter organizer's name"} required/>
                                </Form.Group>
                                <Form.Group controlId={"formEventDescription"}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as={"textarea"} rows={"3"} name={"eventDesc"} value={eventDesc} onChange={this.handleDataChange} placeholder={"Enter description here..."} required/>
                                </Form.Group>
                                <Form.Row>
                                    {/* <Col>
                                        <Form.Group controlId={"formFileInput"}>
                                            <Form.File id={"eventFileUpload"} label={"File Upload"} ref={this.fileUpload} />
                                            <Form.Text className="text-muted">
                                                Please upload one pdf file.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col> */}
                                    <Col className={"mr-3"}>
                                        <Form.Group controlId={"formEventBg"}>
                                            <Form.Label>Choose background Image</Form.Label>
                                            <Form.Control as={"select"} name={"bgImgName"} value={bgImgName} onChange={this.handleDataChange}>
                                                <option value={"events-bg1"}>events-bg1</option>
                                                <option value={"events-bg2"}>events-bg2</option>
                                                <option value={"events-bg3"}>events-bg3</option>
                                                <option value={"events-bg4"}>events-bg4</option>
                                                <option value={"events-bg5"}>events-bg5</option>
                                                <option value={"events-bg6"}>events-bg6</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Figure>
                                            <Figure.Image
                                                width={170}
                                                height={180}
                                                alt="171x180"
                                                src={require(`../../Assets/${bgImgName}.jpg`)}
                                                style={{borderWidth:'5px',borderStyle:'solid',borderColor:'#bebebe',borderRadius:'5px'}}
                                            />
                                        </Figure>
                                    </Col>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer style={{textAlign:'right'}}>
                                <Button variant={"success"} className={"px-3"} type={"submit"}>{eventId !== -1 ? "Update" : "Submit"}</Button>{' '}
                                <Button variant={"secondary"} className={"px-3"} type={"reset"}>Reset</Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </Container>
            </div>
        )
    }
}