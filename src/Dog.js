import React, { Component } from 'react';
import AllDogs from './AllDogs'

import { connect } from 'react-redux';

import firebase from './firebase';
import { withRouter, Redirect } from 'react-router-dom';

import withAuthorization from './withAuthorization';


import generateId from './utils';
class Dog extends Component {

    componentDidMount() {
        const ref = firebase.database().ref('users/');

        this.props.dispatch({ type: 'LOADING_TRUE' });
        ref.on('value', snapshot => {
            if (snapshot.val() === null) {
                this.props.dispatch({ type: 'LOADING_FALSE' });
                return;
            }
            [...Object.values(snapshot.val())].map((dog) => {
                this.props.dispatch({ type: 'ADD_DOG', data: dog })
                this.props.dispatch({ type: 'LOADING_FALSE' })
            })
        })

    }




    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.nameInput.value;
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
            //validations
        if (name.length === 0 || name.length <= 2 || name.trim() === "") {
            this.props.dispatch({ type: 'DOG_ERROR', description: 'Name has to be more than 2 characters' })
            return;
        }
        const breed = this.breedInput.value;
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
            //validations
        if (breed.length === 0 || breed.length <= 4 || breed.trim() === "") {
            this.props.dispatch({ type: 'DOG_ERROR', description: 'Breed has to be more than 4 characters' })
            return;
        }
        const description = this.descriptionInput.value;
        if (description.length <= 10 || description.trim() === "") {
            this.props.dispatch({ type: 'DOG_ERROR', description: 'description has to be more than 10 characters' })
            return;
        }
        //generate id
        const id = generateId();
        const newDog = {
            id,
            name,
            breed,
            description,
            editing: false,
            errormessage: ''
        }
        const dogRef1 = firebase.database().ref('users/')
        const dogKey = dogRef1.push()
        const dogRef = firebase.database().ref('users/' + dogKey.key)
        const uid = firebase.auth().currentUser.uid
        dogRef.set({
            id: id,
            name: name,
            breed: breed,
            description: description,
            editing: false,
            uid: uid,
            key: dogKey.key,
            errormessage: ''
        })

        if (this.props.dogs.editing) {
            this.props.dispatch({
                type: 'ADD_EDIT_DOG',
                data: newDog
            })
        }
        this.props.dispatch({
            type: 'ADDING_DOG'

        })
        this.nameInput.value = '';
        this.breedInput.value = '';
        this.descriptionInput.value = '';


    }

    handleLogout = () => {
        firebase.auth().signOut().then(() => { <
            Redirect to = "/" / >
        }).catch(() => {
            console.log('Error happened')
        })
        localStorage.removeItem('uid');
    }
    render() {
        return ( <
            div className = "post-grid" >
            <
            div className = "post-container" >
            <
            div className = "logout-container" >
            <
            h2 className = "righter" > < /h2> <
            button className = "logout"
            onClick = { this.handleLogout } > Logout < /button> <
            /div> <
            div className = "first-stuff" >
            <
            h2 className = "post_heading" > Add Dogs < /h2>

            <
            /div> <
            form className = "form"
            onSubmit = { this.handleSubmit } >
            <
            input required type = "text"
            ref = {
                (input) => this.nameInput = input }
            placeholder = "Dog Name" /
            > < br / > < br / >
            <
            input required type = "text"
            ref = {
                (input) => this.breedInput = input }
            placeholder = "Dog Breed" /
            > < br / > < br / >
            <
            textarea required ref = {
                (input) => this.descriptionInput = input }
            placeholder = "About Dog"
            cols = "28"
            rows = "5" > < /textarea><br / >
            <
            button > Add < /button>

            <
            /form> {
                this.props.errors ? < p style = {
                        { color: '#ff7777' } } > { this.props.errors.message } < /p> : null} <
                    /div> <
                    AllDogs dogs = { this.props.dogs }
                />

                <
                /div>
            );
        }
    }

    const mapStateToProps = (state) => ({
        dogs: state.dogs,
        errors: state.errors

    })
    const authCondition = (authUser) => !!authUser;

    export default withAuthorization(authCondition)(connect(mapStateToProps)(Dog));