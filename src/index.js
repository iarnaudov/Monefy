import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase from "./config/firebase-config";


const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebase),
        reactReduxFirebase(firebase, { attachAuthIsReady: true })
    ));

// // Do not render the DOM untill authentication is done
// store.firebaseAuthIsReady.then(() => {
    
// })
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

