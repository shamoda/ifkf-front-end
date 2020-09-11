import React, { Component } from 'react';
import moment from 'moment';
import {faFilePdf} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Events.css';
import {Card} from "react-bootstrap";
import EventDataService from "./EventDataService";

export default class EventDescription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventId: this.props.match.params.id,
            eventName: '',
            eventType: '',
            eventDate: moment(new Date()).format('YYYY-MM-DD'),
            eventTime: moment(new Date()).format('HH:mm'),
            organizer: '',
            eventDesc: ''
        }

    }

    componentDidMount() {

        this.refreshEvent();
    }

    refreshEvent = () => {
            EventDataService.retrieveEvent(this.state.eventId)
                .then( response =>
                    this.setState({
                        eventId: response.data.eventId,
                        eventName: response.data.eventName,
                        eventType: response.data.eventType,
                        eventDate: moment(response.data.eventDate).format('YYYY-MM-DD'),
                        eventTime: moment(response.data.eventDate).format('HH:mm'),
                        organizer: response.data.organizer,
                        eventDesc: response.data.eventDesc
                    })

                )

    }
    render() {
        const {eventName, eventType, eventDate, eventTime, organizer, eventDesc} = this.state

        return(
            <div>
                <div className="jumbotron jumbotron-fluid shadow-none" style={{position:'relative', top: '-10px'}}>
                    <div className={"container"}>
                        <h1 className="display-4 mb-4">{eventName}</h1>
                    </div>
                </div>

                <div className={"col"} style={{position:'relative', top: '-80px'}}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-8"}>
                                <Card className={"mb-4 description"}>
                                    <Card.Body>
                                        <Card.Title>Description</Card.Title>
                                        <Card.Text className="mt-4 lead">{eventDesc}</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card className={"mb-4 description"}>
                                    <Card.Body>
                                        <Card.Title>Description</Card.Title>
                                        <Card.Text className="mt-4 download lead">
                                            <FontAwesomeIcon icon={faFilePdf} style={{color: '#ff0000'}}/>
                                            &nbsp; "Application.pdf"
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className={"col"}>
                                <Card className={"mb-4 description"}>
                                    <Card.Body>
                                        <Card.Title>Date and Time</Card.Title>
                                        <Card.Text className="mt-4 lead">
                                            {moment(eventDate).format('MMMM DD, YYYY')} <br/>
                                            {moment(eventDate).format('dddd')} <br/>
                                            {moment(eventTime, "HH:mm").format("LT")}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card className={"mb-4 description"}>
                                    <Card.Body>
                                        <Card.Title>Organized By</Card.Title>
                                        <Card.Text className="mt-4 lead">{organizer}</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card className={"mb-4 description"}>
                                    <Card.Body>
                                        <Card.Title className={"mb-5"}>Event Type</Card.Title>
                                        <span className="mt-4 px-3 py-2 badge-pill" style={{backgroundColor: '#e0e0e0'}}>{eventType}</span>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}