import React from "react";
import RecordsList from "../Record/RecordsList";
import YearMonthPicker from "../UI/YearMonthPicker";
import GraphCharts from "../UI/GraphCharts";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import { fetchRecords } from "../../store/actions/recordActions";

declare var Chart;
declare var M;

class Dashboard extends React.Component {

    chartColors = {
        pink:'rgba(255,99,132,1)',
        blue: 'rgba(54, 162, 235, 1)',
        yellow: 'rgba(255, 206, 86, 1)',
        lightBlue: 'rgba(75, 192, 192, 1)',
        violet: 'rgba(153, 102, 255, 1)',
        orange: 'rgba(255, 159, 64, 1)'
    }

    componentDidMount() {
        this.createCharts()
        this.initializeTabs();
        this.getMonthlyRecors()

        this.preselectCurrentMonthYear();
    }

    getMonthlyRecors() {
        const currentMonth = this.pad(new Date().getMonth() + 1,2);
        const currentYear = new Date().getFullYear();
        const monthYearString = currentYear + currentMonth;
        this.props.fetchRecords(this.props.isAuthenticated, monthYearString);
    }

    initializeMonthPicker() {
        const options = {
            selectMonths: true,
            selectYears: 5,
            yearRange:2 ,
            disable: [true],//disable days
            today: 'Today',
            format: 'mmmm  yyyy',


            onOpen: function() {
                $(".picker__nav--prev, .picker__nav--next").remove();
            },
            onSet: function( arg ){
                var selectedMonth = parseInt(arg.highlight[1]);
                var selectedYear = arg.highlight[0];
                var selectedDate = arg.highlight[2];
            }
        };

        M.Datepicker.init($(".datepicker"), options);
    }

    initializeTabs() {
        M.Tabs.init($('.tabs'), {});
    }

    createCharts() {
        this.createPieChart();
        this.createLineChart();
    }

    createLineChart() {
        var randomScalingFactor = function() {
			return Math.round(Math.random() * 100);
		};

        var ctx = document.getElementById("lineChart").getContext('2d');
		var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var config = {
			type: 'line',
			data: {
				labels: [
                    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                    '21', '22', '23', '24', '25', '26', '27', '28', '30', "31"
                ],
				datasets: [{
					label: 'Expenses',
					backgroundColor: this.chartColors.pink,
					borderColor: this.chartColors.pink,
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
					],
					fill: false,
				}
                ]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Daily expenses'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Day'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Expense'
						}
					}]
				}
			}
		};

        const lineChart = new Chart(ctx, config);
	
    }

    createPieChart() {
        var randomScalingFactor = function() {
			return Math.round(Math.random() * 100);
		};

		var config = {
			type: 'pie',
			data: {
				datasets: [{
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
					],
					backgroundColor: [
                        this.chartColors.pink,
                        this.chartColors.blue,
                        this.chartColors.yellow,
                        this.chartColors.lightBlue,
                        this.chartColors.violet,
                        this.chartColors.orange
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Red',
					'Blue',
					'Yellow',
					'Green',
					'Violet'
				]
			},
			options: {
				responsive: true
			}
		};

		var ctx = document.getElementById('pieChart').getContext('2d');
		new Chart(ctx, config);
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
        const month =  $(".selectedMonth").attr("data-month");
        const monthYearString = year + month;
        this.props.fetchRecords(this.props.isAuthenticated, monthYearString);
    }

    preselectCurrentMonthYear() {
        const currentDate = this.pad(new Date().getMonth() + 1,2);
        const currentYear = new Date().getFullYear();
        $(`[data-year='${currentYear}']`).addClass("selectedYear");
        $(`[data-month='${currentDate}']`).addClass("selectedMonth");
    }

    pad(num, size) {
        var s = num+"";
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
                    <div className="col s12 m6">
                         <div className="input-field col s12 center-align datepickers-container">
                           <YearMonthPicker selectYear={(e) => this.selectYear(e)} selectMonth={(e) => this.selectMonth(e)}/>
                        </div>
                        <RecordsList/>
                    </div>
                    <GraphCharts/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        isAuthenticated: state.firebase.auth.uid ,
        monthlyRecords : state.monthlyRecords,
    }
}

const mapDispatchToProps = (dispach) => {
    return {
        fetchRecords: (userId, monthYearString) => dispach(fetchRecords(userId, monthYearString))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard); 