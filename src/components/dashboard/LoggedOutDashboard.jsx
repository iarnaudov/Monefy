import React from "react";
import { withRouter } from 'react-router-dom';

const LoggedOutDashboard = (props) => {

    var register = () => {
        props.history.push(`/register`)
    }

    var login = () => {
        props.history.push(`/login`)
        console.log("ddaa");
    }

    return (
        <div id="dasboard-loggedOut">
            <div id="centerDiv">
                <div>Ever wondered where all your money went?!</div>
                <div>Monefy helps you tracking your monthly expenses.</div>
                <input type="button" value="Get Started" onClick={() => register()}/>
                <div id="textSpan">
                    already have an account?
                    <span onClick={() => login()}>Login</span>
                </div>
                
            </div>
        </div>
    )
}

export default withRouter(LoggedOutDashboard);