import React from "react";
import { withRouter } from 'react-router-dom';

const LoggedOutDashboard = (props) => {

    var handleClick = () => {
        console.log('dasd');
        props.history.push(`/login`)
    }

    return (
        <div id="dasboard-loggedOut">
            <div id="centerDiv">
                <div>Ever wondered where all your money went?!</div>
                <div>Monefy helps you tracking your monthly expenses.</div>
                <input type="button" value="Get Started" onClick={() => handleClick()}/>
            </div>
        </div>
    )
}

export default withRouter(LoggedOutDashboard);