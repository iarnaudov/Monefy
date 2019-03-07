import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import "./styles/layout/main.scss"
import RecordSummary from "./components/Record/RecordSummary";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CategoriesForm from './components/Category/CategoriesForm';
import MyCategories from './components/Category/MyCategories';
import RecordsForm from './components/Record/RecordsForm';
import UserManagement from './components/UsersManagement/UsersManagement';

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
            <Route path="/categoriesForm" component={CategoriesForm} />
            <Route path="/recordsForm" component={RecordsForm} />
            <Route path="/myCategories" component={MyCategories} />
            <Route path="/usersManagement" component={UserManagement} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
