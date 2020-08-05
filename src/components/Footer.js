import React from "react"
var style = {
    
    padding:"2%",
    textAlign: "center",
    
    position: "relative",
    left: "0",
    bottom: "0",
    height: "60px",
    width:'100%'
    
}


class Footer extends React.Component{
    render(){
        return(
            <footer>
                    <div style={style} className="bg-dark">
                        <p className="text-muted">Infy book store &copy; 2020</p>
                </div>
            </footer>
        )
    }
}

export default Footer