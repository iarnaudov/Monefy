import React, { useEffect } from "react";
import { connect } from "react-redux";
import RecordSummary from "./RecordSummary";
import { fetchRecords } from "../../store/actions/recordActions";

const RecordsList = (props) => {
    useEffect(() => {
            props.fetchRecords();
    },[])

    return (
        <div className="record-list">
            {
                props.records && props.records.map(record => {
                    return (<RecordSummary record={record} key={record.id}/>)
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {records: state.records.records}
}

const mapDispatchToProps = (dispach) => {
    return {
        fetchRecords: () => dispach(fetchRecords())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsList);