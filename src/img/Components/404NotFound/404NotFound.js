import React, { Component } from 'react';
import './404NotFound.css'
import { Link } from 'react-router-dom';

class NotFound extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="error">
                <h1 className="head">404 Not Found</h1>
                <h2 className="sub">There is no such page</h2>
                <hr />
                <Link to="getintouch">Contact Us</Link>
            </div>
         );
    }
}
 
export default NotFound;