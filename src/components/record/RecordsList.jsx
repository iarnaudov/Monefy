import React from "react";
import RecordSummary from "./RecordSummary";
import { connect } from "react-redux";

const RecordsList = (props) => {
    const records = props.records;

    return (
        <div className="record-list">
            {
                records && records.map(record => {
                    return (<RecordSummary record={record} key={record.id}/>)
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return { 
        records: state.records.records
    }
}

export default connect(mapStateToProps)(RecordsList)
