import React, {Component} from 'react';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import './Events.css';
import {Card, Col, Row} from 'react-bootstrap';
import EventDataService from './EventDataService';

export default class EventsMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        }
    }

    componentDidMount() {
        EventDataService.retrieveAllEvents().then(
            response => {
                // console.log(response)
                this.setState({events: response.data})
            }
        )
    }

    eventCardClicked = (eventId) => {
        this.props.history.push(`/events/${eventId}`)
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid shadow-none" style={{position: 'relative', top: '-5px'}}>
                    <div className={"col"}>
                        <div className={"row"}>
                            <div className={"col"}>
                            </div>
                            <div className={"col-8 px-2"}>
                                <h1 className="display-4">Events</h1>
                                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.</p>
                            </div>
                            <div className={"col"}>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"col"} style={{position: 'relative', top: '-70px'}}>
                    <div className={"row"}>
                        <div className={"col"}>
                        </div>

                        <div className={"col-8 px-5"} style={{
                            backgroundColor: '#ffffff',
                            paddingTop: '25px', paddingBottom: '20px', borderRadius: '15px',
                            boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.2)'
                        }}>
                            <div className={"row"}>
                                <div className={"col-2"}>
                                    <p className={"lead"}>Filter By:</p>
                                </div>
                                <div className={"col"}>
                                    <select id={"type"} className={"form-control"}>
                                        <option value={"Event Type"}>Event Type</option>
                                        <option value={"Tournament"}>Tournament</option>
                                        <option value={"Training Session"}>Training Session</option>
                                        <option value={"Special Events"}>Special Events</option>
                                    </select>
                                </div>
                                <div className={"col"}>
                                    <select id={"organizer"} className={"form-control"}>
                                        <option value={"Organizer"}>Organizer</option>
                                        <option value={"SLKF"}>SLKF</option>
                                        <option value={"IFKF"}>IFKF</option>
                                        <option value={"option4"}>option4</option>
                                        <option value={"option5"}>option5</option>
                                    </select>
                                </div>
                                <div className={"col"}>
                                    <select id={"month"} className={"form-control"}>
                                        <option value={"Month"}>Month</option>
                                        <option value={"01"}>January</option>
                                        <option value={"02"}>February</option>
                                        <option value={"03"}>March</option>
                                        <option value={"04"}>April</option>
                                        <option value={"05"}>May</option>
                                        <option value={"06"}>June</option>
                                        <option value={"07"}>July</option>
                                        <option value={"08"}>August</option>
                                        <option value={"09"}>September</option>
                                        <option value={"10"}>October</option>
                                        <option value={"11"}>November</option>
                                        <option value={"12"}>December</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={"col"}>
                        </div>
                    </div>

                    <div className={"row mt-4"}>
                        <div className={"col"}>
                        </div>
                        <div className={"col-9"} style={{padding: '0 4%'}}>
                            <Row>
                                {   //iterate cards - mapping
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