import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import "./styles/layout/main.scss"
import RecordSummary from "./components/Record/RecordSummary";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { Blocked } from './components/Auth/Blocked';
import CategoriesForm from './components/Category/CategoriesForm';
import MyCategories from './components/Category/MyCategories';
import RecordsForm from './components/Record/RecordsForm';
import UserManagement from './components/UsersManagement/UsersManagement';
import LoggedOutDashboard from "./components/Dashboard/LoggedOutDashboard";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import "firebase/firestore"

declare var M

class App extends Component {

  state = {};

  componentWillMount() {
    this.initializeSidebar();
    this.checkIfUserIsBlocked();
  }

  componentWillUpdate() {
    this.initializeSidebar();
  }

  checkIfUserIsBlocked() {
    if (!this.props.auth.uid) {
      return
    }
    const firestore = firebase.firestore();
    firestore
        .collection("users")
        .doc(this.props.auth.uid)
        .get()
        .then((user) => {
          console.log(user.data().blocked)
          this.setState({userIsBlocked: user.data().blocked})
        })
  }

  initializeSidebar() {
    const sideBaroptions = {
      menuWidth: 200,
      closeOnClick: true,
      edge: 'right',
    }
    M.Sidenav.init(document.querySelectorAll('.sidenav'), sideBaroptions);
  }

  render() {

    if (!this.props.auth.uid && window.location.href.indexOf("/login") === -1) {
      return <LoggedOutDashboard />
    }

    if (this.state.userIsBlocked) {
      return <Blocked />
    }

    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/record/:id" component={RecordSummary} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/categoriesForm" component={CategoriesForm} />
          <Route path="/recordsForm" component={RecordsForm} />
          <Route path="/myCategories" component={MyCategories} />
          <Route path="/usersManagement" component={UserManagement} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth, userName: state.auth.userName }
}

export default withRouter(connect(mapStateToProps)(App));