import React, { Component } from 'react'

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
        console.log(this.state);
    }

    render() {
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
                    </div>
                </form>
            </div>
        )
    }
}

export default Login
