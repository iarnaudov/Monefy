import React from "react";
import { connect } from "react-redux";
import DateRecords from "./DateRecords";
import { fetchRecords } from "../../store/actions/recordActions";

class RecordsList extends React.Component {
    componentDidMount = () => {
        this.props.fetchRecords(this.props.isAuthenticated);
    }

    groupBy = (xs, key) => {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    orderDates = (datesArray) => {
        let result = [];
        for (const date of datesArray) {
            var params = date.split("/")
            var day = params[0];
            var month = params[1];
            var year = params[2];
            var dateResult = year + "" + month + "" + day;
            result.push(dateResult);
        }
        return result.sort();
    }

    render() {
        if (this.props.records) {
            const componentsList = [];
            const groupedRecords = this.groupBy(this.props.records, "date");
            const groupedRecordsKeys =  Object.keys(this.groupBy(this.props.records, "date"));

            //groupedRecordsKeys = this.orderDates(groupedRecordsKeys);

            groupedRecordsKeys.forEach(date => {
                const dateRecords = groupedRecords[date];
                const dateComponents = (<DateRecords records={dateRecords} key={date}/>);
                componentsList.push(dateComponents);
            });

            return (            
                <div className="records-list">
                    {componentsList}
                </div>
            )
        } else {
            return (            
                <div className="records-list">
                    Loading...
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        records: state.records.records,
        isAuthenticated: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispach) => {
    return {
        fetchRecords: (userId) => dispach(fetchRecords(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsList);