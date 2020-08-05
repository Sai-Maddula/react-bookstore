import React from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"


class Authenticate extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isRegister:false,
            username:"",
            password:"",
            confirmPassword:"",
            registerError:"",
            registerSuccess:"",
            users:[],
            isLoggedIn:false,
            formValid:false,
            loginError:" ",
            formErrors:{
                username:"",
                password:"",
                confirmPassword:""
            }
        }
    }
    componentDidMount(){
        if(!sessionStorage.getItem("user")){
            const url ="http://localhost:3001/users"
            axios.get(url).then(Response=>{
                this.setState({users:Response.data})
            }).catch(err=>{
                console.log(err.message)
            })
        }   
       
    }
    
    handleChange=(event)=>{
        
        var fieldName=event.target.name;
        var fieldValue=event.target.value;
        this.setState({[fieldName]:fieldValue})
        this.validations(fieldName,fieldValue)
        
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        var usersArray = this.state.users;
        if(usersArray.length){
            var username=this.state.username
            var password = this.state.password
            var user = usersArray.filter(user=>user.username===username&&user.password===password)
            if(user.length){
                this.props.login(user[0].username)
                this.setState({isLoggedIn:true,loginError:null})
            }
            else{
                this.setState({loginError:"Invalid user name or password"})
            }
        }

        else{
            this.setState({loginError:"unable to fetch data"})
        }
      

    }
    validateForm=()=>{
        
        var formErrors = this.state.formErrors
       
        if(formErrors.username===""&&formErrors.password===""&&formErrors.confirmPassword==="")
        this.setState({formValid:true})
    }
    handleRegister=(event)=>{
        event.preventDefault();
        if(this.state.formValid)
       { var credentials={username:this.state.username,password:this.state.password};
        axios.post("http://localhost:3001/users",JSON.stringify(credentials),{headers:{Accept: "application/json",
        "Content-Type": "application/json"}} ).then(response=>{
            
            this.setState({registerSuccess:"Successfully registered Login to continue"})
            setTimeout(()=>{this.setState({isRegister:false})},1500)
        })
        axios.get("http://localhost:3001/users").then(Response=>{
            this.setState({users:Response.data})
        }).catch(err=>{
            console.log(err.message)
        })}
        
        
    }
    validations=(fieldName,value)=>{
        var formErrors=this.state.formErrors
       
        
        if(this.state.isRegister)
        switch(fieldName){
            case "username":
                if (value.length==0||value==""){
                    formErrors.username = "this field is required"
                    this.setState({formErrors})
                }
                else if(!value.match(/^[A-z.]+[0-9]*@[A-z]{3,}\.[A-z]{2,}$/)){
                    formErrors.username = "Provide a valid email ID"
                    this.setState({formErrors})
                }
                else
                formErrors.username=""
                this.setState({formErrors})
                break;
            case "password":
                if (value.length==0){
                    formErrors.password = "this field is required"
                    this.setState({formErrors})
                }
                else{
                    formErrors.password = ""
                    this.setState({formErrors})
                }
                break;
            case "confirmPassword":
                if(!(value == this.state.password))
                {
                    formErrors.confirmPassword="Passwords dont match"
                    this.setState({formErrors})
                }
                else{
                    formErrors.confirmPassword = ""
                    this.setState({formErrors})
                }
        }
        this.validateForm()
    }

    render(){
        var isRegister=this.state.isRegister
        if(this.state.isLoggedIn===true ||sessionStorage.getItem("user"))
        return <Redirect to="/"></Redirect>
        
        if(!isRegister){
            return(<div className="mt-5 col-md-6 offset-md-3">
            <div className="card">
                <div className="card-title text-center">
                <h3>Login</h3>
                </div>
                <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">User Name</label>
                        <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
        <div className="text-danger">{this.state.loginError}</div>
                    <div className="card-footer">
                        <p>Not a member? <button className="btn btn-link" onClick={()=>{this.setState({isRegister:!isRegister})}}>Register</button></p>
                    </div>
                </div>
            </div>
            </div>)
        }
        else
        return(<div className="mt-5 col-md-6 offset-md-3">
        <div className="card">
            <div className="card-title text-center">
            <h3>Register</h3>
            </div>
            <div className="card-body">
            <form onSubmit={this.handleRegister}>
                <div className="form-group">
                    <label htmlFor="username">User Name</label>
                    <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange} className="form-control"></input>
                    <p className="text-danger">{this.state.formErrors.username}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control"></input>
                    <p className="text-danger">{this.state.formErrors.password}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} className="form-control"></input>
                    <p className="text-danger">{this.state.formErrors.confirmPassword}</p>
                </div>
                <div className="form-group">
                    <button  type="submit" className="btn btn-primary">Register</button>
                    <div className="text-success">{this.state.registerSuccess}</div>
                    <div className="text-danger">{this.state.registerError}</div>
                </div>
            </form>
                <div className="card-footer">
                    <p>Have an account?<button className="btn btn-link" onClick={()=>{this.setState({isRegister:!isRegister})}}>Login</button></p>
                </div>
            </div>
        </div>
        </div>)
    }
}

export default Authenticate