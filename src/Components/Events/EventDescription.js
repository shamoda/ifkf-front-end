import React, {Component} from 'react';
import moment from 'moment';
import './Events.css';
import {Card, Container, CardDeck, Badge, Image} from "react-bootstrap";
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
            eventLocation: '',
            organizer: '',
            eventDesc: ''
        }

    }

    componentDidMount() {

        this.refreshEvent();
    }

    refreshEvent = () => {
        EventDataService.retrieveEvent(this.state.eventId)
            .then(response =>
                this.setState({
                    eventId: response.data.eventId,
                    eventName: response.data.eventName,
                    eventType: response.data.eventType,
                    eventDate: moment(response.data.eventDate).format('YYYY-MM-DD'),
                    eventTime: moment(response.data.eventDate).format('HH:mm'),
                    eventLocation: response.data.eventLocation,
                    organizer: response.data.organizer,
                    eventDesc: response.data.eventDesc
                })
            )

    }

    render() {
        const {eventName, eventType, eventDate, eventTime, organizer, eventLocation, eventDesc} = this.state

        return (
            <div>
                <Container fluid className={"p-0 mb-5"}>
                    <Container fluid className={"events-container-background p-5 mb-5"}>
                        <Container className="pt-5">
                            <h1 className={"display-4 pt-4"} style={{textAlign: 'left'}}>{eventName}</h1>
                        </Container>
                        <Container>
                            <h5>
                                <Badge pill className={"mt-3 px-3 py-3"}
                                       style={{backgroundColor: '#d8d8d8'}}>{eventType}</Badge>
                            </h5>
                        </Container>
                    </Container>
                </Container>

                <Container style={{position: 'relative', top: '-90px'}}>
                    <Card className={"mb-1 description"}>
                        <Card.Body>
                            <Card.Title>Description</Card.Title>
                            <Card.Text className="mt-4 lead">{eventDesc}</Card.Text>
                        </Card.Body>
                    </Card>
                </Container>

                <Container>
                    <CardDeck>
                        <Card className={"mb-4 description"}>
                            <Card.Body>
                                <Card.Img className={"event-desc-img"} variant={"top"}
                                          src={require("../../Assets/calender.png")}/>
                                <Card.Title style={{textAlign: 'center', marginTop: '30px'}}>Date and Time</Card.Title>
                                <Card.Text className="mt-4 lead" style={{textAlign: 'center', marginTop: '30px'}}>
                                    {moment(eventDate).format('MMMM DD, YYYY')} <br/>
                                    {moment(eventDate).format('dddd')} <br/>
                                    {moment(eventTime, "HH:mm").format("LT")}
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className={"mb-4 description"}>
                            <Card.Body>
                                <Card.Img className={"event-desc-img"} variant={"top"}
                                          src={require("../../Assets/locate.png")}/>
                                <Card.Title style={{textAlign: 'center', marginTop: '30px'}}>
                                    Location
                                </Card.Title>
                                <Card.Text style={{textAlign: 'center', marginTop: '30px'}}
                                           className="mt-4 lead">{eventLocation}</Card.Text>
                            </Card.Body>
                        </Card>

                        <Card className={"mb-4 description"}>
                            <Card.Body>
                                <Card.Img className={"event-desc-img"} variant={"top"}
                                          src={require("../../Assets/organizer.png")}/>
                                <Card.Title style={{textAlign: 'center', marginTop: '30px'}}>Organized By</Card.Title>
                                <Card.Text style={{textAlign: 'center', marginTop: '30px'}}
                                           className="mt-4 lead">{organizer}</Card.Text>
                            </Card.Body>
                        </Card>

                    </CardDeck>


                </Container>
            </div>

        )
    }
}