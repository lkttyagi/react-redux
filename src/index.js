import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LogIn from './LogIn';
import SignUp from './SignUp';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import dogReducer from './reducers/dogReducer';
import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';
import authReducer from './reducers/authReducer';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';



const reducer = combineReducers({
    dogs: dogReducer,
    errors: errorReducer,
    loading: loadingReducer,
    authed: authReducer,
})

const store = createStore(reducer, applyMiddleware(ReduxThunk));



ReactDOM.render( <
        Provider store = { store } >
        <
        App / >
        <
        /Provider>, document.getElementById('root'));