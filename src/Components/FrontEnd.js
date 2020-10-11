import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';

import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import History from "./History/History";
import GetInTouch from './GetInTouch/GetInTouch';
import NotFound from './404NotFound/404NotFound';

import Results from './Rankings-and-Perfomance-Management/Results/Results';
import ResultsForm from './Rankings-and-Perfomance-Management/Results/ResultsForm';
import StudentList from './Rankings-and-Perfomance-Management/Student List/StudentList';
import StudentReport from './Rankings-and-Perfomance-Management/Student Report/StudentReport';
import Rankings from './Rankings-and-Perfomance-Management/Rankings/Rankings';
import GradingExaminations from './Rankings-and-Perfomance-Management/Grading Examinations/GradingExaminations';

import ShopHome from './SHOP/Views/Home/ShopHome'
import ShoppingCart from "./SHOP/Views/Cart/ShoppingCart";
import AdminDashboard from './SHOP/Views/ShopAdmin/AdminDashboard'
import AddItem from './SHOP/Views/ShopAdmin/AddItem'
import ProductList from "./SHOP/Views/ShopAdmin/ProductList";
import EditItem from "./SHOP/Views/ShopAdmin/EditItem";


import Attendance from "./Attendance/Attendance"
import AddEquipment from './Equipment/AddEquipment';
import Enrollments from './EventEnrollment/Enrollments';
import EnrollmentForm from './EventEnrollment/EnrollmentForm';
import RegStudentForm from './EventEnrollment/RegStudentForm';

import OrderList from "./SHOP/Views/ShopAdmin/OrderList";
import Payment from "./SHOP/Views/Cart/Payment";


// import EditItems from "./SHOP/Views/ShopAdmin/EditItems";


//Equipments
import EquipmentDashboard from './Equipment/EquipmentDashboard';
import Donations from './Equipment/Donations';
import ShowRequests from './Equipment/ShowRequests';
import ShowDonations from './Equipment/ShowDonations';
import Requests from './Equipment/Requests';

import PaymentSessions from './Payment/PaymentSessions';
import PaymentForm from './Payment/PaymentForm';
import PaymentStatus from './Payment/PaymentStatus';



// import Enrollments from './EventEnrollment/Enrollments';
// import EnrolEvents from './EventEnrollment/EnrolEvents';
// import EnrollmentForm from './EventEnrollment/EnrollmentForm';

import EventsMain from './Events/EventsMain';
import EventDescription from "./Events/EventDescription";
import EventList from "./Events/EventList";
import AddEvent from "./Events/AddEvent";

import FormComponent from './User/FormComponent';
import StudentTableComponent from './User/StudentTableComponent';
import InterfaceComponent from './User/InterfaceComponent';
import InstructorTableComponent from './User/InstructorTableComponent';
import FormInstructorComponent from './User/FormInstructorComponent';
import PaymentTableComponent from './User/PaymentTableComponent';
import UserComponent from './User/UserComponent';

import PaymentFormComponent from './User/PaymentFormComponent';
import sessionListattendance from './Attendance/sessionListattendance';

import SessionList from "./Session/SessionList";
import AddSession from "./Session/AddSession";




class FrontEnd extends Component {

    state = {}

    render() {

        return (

            <div className="FrontEnd">

                <Router>

                    <Header/>

                    <Switch>


                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/logout" component={Login}/>
                        <Route path="/ViewAll/logout" component={Login}/>
                        <Route path="/history" component={History}/>
                        <Route path="/getintouch" component={GetInTouch}/>

                        <Route path="/shop" component={ShopHome}/>
                        <Route path="/AdminDashboard" component={AdminDashboard}/>
                        <Route path="/AddItems" component={AddItem}/>
                        <Route path="/ShoppingCart/:id" component={ShoppingCart}/>
                        <Route path="/ShoppingCart/" component={ShoppingCart}/>
                        <Route path="/ViewAll" component={ProductList}/>
                        <Route path="/EditItem/:id"  component={EditItem}/>
                        <Route path="/EditItem/"  component={EditItem}/>

                        {/* <Route path="/" exact component={Home} />*/}
                        {/*<Route path="/login" component={Login} />*/}
                        <Route path="/users" component={UserComponent}/>
                        <Route path="/equipment" component={EquipmentDashboard} />
                        <Route path="/donations" component={Donations} />
                        <Route path="/Showrequests" component={ShowRequests} />
                        <Route path="/showDonations" component={ShowDonations} />
                        <Route path="/requests" component={Requests} />

                        {/*<Route path="/login" component={Login} />*/}

                        <Route path="/equipment" component={AddEquipment} />
                        {/*<Route path="/shop" component={ShopHome} />*/}
                        <Route path="/OrderList" component={OrderList} />
                        <Route path="/Payment/:id/:tot/login" component={Login} />
                        <Route path="/Payment/:id/:tot/:value" component={Payment} />
                        <Route path="/Payment/:id" component={Login} />
                        <Route path="/Payment/:value" component={Payment} />
                        <Route path="/Payment" component={Payment} />
                        <Route path="/Payment/login" component={Login} />

                        <Route path="/attendance" component={Attendance} />
                        {/* <Route path="/attendanceList" component={AttendanceMarking} /> */}
                        <Route path="/payments" component={PaymentStatus}/>
                        <Route path="/users" component={UserComponent}/>
                        <Route path="/equipment" component={AddEquipment} />

                        {/*<Route path="/shop" component={ShopHome} />*/}
                        <Route path="/attendanceList/:id" component={Attendance} />
                        <Route path="/attendanceList" component={sessionListattendance} />
                    
                        <Route path="/payments" component={PaymentSessions}/>
                        <Route path="/addPayment/:id" component={PaymentForm}/>
                        <Route path="/addPayment" component={PaymentForm}/>
                        <Route path="/studentList" component={PaymentStatus}/>

                        <Route path="/Enrollments" component={Enrollments} />
                        <Route path="/EnrollmentForm/:id" component={EnrollmentForm} />
                        <Route path="/EnrollmentForm" component={EnrollmentForm} />
                        <Route path="/RegStudentForm" component={RegStudentForm}/>
                        

                        <Route path="/students" component={StudentTableComponent}/>
                        <Route path="/addStudent/:id" component={FormComponent} />
                        <Route path="/addStudent" component={FormComponent}/>
                        <Route path= "/addUser/:role" component={InterfaceComponent}/>
                        <Route path= "/instructors" component={InstructorTableComponent}/>
                        <Route path="/addInstructor/:id" component={FormInstructorComponent} />
                        <Route path="/addInstructor" component={FormInstructorComponent}/>
                        <Route path= "/payments" component={PaymentTableComponent}/>
                        <Route path= "/paymentform" component={PaymentFormComponent}/>
                        <Route path="/studentperformance" component={StudentList} />
                        <Route path="/performance/:studentId" component={Results} />
                        <Route path="/ranking/:studentId" component={Rankings} />
                        <Route path="/myperformance" component={StudentReport} />
                        <Route path="/exams" component={GradingExaminations} />
                        <Route path="/resultsform/:id" component={ResultsForm} />
                        <Route path="/results/:studentId" component={Results} />
                   
                        {/* <Route path="/shop" component={ShopHome} /> */}
                        {/*<Route path="/EnrolEvenrs" component={EnrolEvents} />*/}
                        {/*<Route path="/Enrollments" component={Enrollments} />*/}
                        {/*<Route path="/EnrollmentForm/:id" component={EnrollmentForm} />*/}
                        {/*<Route path="/EnrollmentForm" component={EnrollmentForm} /> */}

                        <Route exact path="/events" component={EventsMain} />
                        <Route exact path="/events/list" component={EventList} />
                        <Route exact path="/events/:id" component={EventDescription} />
                        <Route exact path="/events/add/:id" component={AddEvent} />
          
                        <Route path="/sessions" component={SessionList} />
                        <Route path="/AddSession/:id" component={AddSession} />
                        <Route path="/AddSession" component={AddSession} />

                       

          

                        <Route component={NotFound}/>

                    </Switch>

                    {/*<Footer />*/}

                </Router>

            </div>

        );
    }
}

export default FrontEnd;
