import React from "react";
import RecordSummary from "./RecordSummary";
import $ from 'jquery';
import { withRouter} from 'react-router-dom';

class DateRecords extends React.Component {

    revertDate() {
        var year = this.props.records[0].date.slice(0,4);
        var month = this.props.records[0].date.slice(4,6);
        var day = this.props.records[0].date.slice(6,8);
        return day + "/" + month + "/" + year;
    }

    componentDidMount() {
        $(".date-card-row").on("click", (e) => {
            const recordId = $(e.target).closest(".date-card-row").attr("data-id")
            this.props.history.push(`/addRecord?${recordId}`)
        })
    }

    render() {
        const records = [];
        let totalExpenses = 0;
        let totalIncome = 0;

        this.props.records.forEach(record => {
            records.push((<RecordSummary record={record} key={record.id} />));

            if (record.category.type === "expense") {
                totalExpenses += +record.total;
            } else {
                totalIncome += +record.total;
            }
        });

        const revertedDate = this.revertDate();

        const incomeSpan = totalIncome > 0 ? `Income: ${totalIncome}` : null;
        const expenseSpan = totalExpenses > 0 ? `Expense: ${totalExpenses}` : null;     
        const totalSpan = incomeSpan && expenseSpan ? `Total: ${totalIncome - totalExpenses}` : null;

        return (
            <div className="date-card z-depth-2">
                <div className="row date-card-date-total-info">
                    <span className="date-card-date">{revertedDate}</span>
                    <span className="date-card-total right" onClick={() => this.handleCardClick()}>
                        { incomeSpan ? <span className="income">{incomeSpan}</span> : null }
                        { expenseSpan ? <span className="expense">{expenseSpan}</span> : null }
                        { totalSpan ? <span className="total">{totalSpan}</span> : null }
                    </span>
                </div>
                <div className="row">
                    <div className="date-card-records">{records}</div>
                </div>
            </div>
        )
    }
}


export default withRouter(DateRecords);