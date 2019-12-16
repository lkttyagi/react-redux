import React, { Component } from 'react';

import { connect } from 'react-redux';

import EditComponent from './EditComponent';

import firebase from './firebase';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AllDogs extends Component {
    handleDelete = (dog) => {
        this.props.dispatch({ type: 'DELETE', id: dog.id })
        const ref = firebase.database().ref('users/' + dog.key).
        ref.remove();
    }

    render() {
        console.log(this.props.dogs);
        return ( <
                div className = "all_posts_container" >
                <
                h2 className = "all_post_heading" > All Dogs < /h2> {
                this.props.loading ? < div className = "spinner" >
                <
                div className = "rect1" > < /div> <
                div className = "rect2" > < /div> <
                div className = "rect3" > < /div> <
                div className = "rect4" > < /div> <
                div className = "rect5" > < /div> < /
                div > : null
            } <
            ReactCSSTransitionGroup
        transitionName = "example"
        transitionEnterTimeout = { 500 }
        transitionLeaveTimeout = { 500 } > {
            this.props.dogs.map((dog) => ( <
                    div key = { dog.id }
                    className = "dog" > {
                        dog.editing ? < EditComponent key = { dog.id }
                        dog = { dog }
                        /> :
                        ( < div >
                            <
                            h3 className = "all_post_heading" > { dog.name } < /h3> <
                            h4 > { dog.breed } < /h4> <
                            p className = "message" > { dog.description } < /p>

                            <
                            div className = "control-buttons" > {
                                firebase.auth().currentUser.uid === dog.uid ? < button className = "delete"
                                onClick = {
                                    () => this.handleDelete(dog)
                                } > Delete Dog < /button> : null} {
                                firebase.auth().currentUser.uid === dog.uid ? < button className = "edit"
                                onClick = {
                                    () => this.props.dispatch({ type: 'EDIT', id: dog.id })
                                } > Edit Dog < /button> : null} < /
                                div > <
                                /div>
                            )
                        }

                        <
                        /div>
                    ))
            } <
            /ReactCSSTransitionGroup> < /
            div >
        );
    }
}


const mapStateToProps = (state) => ({
    loading: state.loading
})
export default connect(mapStateToProps)(AllDogs);