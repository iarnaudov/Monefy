import React, { Component } from 'react'
import { login } from "../../store/actions/authActions"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

class Login extends Component {
    state = {

    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })  
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.loginUser(this.state);
    }

    render() {
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div className="form-container">
                <form className="white" onSubmit={(e) => this.handleSubmit(e)}>
                    <h5 className="grey-text text-darken-3">Login</h5>
                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <label htmlFor="email" className="active">Email</label>
                        <input type="email" id="email" onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">lock</i>
                        <label htmlFor="password" className="active">Password</label>
                        <input type="password" id="password" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Log In</button>
                        <div className="red-text center">
                            { this.props.authError ? <p>{this.props.authError}</p> : null }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        isAuthenticated: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispach) => {
    return {
        loginUser: (credentials) => dispach(login(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

