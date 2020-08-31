import React, { Component } from 'react';
import {Button, Table} from 'react-bootstrap';
import {faMinus, faPenSquare, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Events.css';

export default class EventList extends Component {
    render() {
        return (
            <div className={"container-fluid"} style={{padding:'30px 80px'}}>

                <div className={"p-5 mb-5"} style={{border: '2px solid rgba(0,0,0,0.1)', borderRadius:'10px'}}>
                    <div className={"row mb-3"} style={{color:'#8a8a8a'}}>
                        <div className={"col-2"}>
                        </div>
                        <div className={"col"}>
                            Event  Type
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
                                <option>Event Type</option>
                                <option>Tournament</option>
                                <option>Championship</option>
                                <option>Workshops</option>
                            </select>
                        </div>
                        <div className={"col"}>
                            <select id={"month"} className={"form-control"}>
                                <option>Month</option>
                                <option>January</option>
                                <option>February</option>
                                <option>March</option>
                                <option>April</option>
                                <option>May</option>
                                <option>June</option>
                                <option>July</option>
                                <option>August</option>
                                <option>September</option>
                                <option>October</option>
                                <option>November</option>
                                <option>December</option>
                            </select>
                        </div>
                        <div className={"col"}>
                            <select id={"progress"} className={"form-control"}>
                                <option>All</option>
                                <option>Finished</option>
                                <option>Not Finished</option>
                            </select>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col-auto"}>
                            <Button variant={"dark"} type={"submit"}>
                                <FontAwesomeIcon icon={faPlus}/>&nbsp; Create Event
                            </Button>
                        </div>
                        <div className={"col-auto"}>
                            <Button variant={"dark"}>
                                <FontAwesomeIcon icon={faMinus}/>&nbsp; Delete Event
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
                            <input className={"form-control border-left-0"} type={"text"} placeholder={"Search"}/>
                        </div>
                        <div className={"col-auto p-0 mr-3"} style={{backgroundColor:'#e5e5e5', paddingRight:'0'}}>
                            <Button variant={"dark"} type={"submit"} style={{float:'right'}}>Search</Button>
                        </div>

                    </div>
                </div>

                <div className={"mb-5 table-responsive tableFixHead"}>
                    <Table striped bordered hover>
                        <thead >
                            <tr style={{textAlign:'center'}}>
                                <th >Event Name</th>
                                <th>Event Type</th>
                                <th>Description</th>
                                <th>Date &amp; Time</th>
                                <th>Organizer</th>
                                <th>Uploads</th>
                                <th>Edit</th>
                                <th>Finished</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>International Fumonkai Karate Championship 2020</td>
                                <td>Tournament</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                    ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </td>
                                <td>2020-09-11;9:00AM</td>
                                <td>International Fumonkai Karate-Do Federation</td>
                                <td>IFKF championship-application.pdf</td>
                                <td>
                                    <Button className={"px-2 py-1 mx-3"} variant={"dark"} type={"submit"}>
                                        <FontAwesomeIcon icon={faPenSquare}/>
                                    </Button>
                                </td>
                                <td>
                                    <div className={"form-check"} style={{textAlign:'center'}}>
                                        <input className={"form-check-input position-static"} type={"checkbox"} id={"isFinished"}
                                         style={{width:'20px', height:'20px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>National Karate Championship 2020</td>
                                <td>Tournament</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt nostrud exercitation ullamco
                                    ex ea commodo consequat.
                                </td>
                                <td>2020-10-20;9:00AM</td>
                                <td>Sri Lanka Karate-Do Federation</td>
                                <td>National championship-application.pdf</td>
                                <td>
                                    <Button className={"px-2 py-1 mx-3"} variant={"dark"} type={"submit"}>
                                        <FontAwesomeIcon icon={faPenSquare}/>
                                    </Button>
                                </td>
                                <td>
                                    <div className={"form-check"} style={{textAlign:'center'}}>
                                        <input className={"form-check-input position-static"} type={"checkbox"} id={"isFinished"}
                                               style={{width:'20px', height:'20px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>Nunchaku Training</td>
                                <td>Workshop</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit,ullamco laboris nisi ut
                                    ex ea commodo consequat.
                                </td>
                                <td>2020-06-06;8:30AM</td>
                                <td>International Fumonkai Karate-Do Federation</td>
                                <td>None</td>
                                <td>
                                    <Button className={"px-2 py-1 mx-3"} variant={"dark"} type={"submit"}>
                                        <FontAwesomeIcon icon={faPenSquare}/>
                                    </Button>
                                </td>
                                <td>
                                    <div className={"form-check"} style={{textAlign:'center'}}>
                                        <input className={"form-check-input position-static"} type={"checkbox"} id={"isFinished"}
                                               style={{width:'20px', height:'20px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>Kubudo Training</td>
                                <td>Workshop</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit,ullamco laboris nisi ut
                                    ex ea commodo consequat.
                                </td>
                                <td>2020-12-10;10:00AM</td>
                                <td>International Fumonkai Karate-Do Federation</td>
                                <td>None</td>
                                <td>
                                    <Button className={"px-2 py-1 mx-3"} variant={"dark"} type={"submit"}>
                                        <FontAwesomeIcon icon={faPenSquare}/>
                                    </Button>
                                </td>
                                <td>
                                    <div className={"form-check"} style={{textAlign:'center'}}>
                                        <input className={"form-check-input position-static"} type={"checkbox"} id={"isFinished"}
                                               style={{width:'20px', height:'20px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>Kubudo Training</td>
                                <td>Workshop</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit,ullamco laboris nisi ut
                                    ex ea commodo consequat.
                                </td>
                                <td>2020-12-10;10:00AM</td>
                                <td>International Fumonkai Karate-Do Federation</td>
                                <td>None</td>
                                <td>
                                    <Button className={"px-2 py-1 mx-3"} variant={"dark"} type={"submit"}>
                                        <FontAwesomeIcon icon={faPenSquare}/>
                                    </Button>
                                </td>
                                <td>
                                    <div className={"form-check"} style={{textAlign:'center'}}>
                                        <input className={"form-check-input position-static"} type={"checkbox"} id={"isFinished"}
                                               style={{width:'20px', height:'20px'}}/>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>Kubudo Training</td>
                                <td>Workshop</td>
                                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit,ullamco laboris nisi ut
                                    ex ea commodo consequat.
                                </td>
                                <td>2020-12-10;10:00AM</td>
                                <td>International Fumonkai Karate-Do Federation</td>
                                <td>None</td>
                                <td>
                                    <Button className={"px-2 py-1 mx-3"} variant={"dark"} type={"submit"}>
                                        <FontAwesomeIcon icon={faPenSquare}/>
                                    </Button>
                                </td>
                                <td>
                                    <div className={"form-check"} style={{textAlign:'center'}}>
                                        <input className={"form-check-input position-static"} type={"checkbox"} id={"isFinished"}
                                               style={{width:'20px', height:'20px'}}/>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                </div>


            </div>
        )
    }
}