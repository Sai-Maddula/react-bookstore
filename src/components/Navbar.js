import React from "react"
import {Link} from "react-router-dom"

import {
    Collapse,
    Navbar,
    NavbarToggler,
    
    Nav,
    NavItem,
    
    
    NavbarText
  } from 'reactstrap';

class Navigationbar extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={isOpen:false,user:props.user,buttonText:"logout"}
    }
    toggle = ()=>{
        this.setState({isOpen:!this.state.isOpen})
    }
    
   
    render(){
        var isOpen = this.state.isOpen;
        var user=sessionStorage.getItem("user")
        if(user)
        var welcome="Welcome "+user
        else
        welcome=""
        return(
            <div>
      <Navbar color="dark" dark expand="md">
        <Link to="/" className="navbar-brand">Infy Bookstrore</Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/view" className="nav-link">View Books</Link>
            </NavItem>
            <NavItem>
              <Link to="/add" className="nav-link">Add Books</Link>
            </NavItem>
            
          </Nav>
        <NavbarText>{welcome}</NavbarText>
        {this.props.isLoggedIn?
        <button className="btn btn-link" onClick={this.props.logout}>Logout</button>:
        <Link to="/login" className="nav-link">Login</Link>}
        </Collapse>
      </Navbar>
    </div>
        )
    }

}
export default Navigationbar;