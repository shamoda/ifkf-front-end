import React, {Component} from "react";
import "./qtychanger.css";
import swal from "sweetalert";

class QTY extends React.Component {

    constructor() {
        super();
        this.state = {
            value: 1
        }

    }

    componentDidMount() {

    }


    decrease = () => {

        // console.log(this.state.value)

        this.setState({value: this.state.value - 1});

        if (this.state.value <= 0) {
            swal('qty cant be negative')
            // this.state.value=1;
            this.setState({value: 1});
        }

    }


    increase = () => {


        // console.log(this.state.value)
        this.setState({value: this.state.value + 1});

    }



    render() {
        return (
            <div className="def-number-input number-input">
                <button onClick={this.decrease} className="minus" ></button>
                <input className="quantity" name="quantity" value={this.state.value} type="number"/>
                <button onClick={this.increase} className="plus"></button>
            </div>
        );
    }
}

export default QTY;