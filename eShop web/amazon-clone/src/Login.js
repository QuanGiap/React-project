import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Button from "@mui/material/Button";
export default function RootFunction(props){
  const navigation = useNavigate() // extract navigation prop here 
  
   return <Login {...props} navigation={navigation} /> //pass to your component.
  
}
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      pass: "",
      repass: "",
      isSignUp: false,
      success:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.switchSign = this.switchSign.bind(this);
    this.getData = this.getData.bind(this);
  }
  async getData(name){
    try{
    let get = await fetch("http://localhost:5000/api/accounts/search?name="+name)
    get = await get.json();
      if(get.data==null) return null;
      else return get.data.name;
    }catch(err){
        console.log(err);
      };
  }
  async onEnter(event) {
    event.preventDefault();
    if(this.state.account.length<5||this.state.pass.length<5) alert('Your account or password need to be longer the 5 letter');
    else{
      if(this.state.isSignUp){
        let check = await this.getData(this.state.account);
        if(check) alert('This account is already created');
        else if(this.state.pass!==this.state.repass) alert('Your password and repassword are not the same');
        else{
          let inform={
            "name": this.state.account,
            "pass": this.state.pass
          }
          await fetch('http://localhost:5000/api/accounts',{
                  method:'POST',
                  headers:{
                    'Content-type':'application/json'
                   },
                   body:JSON.stringify(inform)
              }).then(res=>{
                  alert("Create success");
                  this.props.changeName(this.state.account);
                  this.props.navigation('/');
              }).catch(err=>console.log(err))
        }
      }
      else{  
        let get = await fetch('http://localhost:5000/api/accounts/check?name='+this.state.account+'&pass='+this.state.pass)
        get = await get.json();
        if(get.result) {
          this.props.changeName(this.state.account);
          this.props.navigation('/')
        }
        else alert('Wrong account or password')
      }
    }
  }
  switchSign(event) {
    event.preventDefault();
    this.setState((state) => ({
      isSignUp: !state.isSignUp,
      pass: "",
      repass: "",
    }));
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  render() {
    return (
      <div>
         <div className="login_box">
          <h1 className="welcome_name">Welcome to eShop</h1>
          <h1 className="login_name">
            {this.state.isSignUp ? "Sign up" : "Sign in"}
          </h1>
          <div className="account_box">
            <label htmlFor="account">Account: </label>
            <input
              type="text"
              name="account"
              id="account"
              onChange={this.handleChange}
              value={this.state.account}
            />
          </div>
          <div className="pass_box">
            <label htmlFor="pass">Password: </label>
            <input
              type="password"
              name="pass"
              id="pass"
              onChange={this.handleChange}
              value={this.state.pass}
            />
          </div>
          {this.state.isSignUp && (
            <div className="pass_box">
              <label htmlFor="repass">Type password again: </label>
              <input
                type="password"
                name="repass"
                id="repass"
                onChange={this.handleChange}
                value={this.state.repass}
              />
            </div>
          )}
          <div>
            <Button
              variant="contained" onClick={this.onEnter}
              sx={{
                marginRight: "10px",
                marginTop: "10px",
              }}>
              Enter
            </Button>
            <Button
              variant="contained"
              onClick={this.switchSign}
              sx={{
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              {this.state.isSignUp ? "Back to sign in" : "Sign in"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
