import React from "react"
import Axios from "axios"

class AddBooks extends React.Component{
    constructor(){
        super()
        this.state={
            isbn: "",
            title: "",
            author: "",
            publicationdate: "",
            publisher: "",
            price: "",
            genre: "General",
            format: "",
            formError:"",
            successMessage:""
        }
    }
    validate=()=>{
        let state = this.state
        delete state.formError
        delete state.successMessage
        let values

        for (let keys in state){
                if(state[keys] == "" || state[keys]==null)
                return false
        }
        return true
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.validate()){
            let formdata = this.state
            delete formdata.formError;
            delete formdata.successMessage
            Axios.post("http://localhost:3001/books",JSON.stringify( formdata ),{headers:{Accept: "application/json",
            "Content-Type": "application/json"}}).then((response)=>{
                this.setState({successMessage:"Book has been added successfully"})
            }).catch(err=>{
                this.setState({formError:err.message})
            })

        }
        else{
            this.setState({formError:"All fields are required"})
        }
    }
    handleChange=(event)=>{
        let fieldName=event.target.name;
        let fieldValue=event.target.value;
        this.setState({[fieldName]:fieldValue,formError:"",successMessage:""})

    }
    render(){
        return(
            <div className="card mt-5 col-md-6 offset-3">
                <div className="card-header">
                    <h3 className="card-title text-center">Add a Book</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text"  onChange={this.handleChange} value={this.state.title} name="title" id="title" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input type="text"  onChange={this.handleChange} value={this.state.author} name="author" id="author" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="publisher">Publisher</label>
                            <input type="text"  onChange={this.handleChange} value={this.state.publisher} name="publisher" id="publisher" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isbn">ISBN</label>
                            <input type="text"  onChange={this.handleChange} value={this.state.isbn} name="isbn" id="isbn" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="number"  onChange={this.handleChange} value={this.state.price} name="price" id="price" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genre">Genre</label>
                            <input type="text"  onChange={this.handleChange} value={this.state.genre} name="genre" id="genre" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="format">Format</label>
                            <select id="format"  onChange={this.handleChange} value={this.state.format} name="format" className="form-control">
                                <option value="">Select format</option>
                                <option value="paperback">Paper Back</option>
                                <option value="Hard cover">Hard Cover</option>
                                <option value="E-copy">E-Book</option>
                            </select>
                        </div>
                        <div className="form-group ">
                            <label htmlFor="publicationdate">Publication Date</label>
                            <input type="date" onChange={this.handleChange} value={this.state.publicationdate}  name="publicationdate" id="publicationdate" className="form-control" />
                        </div>
                       <div className="card-footer text-center">
                            <button type="submit" className="btn btn-block btn-primary">Add Book</button>
                            <p className="text-danger">{this.state.formError}</p>
                            <p className="text-success">{this.state.successMessage}</p>
                       </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddBooks