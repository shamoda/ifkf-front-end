import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import NotFound from './404NotFound/404NotFound';
// import ShopHome from './SHOP/Views/Home/ShopHome'
import AddEquipment from './Equipment/AddEquipment';
import Enrollments from './EventEnrollment/Enrollments';
import EnrollmentForm from './EventEnrollment/EnrollmentForm';

import EventsMain from './Events/EventsMain';
import EventDescription from "./Events/EventDescription";
import EventList from "./Events/EventList";
import AddEvent from "./Events/AddEvent";
import RegStudentForm from './EventEnrollment/RegStudentForm';

class FrontEnd extends Component {

    state = {  }

    render() { 

        return ( 

            <div className="FrontEnd">

                <Router>

                    <Header />

                    <Switch>

                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/equipment" component={AddEquipment} />
                        {/* <Route path="/shop" component={ShopHome} /> */}
                        <Route path="/Enrollments" component={Enrollments} />
                        <Route path="/EnrollmentForm/:id" component={EnrollmentForm} />
                        <Route path="/EnrollmentForm" component={EnrollmentForm} />
                        <Route path="/RegStudentForm" component={RegStudentForm}/>

                        <Route exact path="/events" component={EventsMain} />
                        <Route exact path="/events/list" component={EventList} />
                        <Route exact path="/events/:id" component={EventDescription} />
                        <Route exact path="/events/add/:id" component={AddEvent} />


                        <Route component={NotFound} />

                    </Switch>

                    <Footer />

                </Router>

            </div>

         );
    }
}
 
export default FrontEnd;