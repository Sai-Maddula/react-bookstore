import React from "react"
import Home from "./Home"
import ViewBooks from "./ViewBooks"
import AddBooks from "./AddBooks"
import Authenticate from "./Authenticate"
import {Switch,Route} from "react-router-dom"
import CheckLogin from "./CheckLogin"

class Router extends React.Component{
    render(){
        return(
            <div className="content">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/view" render={()=>(<CheckLogin component={ViewBooks}></CheckLogin>)} />
                <Route path="/add" render={()=>(<CheckLogin component={AddBooks}></CheckLogin>)}/>
                <Route path="/login" render={()=>(<Authenticate login={this.props.login}></Authenticate>)}/>
            </Switch>
            </div>
        )
    }
}

export default Router