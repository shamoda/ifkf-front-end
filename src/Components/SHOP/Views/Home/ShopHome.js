import React, {Component} from "react";
import '../../../Header-Footer/Header'
import '../../../Header-Footer/Header.css'

import NavbarPage from "../../Navigationbar/Nav";

import CarouselPage from "./Carousel";
import Item from "../Item/Item";


// import BrowserRouter from "../../Navigationbar/Nav";

class ShopHome extends Component{
    render() {
        return (
            <div className="ShopHome">

                <CarouselPage></CarouselPage>
                <NavbarPage></NavbarPage>
                <Item></Item>


            </div>
        );
    }

}
export  default ShopHome;