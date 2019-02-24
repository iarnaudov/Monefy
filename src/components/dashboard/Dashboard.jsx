import React from "react";
import RecordsList from "../record/RecordsList";

class Dashboard extends React.Component {
    componentDidMount() {
        console.log("yaya");
    }

    render() {
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

export default Dashboard