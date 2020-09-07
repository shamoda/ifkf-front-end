import React from 'react';
import './App.css';
import './bootstrap.css';
import './Components/FrontEnd';
import FrontEnd from './Components/FrontEnd';
import '../src/Components/SHOP/Views/ShopAdmin/AddItem'
import UploadItems from "./Components/SHOP/Views/ShopAdmin/AddItem";
import ShoppingCart from './Components/SHOP/Views/Cart/ShoppingCart';
import ProductList from "./Components/SHOP/Views/ShopAdmin/ProductList";


function App() {
    return (
        <div className="App">
            {/*shopui for user*/}
            <FrontEnd/>
            <ProductList></ProductList>


            {/*<UploadItems></UploadItems>*/}
        </div>
    );
}

export default App;
