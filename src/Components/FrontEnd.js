import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import NotFound from './404NotFound/404NotFound';
import ShopHome from './SHOP/Views/Home/ShopHome'
import shoppingCart from "./SHOP/Views/Cart/ShoppingCart";
import AdminDashboard from './SHOP/Views/ShopAdmin/AdminDashboard'
import AddItem from './SHOP/Views/ShopAdmin/AddItem'
import ProductList from "./SHOP/Views/ShopAdmin/ProductList";


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


                        <Route component={NotFound}/>

                    </Switch>

                    {/*<Footer />*/}

                </Router>

            </div>

        );
    }
}

export default FrontEnd;