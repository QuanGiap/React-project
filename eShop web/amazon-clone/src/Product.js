import React from 'react'
import {nanoid} from 'nanoid'
import './Product.css'
export default function Product(props){
    let star = [];
    for(let i = 0;i<props.stars;i++){
        star.push(<span><img src='./images/star.png' className='star_pic' alt="star" key={nanoid()}/></span>)
    }
    return(
        <div className='box_product'>
            <div className="description_product">{props.description}</div>
            <div className="price_product">${props.price}</div>
            <div>{star}</div>
            <img className="pic_product"src={props.imgURL} alt="products Images" />
            <button className='add_button'>Add to Basket</button>
        </div>
    )
}