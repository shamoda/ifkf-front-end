import React, {Component} from 'react';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import './Events.css';
import {Card, Col, Container, Row} from 'react-bootstrap';
import EventDataService from './EventDataService';
import swal from 'sweetalert';

export default class EventsMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        }
    }

    componentDidMount() {
        //only display upcoming events

        EventDataService.filterByStatus(0).then(
            response => {
                if (response.data.length > 1) {
                    this.setState({events: response.data})
                } else {
                    swal({
                        title: "Sorry! No events for now",
                        icon: "error",
                        button: "Close",
                    }).then((value) => {
                        this.props.history.push(`/`)
                    });
                }
            }
        )
    }

    eventCardClicked = (eventId) => {
        this.props.history.push(`/events/${eventId}`)
    }

    render() {
        return (
            <div>

                <Container fluid className={"p-0 mb-5"}>
                    <Container fluid className={"events-container-background p-5 mb-5"}>
                        <div className="row justify-content-sm-center pt-5">
                            <h1 className={"display-4 pt-4"}>Upcoming Events</h1>
                        </div>
                    </Container>
                </Container>
                {/*<div className="jumbotron jumbotron-fluid shadow-none" style={{position: 'relative', top: '-5px'}}>*/}
                {/*    <div className={"col"}>*/}
                {/*        <div className={"row"}>*/}
                {/*            <div className={"col"}>*/}
                {/*            </div>*/}
                {/*            <div className={"col-8 px-2"}>*/}
                {/*                <h1 className="display-4">Events</h1>*/}
                {/*                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit,*/}
                {/*                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim*/}
                {/*                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip*/}
                {/*                    ex ea commodo consequat.</p>*/}
                {/*            </div>*/}
                {/*            <div className={"col"}>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={"col"}>

                    <div className={"row mt-4 pt-5"}>
                        <div className={"col"}>
                        </div>
                        <div className={"col-9"} style={{padding: '0 4%'}}>
                            <Row>
                                {
                                    this.state.events.map(event =>

                                        <Col sm={4} className={"card-group mb-4"} key={event.eventId}>
                                            <Card className={"link shadowC"} style={{width: '18rem'}} key={event.eventId}
                                                  onClick={() => this.eventCardClicked(event.eventId)}>
                                                <div style={{position: 'relative'}}>
                                                    <img className={"card-img-top img-responsive"} alt={"card"}
                                                         src={require(`../../Assets/${event.bgImgName}.jpg`)}/>
                                                    <div className={"date"}>
                                                        <h2>{moment(event.eventDate).format('DD')}</h2>
                                                        <h2>{moment(event.eventDate).format('MMM')}</h2>
                                                    </div>
                                                </div>
                                                <div className={"card-body"}>
                                                    <h5 className="card-title">{event.eventName}</h5>
                                                    <p className={"card-text"}><FontAwesomeIcon
                                                        icon={faUsers}/>&nbsp; {event.organizer}</p>
                                                    <p className={"card-text"}>
                                                    <span style={{
                                                        borderRadius: '25px',
                                                        padding: '7px 20px',
                                                        backgroundColor: '#e0e0e0'
                                                    }}>
                                                        {event.eventType}
                                                    </span>
                                                    </p>
                                                </div>
                                            </Card>
                                        </Col>
                                    )
                                }
                            </Row>
                        </div>
                        <div className={"col"}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}