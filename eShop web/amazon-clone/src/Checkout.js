import React from "react";
import "./Checkout.css";
import CheckoutPro from "./CheckoutPro";
import Total from "./Total";
import {nanoid} from 'nanoid';
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    };
    this.createCheckoutPro= this.createCheckoutPro.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }
  createCheckoutPro(){
      return this.props.basket.map((obj,index)=><CheckoutPro data={obj} key={nanoid()} 
                remove={()=>this.props.removeBasket(index)} 
                recal={()=>this.calculateTotal(parseFloat(obj.price))}/>)
  }
  calculateTotal(amount){
    if(amount){
        this.setState((prevState)=>({total:Math.round((prevState.total-amount) * 100) / 100}));
    }
    else{
        let cal = 0;
        for(let i = 0;i<this.props.basket.length;i++){
            cal+=parseFloat(this.props.basket[i].price);
        }
        this.setState({total:cal});
    }
  }
  componentDidMount(){
    this.calculateTotal();
  }
  com
  render() {
    return (
      <div className="checkout">
          <img
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB432492688_.jpg"
            alt="ad"
            className="checkout_ad"
          />
        <div className="checkout_right">
            <Total length={this.props.basket.length} total={this.state.total} clearBasket={()=>{this.props.removeBasket(-1);this.setState({total:0})}}/>
        </div>
        <div className="checkout_left">
          <h2 className="checkout_title">Your Shopping Basket</h2>
          <div className="item_container">
            {this.createCheckoutPro()}
          </div>
        </div>
      </div>
    );
  }
}
export default Checkout;
