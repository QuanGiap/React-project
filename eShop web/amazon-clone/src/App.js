import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import InputPro from './InputPro';
import Login from './Login';
import Checkout from './Checkout';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      account:sessionStorage.getItem("account")||null,
      pageNum:(sessionStorage.getItem("account")) ? 0:2,
      basket:[],
      proData:null
    })
    this.turnPage = this.turnPage.bind(this);
    this.changeAccount = this.changeAccount.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
    this.addToBasket = this.addToBasket.bind(this);
    this.changeProdata = this.changeProdata.bind(this);
  }
  changeProdata(newData){
    this.setState({proData: newData});
  }
  changeAccount(name){
      this.setState({account:name});
      if(name)
        sessionStorage.setItem("account", name);
      else
        sessionStorage.clear();
  }
  removeFromBasket(index){
    if(index>-1){
    let arr = this.state.basket;
    arr.splice(index,1);
    this.setState({basket:arr})
    }
    else{
      this.setState({basket:[]})
    }
  }
  addToBasket(item){
    let arr = this.state.basket;
    arr.push(item);
    this.setState({basket:arr})
  }
  turnPage(num){
    this.setState({pageNum:num});
  }
  render(){
  return (
    <div>
      <Header funct={this.turnPage} name={this.state.account} basketLength={this.state.basket.length} 
      clearAccount={()=>this.changeAccount(null)}
      changeProData={this.changeProdata}/>
      {this.state.pageNum === 0 && <Home addBasket={this.addToBasket} proData={this.state.proData} changeProData={this.changeProdata}/>}
      {this.state.pageNum === 1 && <InputPro/>}
      {this.state.pageNum === 2 && <Login funct={()=>this.turnPage(0)} changeName={this.changeAccount}/>}
      {this.state.pageNum === 3 && <Checkout removeBasket={this.removeFromBasket} basket={this.state.basket}/>}
    </div>
  );
  }
}

export default App;
