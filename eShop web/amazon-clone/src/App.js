import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import InputPro from './InputPro';
import Login from './Login';
import Checkout from './Checkout';
import {BrowserRouter as Router,Routes,Route,Outlet,Navigate} from'react-router-dom';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state=({
      account:sessionStorage.getItem("account")||null,
      pageNum:(sessionStorage.getItem("account")) ? 0:2,
      basket:[],
      proData:null
    })
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
  render(){
  return (
    <div>
      <Router>
      <Header name={this.state.account} basketLength={this.state.basket.length} 
      clearAccount={()=>this.changeAccount(null)}
      changeProData={this.changeProdata}/>
      <Routes>
        <Route exact path='/' element={<Home addBasket={this.addToBasket} proData={this.state.proData} changeProData={this.changeProdata}/>}/>
        <Route path='/input-product' element={(this.state.account) ? <InputPro/> : <Navigate to="/login"/>}/>
        <Route exact path='/login' element={<Login changeName={this.changeAccount}/>}/>
        <Route exact path='/check-out' element={(this.state.account) ?<Checkout removeBasket={this.removeFromBasket} basket={this.state.basket}/>:<Navigate to="/login"/>}/>
        <Route path="*" element={<h1>No pages 404</h1>} />
      </Routes>
        <Outlet/>
      </Router>
    </div>
  );
  }
}

export default App;
