import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import NotFound from './404NotFound/404NotFound';
// import ShopHome from './SHOP/Views/Home/ShopHome'
import AddEquipment from  './Equipment/AddEquipment';
import EditEquipment from './Equipment/EditEquipment';
import EquipmentDashboard from './Equipment/EquipmentDashboard';
import Donations from './Equipment/Donations';
import ShowDonations from './Equipment/ShowDonations';
import Requests from './Equipment/Requests';
import ShowRequests from './Equipment/ShowRequests';

class FrontEnd extends Component {

    state = {  }

    render() { 

        return ( 

            <div className="FrontEnd">

                <Router >

                    <Header />

                    <Switch>

                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/equipmentDash" component={EquipmentDashboard} />
                        <Route path="/equipment/:id" component={EditEquipment} />
                        <Route path="/ShowDonations"  component={ShowDonations} />
                        <Route path="/equipment"  component={AddEquipment} />
                        <Route path="/donations"  component={Donations} />
                        <Route path="/requests"  component={Requests} />
                        <Route path="/ShowRequests"  component={ShowRequests} />
                       
                       
                   


                        <Route component={NotFound} />

                    </Switch>
     
                  
                    <Footer />

                </Router>

            </div>

         );
    }
}
 
export default  FrontEnd;