import React from "react"
import Book from "./Book"
import axios from "axios"
class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={popularBooks:[],fetchError:null}
    }

    componentDidMount(){
        axios.get("http://localhost:3001/popular").then(response=>{
            this.setState({popularBooks:response.data})
        }).catch(error=>{
            this.setState({fetchError:"Unable to fetch books"})
        })
    }


    render(){
       if(this.state.fetchError)
       var error = <h1 className="text-danger text-center">Unable to fetch books</h1>
       else{
            var books=this.state.popularBooks
           console.log(books)
        //   var booksArray=books.map(book1=>{
        //       return( <Book book={book1} key={book1.id}></Book>)
              
        //    })
       }
        
        return (
          <div>
            <div className="jumbotron jumbotron-fluid text-center">
                <h2>Welcome to Infy Book Strore</h2>
            </div>
            {error}
            <h4>Popular Picks</h4>
            <div className="cards bg-dark">
            {books.map(book1=>{
                   return (<Book key={book1.id} popular="true" book={book1}></Book>)
               })}
            </div>
               
        </div>
        )
    }
}

export default Home