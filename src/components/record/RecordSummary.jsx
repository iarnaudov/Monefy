import React from "react";

const RecordSummary = (props) => {
    const record = props.record;
    return (
        <div className="card z-depth-0 record-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{record.categoryName}</span>
                <p>Posted by me</p>
                <p className="grey-text">3rd september</p>
            </div>
        </div>
    )
}

export default RecordSummary