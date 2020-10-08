import React, {Component} from 'react';
import {Button, Table, Col, Row} from 'react-bootstrap';
import {
    faFileAlt,
    faPenSquare,
    faPlus,
    faSearch,
    faTimes,
    faTrashAlt,
    faEdit,
    faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Events.css';
import EventDataService from './EventDataService';
import moment from 'moment';

export default class EventList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            msg: null,
            show: false
        }
    }

    componentDidMount() {
        this.refreshEventList();
    }

    refreshEventList = () => {
        EventDataService.retrieveAllEvents().then(
            response => {
                this.setState({events: response.data})
            }
        )
    }

    deleteEventClicked = (eventId) => {
        EventDataService.deleteEvent(eventId)
            .then(response => {
                    this.setState({msg: `Event ${eventId} has been deleted successfully`, show: true})
                    this.refreshEventList();
                }
            )
    }

    updateEventClicked = (eventId) => {
        this.props.history.push(`/events/add/${eventId}`)
    }

    createEventClicked = () => {
        this.props.history.push(`/events/add/-1`)
    }

    userAddBtnClicked = () => {
        this.props.history.push(`/EnrollmentForm`)
    }

    editBtnClicked = () =>{
        this.props.history.push(`/Enrollments`)
    }

    render() {

        return (
            <div className={"container-fluid"} style={{padding: '30px 80px'}}>

                {/*msg model will be hidden by default*/}
                {
                    this.state.show &&

                        <div className="alert alert-success">
                            <Row>
                                <Col className={"pt-1"}>{this.state.msg}</Col>
                                <Col>
                                    <Button  onClick={() => this.setState({show: false})}
                                             style={{backgroundColor:'transparent', borderColor:'transparent', color:'#808080', float:'right'}}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </Button>
                                </Col>
                            </Row>
                        </div>


                }


                <div className={"p-5 mb-5"} style={{border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px'}}>
                    <div className={"row mb-3"} style={{color: '#8a8a8a'}}>
                        <div className={"col-2"}>
                        </div>
                        <div className={"col"}>
                            Event Type
                        </div>
                        <div className={"col"}>
                            Month
                        </div>
                        <div className={"col"}>
                            Progress
                        </div>
                    </div>

                    <div className={"row mb-4"}>
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
                        <div className={"col"}>
                            <select id={"progress"} className={"form-control"}>
                                <option value={"all"}>All</option>
                                <option value={"Finished"}>Finished</option>
                                <option value={"notFinished"}>Not Finished</option>
                            </select>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-auto"}>
                            <Button variant={"dark"} type={"submit"} onClick={this.createEventClicked}>
                                <FontAwesomeIcon icon={faPlus}/>&nbsp; Create Event
                            </Button>
                        </div>
                        <div className={"col-auto"}>
                            <Button variant={"dark"}>
                                <FontAwesomeIcon icon={faFileAlt}/>&nbsp; View Report
                            </Button>
                        </div>
                        <div className={"col"}>
                        </div>
                        <div className={"col-4 input-group"}>
                            <div className={"input-group-prepend"}>
                                <span className={"input-group-text bg-transparent border-right-0"}>
                                    <FontAwesomeIcon icon={faSearch}/>
                                </span>
                            </div>
                            <input className={"form-control border-left-0"} type={"text"}
                                   placeholder={"Search by name"}/>
                        </div>
                        <div className={"col-auto p-0 mr-3"} style={{backgroundColor: '#e5e5e5', paddingRight: '0'}}>
                            <Button variant={"dark"} type={"submit"} style={{float: 'right'}}>Search</Button>
                        </div>
                    </div>
                </div>

                <div className={"mb-5 table-responsive tableFixHead"}>
                    <Table striped bordered hover>
                        <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th>Event Name</th>
                            <th>Event Type</th>
                            <th>Description</th>
                            <th>Date & Time</th>
                            <th>Organizer</th>
                            <th>Finished</th>
                            <th>Edit</th>
                            <th>Enrollment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.events.map(event =>

                                <tr key={event.eventId}>
                                    <td>{event.eventName}</td>
                                    <td>{event.eventType}</td>
                                    <td>{event.eventDesc}</td>
                                    <td>
                                        {moment(event.eventDate).format('YYYY-MM-DD')}{'   '}
                                        {moment(event.eventTime, "HH:mm").format("LT")}
                                    </td>
                                    <td>{event.organizer}</td>
                                    <td>
                                        <div className={"form-check"} style={{textAlign: 'center'}}>
                                            <input className={"form-check-input position-static"} type={"checkbox"}
                                                   id={"isFinished"}
                                                   checked={event.isFinished} style={{width: '20px', height: '20px'}}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <Button className={"px-2 py-1 mx-1"} variant={"dark"} type={"submit"}
                                                    onClick={() => this.updateEventClicked(event.eventId)}>
                                                <FontAwesomeIcon icon={faPenSquare}/>
                                            </Button>
                                            <Button className={"px-2 py-1 mx-1"} variant={"dark"} type={"submit"}
                                                    onClick={() => this.deleteEventClicked(event.eventId)}>
                                                <FontAwesomeIcon icon={faTrashAlt}/>
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <Button className={"px-2 py-1 mx-1"} variant={"dark"} type={"submit"}
                                                    onClick={this.userAddBtnClicked}>
                                                <FontAwesomeIcon icon={faUserPlus} />
                                            </Button>
                                            <Button className={"px-2 py-1 mx-1"} variant={"dark"} type={"submit"}
                                                    onClick={this.editBtnClicked}>
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}