import React from "react";
import RecordsList from "../Record/RecordsList";
import YearMonthPicker from "../UI/YearMonthPicker";
import GraphCharts from "../UI/GraphCharts";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import { fetchRecords } from "../../store/actions/recordActions";

declare var M;

class Dashboard extends React.Component {

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.getMonthlyRecors()
            this.preselectCurrentMonthYear();
        }
    }

    getMonthlyRecors() {
        const currentMonth = this.pad(new Date().getMonth() + 1, 2);
        const currentYear = new Date().getFullYear();
        const monthYearString = currentYear + currentMonth;
        this.props.fetchRecords(this.props.isAuthenticated, monthYearString);
    }

    selectMonth(e) {
        $(".month-select").removeClass("selectedMonth");
        $(e.target).addClass("selectedMonth");
        this.updateDashboard();
    }

    selectYear(e) {
        $(".year-select").removeClass("selectedYear");
        $(e.target).addClass("selectedYear");
        this.updateDashboard();
    }

    updateDashboard() {
        const year = $(".selectedYear").text();
        const month = $(".selectedMonth").attr("data-month");
        const monthYearString = year + month;
        this.props.fetchRecords(this.props.isAuthenticated, monthYearString);
    }

    preselectCurrentMonthYear() {
        const currentDate = this.pad(new Date().getMonth() + 1, 2);
        const currentYear = new Date().getFullYear();
        $(`[data-year='${currentYear}']`).addClass("selectedYear");
        $(`[data-month='${currentDate}']`).addClass("selectedMonth");
    }

    pad(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    render() {
        const { isAuthenticated } = this.props;

        if (!isAuthenticated) {
            return <Redirect to="/login" />
        }

        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col s12 xl6">
                        <div className="input-field col s12 center-align datepickers-container">
                            <YearMonthPicker selectYear={(e) => this.selectYear(e)} selectMonth={(e) => this.selectMonth(e)} />
                        </div>
                        <RecordsList />
                    </div>
                    <GraphCharts />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.firebase.auth.uid,
        monthlyRecords: state.monthlyRecords,
    }
}

const mapDispatchToProps = (dispach) => {
    return {
        fetchRecords: (userId, monthYearString) => dispach(fetchRecords(userId, monthYearString))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard); 