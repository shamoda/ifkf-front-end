import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from './Header-Footer/Footer';
import Header from './Header-Footer/Header';
import Login from './Login/Login';
import Home from './Home/Home';
import NotFound from './404NotFound/404NotFound';
import ShopHome from './SHOP/Views/Home/ShopHome'
import ShoppingCart from './SHOP/Views/Cart/ShoppingCart'
import shoppingCart from "./SHOP/Views/Cart/ShoppingCart";
import AddItem from './SHOP/Views/ShopAdmin/AddItem'
import AdminDashboard from './SHOP/Views/ShopAdmin/AdminDashboard'
import ProductList from "./SHOP/Views/ShopAdmin/ProductList";

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
                        <Route path="/shop" component={ShopHome} />
                        <Route path="/shopOperator" component={AdminDashboard} />
                        <Route path="/productlist" component={ProductList} />
                        <Route path="/shopOperator" component={AdminDashboard} />
                        <Route path="/ShoppingCart" component={shoppingCart} />


                        <Route component={NotFound} />

                    </Switch>

                    {/*<Footer />*/}

                </Router>

            </div>

         );
    }
}
 
export default FrontEnd;