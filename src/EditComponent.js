import React, { Component } from 'react';

import { connect } from 'react-redux';

import firebase from './firebase';

class EditComponent extends Component {
    handleFinalEdit = (e) => {

        e.preventDefault()
        const name = this.getNameInput.value
        const breed = this.getBreedInput.value
        const description = this.getDescriptionInput.value
        this.props.dispatch({ type: 'CLEAR_ERROR', id: this.props.dog.id })

        if (name.length === 0 || name.length <= 2 || name.trim() === "") {
            this.props.dispatch({
                type: 'DOG_EDIT_ERROR',
                message: 'Name has to be more than 2 characters',
                id: this.props.dog.id
            })
            this.forceUpdate()
            return;
        }
        if (breed.length === 0 || breed.length <= 2 || breed.trim() === "") {
            this.props.dispatch({
                type: 'DOG_EDIT_ERROR',
                message: 'Breed has to be more than 2 characters',
                id: this.props.dog.id
            })
            this.forceUpdate()
            return;
        }
        if (description.length === 0 || description.length <= 10 || description.trim() === "") {
            this.props.dispatch({
                type: 'DOG_EDIT_ERROR',
                message: 'Description has to be more than 10 characters',
                id: this.props.dog.id
            })
            this.forceUpdate()
            return;
        }
        this.props.dispatch({
            type: 'ADD_EDIT_DOG',
            data: {
                id: this.props.dog.id,
                name,
                breed,
                description,
                editing: this.props.dog.editing
            }
        })
        let updates = {}
        updates['users/' + this.props.dog.key] = this.props.dog;
        updates['users/' + this.props.dog.key].name = name;
        updates['users/' + this.props.dog.key].breed = breed;
        updates['users/' + this.props.dog.key].description = description;
        firebase.database().ref().update(updates)

    }
    render() {
        return ( <
            form className = "form"
            onSubmit = { this.handleFinalEdit } >
            <
            h3 className = "all_post_heading" > Edit Dog < /h3> <
            input type = "text"
            ref = {
                (input) => this.getNameInput = input
            }
            defaultValue = { this.props.dog.name }
            /> <br / >
            <
            input type = "text"
            ref = {
                (input) => this.getBreedInput = input
            }
            defaultValue = { this.props.dog.breed }
            /> <br / >
            <
            textarea ref = {
                (input) => this.getDescriptionInput = input
            }
            defaultValue = { this.props.dog.description }
            cols = "28"
            rows = "5" > < /textarea><br / >
            <
            button > Edit < /button> { console.log(this.props.dog.errorMessage) } {
            this.props.dog.errorMessage ? < p style = {
                { color: '#ff7777' }
            } > { this.props.dog.errorMessage } < /p> : null} < /
            form >
        );
    }
}




export default connect()(EditComponent);