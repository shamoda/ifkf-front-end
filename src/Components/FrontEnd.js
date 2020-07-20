import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';

class FrontEnd extends Component {

    state = {  }

    render() { 
        return ( 

            <div className="FrontEnd">

                <Router>

                    <Header />

                    <Switch>

                        <Route  />

                    </Switch>

                    <Footer />

                </Router>

            </div>

         );
    }
}
 
export default FrontEnd;