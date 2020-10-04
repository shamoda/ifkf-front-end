import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import NotFound from './404NotFound/404NotFound';
import ShopHome from './SHOP/Views/Home/ShopHome'
import AddEquipment from './Equipment/AddEquipment';

import FormComponent from './User/FormComponent';
import StudentTableComponent from './User/StudentTableComponent';
import InterfaceComponent from './User/InterfaceComponent';
import InstructorTableComponent from './User/InstructorTableComponent';
import FormInstructorComponent from './User/FormInstructorComponent';
import PaymentTableComponent from './User/PaymentTableComponent';
import UserComponent from './User/UserComponent';
import PaymentFormComponent from './User/PaymentFormComponent';

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
                       <Route path="/users" component={UserComponent}/>
                        <Route path="/equipment" component={AddEquipment} />
                        <Route path="/shop" component={ShopHome} />
                        <Route path="/students" component={StudentTableComponent}/>
                        <Route path="/addStudent/:id" component={FormComponent} />
                        <Route path="/addStudent" component={FormComponent}/>
                        <Route path= "/addUser" component={InterfaceComponent}/>
                        <Route path= "/instructors" component={InstructorTableComponent}/>
                        <Route path="/addInstructor/:id" component={FormInstructorComponent} />
                        <Route path="/addInstructor" component={FormInstructorComponent}/>
                        <Route path= "/payments" component={PaymentTableComponent}/>
                        <Route path= "/paymentform" component={PaymentFormComponent}/>
                        
                        

                        <Route component={NotFound} />

                    </Switch>

                    <Footer />

                </Router>

            </div>

         );
    }
}
 
export default FrontEnd;