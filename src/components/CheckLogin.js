import React from "react"
import { Redirect } from "react-router-dom"

class CheckLogin extends React.Component{
    
   
    
    render(){
        let user = sessionStorage.getItem("user")
        
        if(user){
            let Components=this.props.component
            return (<Components></Components>)
        }
        else{
            return <Redirect to="/login"></Redirect>
        }
    }
}

export default CheckLogin;