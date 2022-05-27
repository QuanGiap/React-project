import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import InputPro from './InputPro';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state=({isShop:true})
    this.turnPage = this.turnPage.bind(this);
  }
  turnPage(bool){
    this.setState({isShop:bool});
  }
  render(){
  return (
    <div>
      <Header funct={this.turnPage}/>
      {this.state.isShop && <Home/>}
      {!this.state.isShop && <InputPro/>}
    </div>
  );
  }
}

export default App;
