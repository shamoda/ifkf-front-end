import React, { Component } from 'react';
import logo from '../Assets/logo.png';
import {Link} from 'react-router-dom';

class Header extends Component {
    state = {  }
    render() { 
        return ( 

            <div>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a style={{color: "white", fontWeight: 400, fontSize:22 }} href="/" className="navbar-brand"> <img src={logo} width="60" height="60" alt="IFKF-SL logo" /> International Fumonkai Karate-do Federation - Sri Lanka</a></div>
                        
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            <li><a className="nav-link" href="/">Home</a></li>
                            <li><a className="nav-link" href="/gallery">Gallery</a></li>
                            <li><a className="nav-link" href="/history">History</a></li>
                            <li><a className="nav-link" href="/events">Events</a></li>
                            <li><a className="nav-link" href="/getintouch">Get in Touch</a></li>
                            <li><a className="nav-link" href="/login">Login</a></li>
                            <li><a className="nav-link" href="/logout">Logout</a></li>
                        </ul>
                    </nav>
            </div>


         );
    }
}
 
export default Header;