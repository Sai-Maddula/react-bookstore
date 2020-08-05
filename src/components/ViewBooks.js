import React from "react"
import Book from "./Book"
import Axios from "axios";

class ViewBooks extends React.Component{
    constructor(props){
        super(props)
        this.state={
            searchedItem:"",
            matchingBooks:[],
            displaySuggestions:true,
            bookList:[],
            sortBy:""
        }
        this.bookList=[];
        
        }
        handleChange=(event)=>{
            let name=event.target.name
            let value=event.target.value
            this.setState(()=>{
                return ({[name]:value})
            })
            var matchingBooks=[];
            if(value.length>0){
                matchingBooks = this.bookList.filter(book=>{
                    let regex = new RegExp(`${value}`,"i")
                    if(regex.test(book.title))
                    return(book.title)
                })
            }
             
            this.setState({matchingBooks:matchingBooks,displaySuggestions:true})
            
    }
    componentDidMount(){
        const url = "http://localhost:3001/books"
        Axios.get(url).then(response=>{
            this.bookList=response.data
           this.bookList= this.bookList.map(book=>{
                book.price = Number(book.price)
                return book
            })
            this.setState({bookList:response.data})
        })
    }
    clicked=(value)=>{
        let event={target:{name:"searchedItem",value:value}}
        this.handleChange(event)
        this.setState({searchedItem:value,displaySuggestions:false})
       
    }
    hideSuggestions=()=>{
        this.setState({displaySuggestions:false})
    }
    handleSort=(event)=>{
        this.setState({sortBy:event.target.value})

    }


    render(){
        let matchingBooks = [].concat(this.state.matchingBooks)
        let booksToDisplay=[]
        if(matchingBooks.length)
        booksToDisplay=matchingBooks
        else
        booksToDisplay=[].concat(this.state.bookList)
        if(this.state.sortBy){
            booksToDisplay.sort((a,b)=>a[this.state.sortBy]>b[this.state.sortBy]?1:-1)
        }
        let displaySuggestions = this.state.displaySuggestions
        return (
            <div>
        <div className="conatiner bg-secondary">
            <div className="offset-2 search-bar text-dark  ">
                <label htmlFor="searchedItem">Search through our books </label>
                <div className="search">
                <input style={{width:"100%"}} type="text" id="saearchedItem" name="searchedItem" onBlur={this.hideSuggestions} value={this.state.searchedItem} onChange={this.handleChange}></input>
                <ul >
                    {displaySuggestions? matchingBooks.map(book=>{
                        return (<li onClick={()=>this.clicked(book.title)} key={book.id}>{book.title}</li>)
                    }):null}

                </ul>
                </div>
                
            </div>
        </div>
       <div className="container">
           <div >
               <label htmlFor="sortBy">Sort by:</label>
                    <select className="sort-bar" id="sortBy" name="sortBy" value={this.state.sortBy} onChange={this.handleSort}>
                        <option value="">&nbsp;None </option>
                        <option value="price">Price</option>
                        <option value="title">Name</option>
                    </select>
           </div>
           <div className="row">
                {booksToDisplay.map(book=>{
                    return(<Book book={book} key={book.id}></Book>)
                })}
           </div>
        </div>
        </div>)
    }
}

export default ViewBooks