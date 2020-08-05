import React from "react"
import "./book.css"

class Book extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        var book = this.props.book
        if(this.props.popular)
        return(
        <div className="card card-home book-card mb-4 mt-2">
            
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.description}</p>
            </div>        
            <ul className="list-group list-group-flush">
        <li className="list-group-item">Author:{book.author}</li>
        <li className="list-group-item">Genre:{book.genre}</li>
    <li className="list-group-item">format:{book.format}</li>
        </ul>
        </div>
      )
      else
      return(
          <div className="card  col-md-3">
              <div className="card-body ">
    <h5 className="card-title">{book.title}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul className="list-group bg-primary list-group-flush">
        <li className="list-group-item">Author:{book.author}</li>
        <li className="list-group-item">Genre:{book.genre}</li>
    <li className="list-group-item">format:{book.format}</li>
        </ul>
        <div className="card-body">
      <span className="btn btn-info btn-block card-link">&#8377;{book.price}</span>
      <span className="card-link">Add to cart</span>
        </div>
          </div>
      )
    }
}

export default Book;