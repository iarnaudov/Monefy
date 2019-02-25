import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import "./styles/layout/main.scss"
import RecordSummary from "./components/record/RecordSummary";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AddCategory from './components/category/AddCategory';
import AddRecord from './components/record/AddRecord';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
            <Route path="/record/:id" component={RecordSummary} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/addCategory" component={AddCategory} />
            <Route path="/addRecord" component={AddRecord} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
