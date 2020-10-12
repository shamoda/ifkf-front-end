import React, {Component} from 'react';
import {Button, Table, Col, Row, Badge, InputGroup, ButtonGroup} from 'react-bootstrap';
import {
    faFileAlt,
    faPlus,
    faSearch,
    faTimes,
    faTrashAlt,
    faUserPlus,
    faFilter, faPen, faCheck
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Events.css';
import EventDataService from './EventDataService';
import moment from 'moment';
import swal from "sweetalert";

export default class EventList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            msg: null,
            show: false,
            search: '',
            filterType: 'All',
            filterMonth: 'All',
            filterStatus: 'All',
            today: moment(new Date()).format('YYYY-MM-DD'),
            eventDate:'',
            status:''
        }
    }

    componentDidMount() {
        this.refreshEventList();
    }

    refreshEventList = () => {
        EventDataService.retrieveAllEvents().then(
            response => {
                this.setState({
                    events: response.data
                })
            }
        )
    }




    handleSearchDataChange = (event) => {
        event.preventDefault();

        this.setState({
            search: event.target.value
        })

        console.log(event.target.value);
    }

    searchByEvent = (search) => {
        if (this.state.search !== '') {
            EventDataService.searchEvent(search).then(
                response => {
                    if (response.data.length > 0) {
                        //if records exist
                        this.setState({events: response.data})
                    } else {
                        //if no records
                        swal({
                            title: "No items found!",
                            icon: "error",
                            button: "Ok!",
                        });
                    }
                }
            )
        } else {
            swal({
                title: "Enter an event name to search",
                icon: "warning",
                buttons: "Ok"
            })
            //this.setState({msg: "Enter an event name to search", show: true})
        }
    }

    clearSearch = () => {
        if (this.state.search !== '') {
            this.setState({search: ''});
            this.refreshEventList();
        }
    }




    clearFilterData = () => {
        this.setState({
            filterType: 'All',
            filterMonth: 'All',
            filterStatus: 'All',
        });
        this.refreshEventList();
    }

    handleFilterDataChange = (event) => {
        event.preventDefault();

        this.setState({
            filterType: event.target.value,
            filterMonth: event.target.value,
            filterStatus: event.target.value
        })

        console.log(event.target.value);
    }

    filterEventByType = () => {

        if (this.state.filterType !== '') {
            if(this.state.filterType === 'All') {
                this.refreshEventList();
            } else {
                EventDataService.filterByType(this.state.filterType).then(
                    response => {
                        if (response.data.length > 0) {
                            //if records exist
                            this.setState({events: response.data})
                        } else {
                            //if no records
                            this.setState({msg: "No items found", filterType:'', show: true})
                        }
                    }
                )
            }
        }
    }

    filterEventByMonth = () => {
        if (this.state.filterMonth !== '') {
            if(this.state.filterMonth === 'All') {
                this.refreshEventList();
            } else {
                EventDataService.filterByMonth(this.state.filterMonth).then(
                    response => {
                        if (response.data.length > 0) {
                            //if records exist
                            this.setState({events: response.data})
                        } else {
                            //if no records
                            swal({
                                title: "No items found!",
                                icon: "error",
                                button: "Ok!",
                            });
                            //this.setState({msg: "No items found", filterMonth:'', show: true})
                        }
                    }
                )
            }
        }
    }

    filterEventByStatus = () => {
        if (this.state.filterStatus !== '') {
            if(this.state.filterStatus === 'All') {
                this.refreshEventList();
            } else {
                EventDataService.filterByStatus(this.state.filterStatus).then(
                    response => {
                        if (response.data.length > 0) {
                            //if records exist
                            this.setState({events: response.data})
                        } else {
                            //if no records
                            swal({
                                title: "No items found!",
                                icon: "error",
                                button: "Ok!",
                            });
                            //this.setState({msg: "No items found", filterStatus:'', show: true})
                        }
                    }
                )
            }
        }
    }



    updateEventStatus = (event, status) => {

        let eventUpdate = {
            eventId: event.eventId,
            eventName: event.eventName,
            eventType: event.eventType,
            eventDate: event.eventDate,
            eventTime: event.eventTime,
            eventLocation: event.eventLocation,
            organizer: event.organizer,
            eventDesc: event.eventDesc,
            bgImgName: event.bgImgName,
            finished: status
        }

        EventDataService.updateEvent(eventUpdate).then(
            response => {
                this.refreshEventList();
            }
        )

    }

    deleteEventClicked = (eventId) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this record!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((value) => {
            if (value) {
                EventDataService.deleteEvent(eventId)
                    .then(response => {
                        swal({
                            title: "Done!",
                            text: "Event has been deleted successfully!",
                            icon: "success",
                            button: "Ok",
                        });
                            //this.setState({msg: `Event ${eventId} has been deleted successfully`, show: true})
                            this.refreshEventList();
                        }
                    )
            }
        });


    }

    updateEventClicked = (eventId) => {
        this.props.history.push(`/events/add/${eventId}`)
    }

    createEventClicked = () => {
        this.props.history.push(`/events/add/-1`)
    }

    userAddBtnClicked(eventId){
        console.log(eventId)
        this.props.history.push(`/Enrollments/`+eventId)
    }

    getReport = () => {
        EventDataService.generateReport().then(
            response => {
                console.log(response.data)
                swal({
                    title: "Done!",
                    text: `${response.data}`,
                    icon: "success",
                    button: "Ok",
                });
            }
        )
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    render() {
        const {search, filterType, filterMonth, filterStatus, msg, show} = this.state

        return (
            <div className={"container-fluid"} style={{padding: '30px 80px'}}>

                {/*msg model will be hidden by default*/}
                {/*{*/}
                {/*    show &&*/}

                {/*    <div className="alert alert-success">*/}
                {/*        <Row>*/}
                {/*            <Col className={"pt-1"}>{msg}</Col>*/}
                {/*            <Col>*/}
                {/*                <Button onClick={() => this.setState({show: false, filterType: ''})}*/}
                {/*                        style={{*/}
                {/*                            backgroundColor: 'transparent',*/}
                {/*                            borderColor: 'transparent',*/}
                {/*                            color: '#808080',*/}
                {/*                            float: 'right'*/}
                {/*                        }}>*/}
                {/*                    <FontAwesomeIcon icon={faTimes}/>*/}
                {/*                </Button>*/}
                {/*            </Col>*/}
                {/*        </Row>*/}
                {/*    </div>*/}
                {/*}*/}

                <div className={"p-5 mb-5"} style={{border: '2px solid rgba(0,0,0,0.1)', borderRadius: '10px'}}>
                    <div className={"row mb-4"}>
                        <div className={"col-2"}>
                            <p className={"lead"}>Filter By:</p>
                        </div>
                        <div className={"col"}>
                            <InputGroup>
                                <select id={"type"} className={"form-control"} value={filterType}
                                        onChange={this.handleFilterDataChange}>
                                    <option value={"All"}>Event Type</option>
                                    <option value={"Tournament"}>Tournament</option>
                                    <option value={"Training Session"}>Training Session</option>
                                    <option value={"Special Events"}>Special Events</option>
                                </select>
                                <InputGroup.Append>
                                    <ButtonGroup>
                                        <Button variant="info" style={{width: '40px'}} onClick={this.filterEventByType}>
                                            <FontAwesomeIcon icon={faFilter}/>
                                        </Button>
                                        <Button variant="danger" style={{width: '40px'}} onClick={this.clearFilterData}>
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </Button>
                                    </ButtonGroup>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                        <div className={"col"}>
                            <InputGroup>
                                <select id={"month"} className={"form-control"} value={filterMonth}
                                        onChange={this.handleFilterDataChange}>
                                    <option value={"All"}>Month</option>
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
                                <InputGroup.Append>
                                    <ButtonGroup>
                                        <Button variant="info" style={{width: '40px'}} onClick={this.filterEventByMonth}>
                                            <FontAwesomeIcon icon={faFilter}/>
                                        </Button>
                                        <Button variant="danger" style={{width: '40px'}} onClick={this.clearFilterData}>
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </Button>
                                    </ButtonGroup>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                        <div className={"col"}>
                            <InputGroup>
                                <select id={"progress"} className={"form-control"} value={filterStatus}
                                        onChange={this.handleFilterDataChange}>
                                    <option value={"All"}>Status</option>
                                    <option value={"0"}>Upcoming Events</option>
                                    <option value={"1"}>Past Events</option>
                                </select>
                                <InputGroup.Append>
                                    <ButtonGroup>
                                        <Button variant="info" style={{width: '40px'}} onClick={this.filterEventByStatus}>
                                            <FontAwesomeIcon icon={faFilter}/>
                                        </Button>
                                        <Button variant="danger" style={{width: '40px'}} onClick={this.clearFilterData}>
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </Button>
                                    </ButtonGroup>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-auto"}>
                            <Button variant={"dark"} type={"submit"} onClick={this.createEventClicked}>
                                <FontAwesomeIcon icon={faPlus}/>&nbsp; Create Event
                            </Button>
                        </div>
                        <div className={"col-auto"}>
                            <Button variant={"dark"} onClick={this.getReport}>
                                <FontAwesomeIcon icon={faFileAlt}/>&nbsp; Generate Report
                            </Button>
                        </div>
                        <div className={"col"}>
                        </div>
                        <div className={"col-4 input-group"}>
                            <input className={"form-control"} type={"text"} value={search}
                                   onChange={this.handleSearchDataChange} placeholder={"Search by event name"}
                                   onClick={this.clearSearch}/>
                        </div>
                        <div className={"col-auto p-0 mr-3 float-right"}>
                            <Button variant={"dark"} type={"submit"} style={{float: 'right'}}
                                    onClick={() => this.searchByEvent(search)}>
                                <FontAwesomeIcon icon={faSearch}/>&nbsp;
                            </Button>
                        </div>
                    </div>
                </div>


                <div className={"mb-5 table-responsive tableFixHead"}>
                    <Table striped bordered hover>
                        <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th className={"event-table-header"}>Event Name</th>
                            <th className={"event-table-header"}>Event Type</th>
                            <th className={"event-table-header"}>Description</th>
                            <th className={"event-table-header"}>Date & Time</th>
                            <th className={"event-table-header"}>Organizer</th>
                            <th className={"event-table-header"}>Location</th>
                            <th className={"event-table-header"}>Status</th>
                            <th className={"event-table-header"}>isFinished</th>
                            <th className={"event-table-header"}>Edit</th>
                            <th className={"event-table-header"}>Enrollment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.events.length === 0 ?
                                <tr align="center">
                                    <td colSpan="10">No records at the moment</td>
                                </tr>

                                : [
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
                                            <td>{event.eventLocation}</td>
                                            <td>
                                                {
                                                    event.finished === false ?
                                                        <Badge className={"p-2"} pill variant={"success"} style={{width:'80px'}} >Upcoming</Badge> :
                                                        <Badge className={"p-2"} pill variant={"warning"} style={{width:'80px'}}>Past</Badge>
                                                }
                                            </td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button className={"px-2 py-1"} variant={"success"} type={"submit"} style={{width:'35px'}}
                                                            onClick={() => this.updateEventStatus((event), 1)}>
                                                        <FontAwesomeIcon icon={faCheck}/>
                                                    </Button>
                                                    <Button className={"px-2 py-1"} variant={"warning"} type={"submit"} style={{width:'35px'}}
                                                            onClick={() => this.updateEventStatus((event), 0)}>
                                                        <FontAwesomeIcon icon={faTimes}/>
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                            <td>
                                                <div>
                                                    <ButtonGroup>
                                                        <Button className={"px-2 py-1 "} variant={"warning"} type={"submit"}  style={{width:'35px'}}
                                                                onClick={() => this.updateEventClicked(event.eventId)}>
                                                            <FontAwesomeIcon icon={faPen}/>
                                                        </Button>
                                                        <Button className={"px-2 py-1 "} variant={"danger"} type={"submit"}  style={{width:'35px'}}
                                                                onClick={() => this.deleteEventClicked(event.eventId)}>
                                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                                        </Button>
                                                    </ButtonGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <Button className={"px-2 py-1 mx-1"} variant={"dark"} type={"submit"}
                                                            onClick={() => this.userAddBtnClicked(event.eventId)}>
                                                        <FontAwesomeIcon icon={faUserPlus}/>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                ]
                        }
                        </tbody>
                    </Table>
                </div>

            </div>
        )
    }
}