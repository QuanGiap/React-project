import React from "react";
import './CheckoutPro.css';
import {nanoid} from 'nanoid';
function CheckoutPro(props){  
    let star = [];
    for(let i = 0;i<props.data.stars;i++){
        star.push(<span key={nanoid()}><img src='./images/star.png' className='check_star_pic' alt="star" /></span>)
    }
    return(
        <div className='box_check_product'>
        <img className="check_pic_product"src={props.data.imgURL} alt="products Images" />
        <div className="check_info">
            <div className="check_description_product">{props.data.description}</div>
            <div className="check_price_product">${props.data.price}</div>
            <div>{star}</div>
            <button className='check_add_button' onClick={()=>{props.remove();props.recal();}}>Remove from basket</button>
        </div>
        </div>
    )
}
export default CheckoutPro;