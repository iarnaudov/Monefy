import React from "react";
import Icon from "../Icon/Icon";

const RecordSummary = (props) => {
    const record = props.record;

    return (
        <div className="date-card-row" data-id={record.id}>
            <div className="row">
                <div className="col s2">
                    <Icon category={record.category} />
                </div>
                <div className="col s7">
                    <span className="date-card-title">{record.title}</span>
                </div>
                <div className="col s3">
                    <p className="right money">{record.category.type === "expense" ? "-" : "+"}{record.total}</p>
                    </div>
            </div>
        </div>
    )
}

export default RecordSummary