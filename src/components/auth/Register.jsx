import React, { Component } from 'react'
import { register } from "../../store/actions/authActions"
import { passwordDoesNotMatch } from "../../store/actions/authActions"
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import $ from 'jquery'

export class Register extends Component {
    state = {}

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if ($("#password").val() !== $("#passwordConfirm").val()) {
            this
                .props
                .addPasswordDoesNotMatchError();
        } else {
            this
                .props
                .registerUser(this.state);
        }
    }

    componentDidMount() {
        this.initializePasswordEvents();
    }

    initializePasswordEvents() {
        $("#password")
            .on("focusout", function (e) {
                if ($(this).val() !== $("#passwordConfirm").val()) {
                    $("#passwordConfirm")
                        .removeClass("valid")
                        .addClass("invalid");
                } else {
                    $("#passwordConfirm")
                        .removeClass("invalid")
                        .addClass("valid");
                }
            });

        $("#passwordConfirm").on("keyup", function (e) {
            if ($("#password").val() !== $(this).val()) {
                $(this)
                    .removeClass("valid")
                    .addClass("invalid");
            } else {
                $(this)
                    .removeClass("invalid")
                    .addClass("valid");
            }
        });
    }

    render() {
        const {isAuthenticated, authError} = this.props;

        if (isAuthenticated) {
            return <Redirect to="/"/>
        }

        return (
            <div className="form-container">
                <form className="white" onSubmit={(e) => this.handleSubmit(e)}>
                    <h5 className="grey-text text-darken-3">Register</h5>
                    <div className="input-field">
                        <i className="material-icons prefix">account_circle</i>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="validate"
                            required
                            onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="validate"
                            required
                            onChange={(e) => this.handleChange(e)}/>
                        <span className="helper-text" data-error="Please enter valid email address"></span>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix large">lock</i>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            minLength="6"
                            className="validate"
                            required
                            onChange={(e) => this.handleChange(e)}/>
                        <span
                            className="helper-text"
                            data-error="The password must be at least 6 characters"></span>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix large">lock</i>
                        <label htmlFor="passwordConfirm">Repeat Password</label>
                        <input
                            type="password"
                            id="passwordConfirm"
                            required
                            onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Register</button>
                        <div className="red-text center">
                            {authError
                                ? <p>
                                        {authError}
                                    </p>
                                : null}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {isAuthenticated: state.firebase.auth.uid, authError: state.auth.authError}
}

const mapDispatchToProps = (dispach) => {
    return {
        registerUser: (newUser) => dispach(register(newUser)),
        addPasswordDoesNotMatchError: () => dispach(passwordDoesNotMatch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
