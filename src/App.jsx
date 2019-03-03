import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import "./styles/layout/main.scss"
import RecordSummary from "./components/Record/RecordSummary";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AddCategory from './components/Category/AddCategory';
import MyCategories from './components/Category/MyCategories';
import AddRecord from './components/Record/AddRecord';

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
            <Route path="/myCategories" component={MyCategories} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
