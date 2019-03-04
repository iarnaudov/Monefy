import React from "react";
import { connect } from "react-redux";
import DateRecords from "./DateRecords";

class RecordsList extends React.Component {

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
        const monthlyReports = this.props.monthlyRecords.monthlyRecords;

        if (monthlyReports) {
            if (monthlyReports.length > 0) {
                const componentsList = [];
                const groupedRecords = this.groupBy(monthlyReports, "date");
                const groupedRecordsKeys = Object.keys(this.groupBy(monthlyReports, "date"));

                groupedRecordsKeys.forEach(date => {
                    const dateRecords = groupedRecords[date];
                    const dateComponents = (<DateRecords records={dateRecords} key={date} />);
                    componentsList.push(dateComponents);
                });

                let income = 0;
                let expense = 0;

                for (const report of monthlyReports) {
                    if (report.category.type === "expense") {
                        expense += +report.total
                    } else if (report.category.type === "income") {
                        income += +report.total
                    }
                }

                let total = income - expense;

                return (
                    <div>
                        <div className="records-totals">
                            <span>Income: {income}</span><span>Expense: {expense}</span><span>Total: {total}</span>
                        </div>
                        <div className="records-list">
                            {componentsList}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="records-list">
                        No Records for this period.
                    </div>
                )
            }
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
        isAuthenticated: state.firebase.auth.uid,
        monthlyRecords: state.monthlyRecords
    }
}


export default connect(mapStateToProps)(RecordsList);