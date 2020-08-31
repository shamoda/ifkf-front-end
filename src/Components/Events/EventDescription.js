import React, { Component } from 'react';
import {faFilePdf} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './Events.css';
import Footer from "../Header-Footer/Footer";

export default class EventDescription extends Component {
    render() {
        return(
            <div>
                <div className="jumbotron jumbotron-fluid shadow-none" style={{position:'relative', top: '-10px'}}>
                    <div className={"col"}>
                        <div className={"row"}>
                            <div className={"col"}>
                            </div>
                            <div className={"col-8 px-2"}>
                                <h1 className="display-4 mb-4">International Fumonkai Karate Championship 2020</h1>
                            </div>
                            <div className={"col"}>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"col"} style={{position:'relative', top: '-80px'}}>
                    <div className={"row"}>
                        <div className={"col"}>
                        </div>
                        <div className={"col-8"}>
                            <div className={"row"}>
                                <div className={"col-8 mr-5"}>
                                    <div className={"row mb-4 description"}>
                                        <h5>Description</h5>
                                        <p className="lead mt-4">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                            ex ea commodo consequat.
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                            ex ea commodo consequat.
                                        </p>
                                    </div>
                                    <div className={"row mb-4 description"}>
                                        <div>
                                            <h5>Downloads</h5>
                                            <p className="lead mt-4 download">
                                                <FontAwesomeIcon icon={faFilePdf} style={{color: '#ff0000'}}/>
                                                &nbsp; International Fumonkai Karate Championship - application
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className={"col"}>
                                    <div className={"row mb-4 description"}>
                                        <div>
                                            <h5>Date and Time</h5>
                                            <p className={"lead mt-4"}>
                                                September 11, 2020 <br/>
                                                Monday <br/>
                                                9.00 AM Onwards
                                            </p>
                                        </div>
                                    </div>
                                    <div className={"row mb-4 description"}>
                                        <div>
                                            <h5>Organized By</h5>
                                            <p className="lead mt-4">
                                                International Fumonkai Karate-Do Federation
                                            </p>
                                        </div>
                                    </div>
                                    <div className={"row mb-4 description"}>
                                        <div>
                                            <h5>Event Type</h5>
                                            <div className={"mt-4"} style={{borderRadius: '25px', padding:'7px 20px', backgroundColor: '#e0e0e0'}}>
                                                Tournament
                                            </div>
                                        </div>
                                    </div>
                                </div>
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