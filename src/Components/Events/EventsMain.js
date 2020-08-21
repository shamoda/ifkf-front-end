import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import './EventsMain.css';

export default class EventsMain extends Component {
    state = { }

    render() {
        return(
            <div>
                <div className="jumbotron jumbotron-fluid shadow-none" style={{position:'relative', top: '-5px'}}>
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

                <div className={"col"} style={{position:'relative', top: '-70px'}}>
                    <div className={"row"}>
                        <div className={"col"}>
                        </div>

                        <div className={"col-8 px-5"} style={{backgroundColor: '#ffffff',
                            paddingTop:'25px', paddingBottom:'20px', borderRadius:'15px',
                            boxShadow:'0 3px 5px 0 rgba(0, 0, 0, 0.2)'}}>
                            <div className={"row"}>
                                <div className={"col-2"}>
                                    <p className={"lead"}>Filter By:</p>
                                </div>
                                <div className={"col"}>
                                    <select id={"type"} className={"form-control"}>
                                        <option>Event Type</option>
                                        <option>Tournament</option>
                                        <option>Championship</option>
                                        <option>Seminar</option>
                                    </select>
                                </div>
                                <div className={"col"}>
                                    <select id={"organizer"} className={"form-control"}>
                                        <option>Organizer</option>
                                        <option>SLKF</option>
                                        <option>IFKF</option>
                                        <option>option4</option>
                                        <option>option5</option>
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
                            </div>
                        </div>

                        <div className={"col"}>
                        </div>
                    </div>

                    <div className={"row mt-4"}>
                        <div className={"col"}>
                        </div>
                        <div className={"col-9"} style={{padding:'0 4%'}}>
                            <div className={"card-deck py-3 px-1"}>
                                <Link to={"/events/eventid"} className={"card link shadowC"} style={{width:'18rem'}}>
                                    <div style={{position:'relative', backgroundColor: '#808080'}}>
                                        <img className={"card-img-top"} alt={"card-1"}
                                             src={require('../../Assets/events-bg1.jpg')}/>
                                        <div className={"date"}>
                                             <h2>11</h2>
                                             <h2>SEP</h2>
                                        </div>
                                    </div>
                                    <div className={"card-body"}>
                                        <h5 className="card-title">International Fumonkai Karate Championship 2020</h5>
                                        <p className={"card-text"}>
                                            <FontAwesomeIcon icon={faUsers}/>
                                            &nbsp; International Karate-Do Federation
                                        </p>
                                        <p className={"card-text"}>
                                            <span style={{borderRadius: '25px', padding:'7px 20px', backgroundColor: '#e0e0e0'}}>
                                                Tournament
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                                <Link to={"http://google.com"} className={"card link shadowC"} style={{width:'18rem'}}>
                                    <div style={{position:'relative', backgroundColor: '#808080'}}>
                                        <img className={"card-img-top"} alt={"card-2"}
                                             src={require('../../Assets/events-bg4.jpg')}/>
                                        <div className={"date"}>
                                            <h2>11</h2>
                                            <h2>SEP</h2>
                                         </div>
                                    </div>
                                    <div className={"card-body"}>
                                        <h5 className="card-title">International Fumonkai Karate Championship 2020</h5>
                                        <p className={"card-text"}>
                                            <FontAwesomeIcon icon={faUsers}/>
                                            &nbsp; International Karate-Do Federation
                                        </p>
                                        <p className={"card-text"}>
                                            <span style={{borderRadius: '25px', padding:'7px 20px', backgroundColor: '#e0e0e0'}}>
                                                Tournament
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                                <Link to={"http://google.com"} className={"card link shadowC"} style={{width:'18rem'}}>
                                    <div style={{position:'relative', backgroundColor: '#808080'}}>
                                        <img className={"card-img-top"} alt={"card-3"}
                                             src={require('../../Assets/events-bg3.jpg')}/>
                                        <div className={"date"}>
                                            <h2>11</h2>
                                            <h2>SEP</h2>
                                        </div>
                                    </div>
                                    <div className={"card-body"}>
                                        <h5 className="card-title">International Fumonkai Karate Championship 2020</h5>
                                        <p className={"card-text"}>
                                            <FontAwesomeIcon icon={faUsers}/>
                                            &nbsp; International Karate-Do Federation
                                        </p>
                                        <p className={"card-text"}>
                                            <span style={{borderRadius: '25px', padding:'7px 20px', backgroundColor: '#e0e0e0'}}>
                                                Tournament
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div className={"card-deck py-3 px-1"}>
                                <Link to={"http://google.com"} className={"card link shadowC"} style={{width:'18rem'}}>
                                    <div style={{position:'relative', backgroundColor: '#808080'}}>
                                        <img className={"card-img-top"} alt={"card-4"}
                                             src={require('../../Assets/events-bg2.jpg')}/>
                                        <div className={"date"}>
                                            <h2>11</h2>
                                            <h2>SEP</h2>
                                        </div>
                                    </div>
                                    <div className={"card-body"}>
                                        <h5 className="card-title">International Fumonkai Karate Championship 2020</h5>
                                        <p className={"card-text"}>
                                            <FontAwesomeIcon icon={faUsers}/>
                                            &nbsp; International Karate-Do Federation
                                        </p>
                                        <p className={"card-text"}>
                                            <span style={{borderRadius: '25px', padding:'7px 20px', backgroundColor: '#e0e0e0'}}>
                                                Tournament
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                                <Link to={"http://google.com"} className={"card link shadowC"} style={{width:'18rem'}}>
                                    <div style={{position:'relative', backgroundColor: '#808080'}}>
                                        <img className={"card-img-top"} alt={"card-5"}
                                             src={require('../../Assets/events-bg5.jpg')}/>
                                        <div className={"date"}>
                                            <h2>11</h2>
                                            <h2>SEP</h2>
                                        </div>
                                    </div>
                                    <div className={"card-body"}>
                                        <h5 className="card-title">International Fumonkai Karate Championship 2020</h5>
                                        <p className={"card-text"}>
                                            <FontAwesomeIcon icon={faUsers}/>
                                            &nbsp; International Karate-Do Federation
                                        </p>
                                        <p className={"card-text"}>
                                            <span style={{borderRadius: '25px', padding:'7px 20px', backgroundColor: '#e0e0e0'}}>
                                                Tournament
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                                <Link to={"http://google.com"} className={"card link shadowC"} style={{width:'18rem'}}>
                                    <div style={{position:'relative', backgroundColor: '#808080'}}>
                                        <img className={"card-img-top"} alt={"card-6"}
                                             src={require('../../Assets/events-bg6.jpg')}/>
                                        <div className={"date"}>
                                            <h2>11</h2>
                                            <h2>SEP</h2>
                                        </div>
                                    </div>
                                    <div className={"card-body"}>
                                        <h5 className="card-title">International Fumonkai Karate Championship 2020</h5>
                                        <p className={"card-text"}>
                                            <FontAwesomeIcon icon={faUsers}/>
                                            &nbsp; International Karate-Do Federation
                                        </p>
                                        <p className={"card-text"}>
                                            <span style={{borderRadius: '25px', padding:'7px 20px', backgroundColor: '#e0e0e0'}}>
                                                Tournament
                                            </span>
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={"col"}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}