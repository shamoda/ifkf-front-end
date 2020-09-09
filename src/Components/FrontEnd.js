import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import ResultsForm from './Rankings-and-Perfomance-Management/Results/ResultsForm';
import NotFound from './404NotFound/404NotFound';

import Results from './Rankings-and-Perfomance-Management/Results/Results';
import StudentList from './Rankings-and-Perfomance-Management/Student List/StudentList';
import StudentReport from './Rankings-and-Perfomance-Management/Student Report/StudentReport';
import Rankings from './Rankings-and-Perfomance-Management/Rankings/Rankings';
import GradingExaminations from './Rankings-and-Perfomance-Management/Grading Examinations/GradingExaminations';

import ShopHome from './SHOP/Views/Home/ShopHome'
import shoppingCart from "./SHOP/Views/Cart/ShoppingCart";
import AdminDashboard from './SHOP/Views/ShopAdmin/AdminDashboard'
import AddItem from './SHOP/Views/ShopAdmin/AddItem'
import ProductList from "./SHOP/Views/ShopAdmin/ProductList";
import EditItems from "./SHOP/Views/ShopAdmin/EditItems";
import AddEquipment from './Equipment/AddEquipment';



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
                        <Route path="/shop" component={ShopHome}/>
                        {/*<Route path="/shopOperator" component={AdminDashboard} />*/}
                        <Route path="/AdminDashboard" component={AdminDashboard}/>
                        <Route path="/AddItems" component={AddItem}/>
                        <Route path="/ShoppingCart" component={shoppingCart}/>
                        <Route path="/ViewAll" component={ProductList}/>
                        <Route path="/EditItem" component={EditItems}/>

                        <Route path="/" exact component={Home} />
                        <Route path="/login" component={Login} />

                        <Route path="/studentperformance" component={StudentList} />
                        <Route path="/performance/:studentId" component={Results} />
                        <Route path="/ranking/:studentId" component={Rankings} />
                        <Route path="/myperformance" component={StudentReport} />
                        <Route path="/exams" component={GradingExaminations} />
                        <Route path="/resultsform/:id" component={ResultsForm} />
                        <Route path="/results/:studentId" component={Results} />

                        <Route path="/equipment" component={AddEquipment} />
                        <Route path="/shop" component={ShopHome} />




                        <Route component={NotFound}/>

                    </Switch>

                    {/*<Footer />*/}

                </Router>

            </div>

        );
    }
}

export default FrontEnd;