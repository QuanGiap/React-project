import React from "react";
import './Total.css';

function Total(props){
    return(
        <div className="total_box">
            <div className="total_text">Subtotal ({props.length} item{(props.length>1)? "s":""}): <b>${props.total}</b></div>
            <input type="checkbox" name="gift" id="gift" /> <label htmlFor="gift"> This order wraped in a gift ?</label>
            <div><button className="button_checkout" onClick={props.clearBasket}>Check out</button></div>
        </div>
    )
}
export default Total;