import React from 'react';
import Navigationbar from "./components/Navbar"
import Router from "./components/Router"
import Footer from "./components/Footer"

import './App.css';

class App extends React.Component {

  constructor(){
    super()
    this.state={isLoggedIn:false,user:"",cartItems:[]}
  }
  login=(user)=>{
    sessionStorage.setItem("user",user)
    this.setState({isLoggedIn:true,user:user})
  }
  logout=()=>{
    sessionStorage.removeItem("user")
    this.setState({isLoggedIn:false})
  }
    render(){
    return (
      <div className="container-fluid">
      <Navigationbar isLoggedIn={this.state.isLoggedIn} logout={this.logout}></Navigationbar>
        <Router login={this.login}></Router>
        <Footer></Footer>
      </div>
    );
  }
  componentDidMount(){
    var user = sessionStorage.getItem("user")
    if(user){
      this.setState({isLoggedIn:true,user:user})
    }
  }
  
  
}

export default App;
