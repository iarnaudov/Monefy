import React from "react";
import RecordsList from "../Record/RecordsList";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Dashboard extends React.Component {

    componentDidMount() {
    
    }

    render() {
        const { isAuthenticated } = this.props;

        if (!isAuthenticated) {
            return <Redirect to="/login" />
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m6">
                        <RecordsList/>
                    </div>
                    <div className="col s12 m5 offset-m1">

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isAuthenticated: state.firebase.auth.uid }
}

export default connect (mapStateToProps)(Dashboard); 