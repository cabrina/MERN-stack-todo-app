import React, { Component } from 'react';
import axios from 'axios';

class DeleteTodo extends Component {

    //tom state "skabelon"
    state = {
        todo_description: '',
        todo_responsible: '',
        todo_priority: '',
        todo_completed: false
    };

    componentDidMount(){

        console.log("props her: ", this.props)

        // kald webAPI/backend og hent todo ud fra dens id
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
        .then(response => {

            //udfyld state med den todo der blev fundet ud fra ID,som lev sendt med hertil
            this.setState({
                todo_description: response.data.todo_description,
                todo_responsible: response.data.todo_responsible,
                todo_priority: response.data.todo_priority,
                todo_completed: response.data.todo_completed
            });
        })
        .catch(function(error) {
            console.log(error)
        });
    };

    onClickDelete = (e) => {

        axios.delete('http://localhost:4000/todos/delete/' + this.props.match.params.id)
        .then(res => {
            console.log("mon noget er slettet?", res.data);
            this.props.history.push('/');
        });
    }

    render(){
        return(
            <div className="card mt-5">
                <div className="card-body">
                    <h3 className="card-title"> Er du sikker på at du vil slette denne? </h3>
                    <h4>{this.state.todo_description}</h4>
                    <p>Ansvarlig: {this.state.todo_responsible}</p>

                    <button className="btn btn-danger mr-3" onClick={this.onClickDelete}>SLET</button>
                    <button className="btn btn-medium">Fortryd</button>
                </div>
            </div>
        )
    }
}

export default DeleteTodo