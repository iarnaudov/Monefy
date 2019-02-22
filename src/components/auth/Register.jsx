import React, { Component } from 'react'

export class Register extends Component {
    state = {

    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })  
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="form-container">
                <form className="white" onSubmit={(e) => this.handleSubmit(e)}>
                    <h5 className="grey-text text-darken-3">Register</h5>
                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="validate" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="validate" onChange={(e) => this.handleChange(e)} />
                        <span className="helper-text" data-error="Please enter valid email address" data-success="right"></span>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix large">lock</i>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix large">lock</i>
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input type="password" id="repeatPassword" onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register
