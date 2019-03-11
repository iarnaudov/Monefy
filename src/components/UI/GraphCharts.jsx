import React from 'react'
import { connect } from "react-redux";
import $ from "jquery";

declare var Chart;
declare var M;


class GraphCharts extends React.Component  {

    chartColors = {
        pink: 'rgba(255,99,132,1)',
        blue: 'rgba(54, 162, 235, 1)',
        yellow: 'rgba(255, 206, 86, 1)',
        lightBlue: 'rgba(75, 192, 192, 1)',
        violet: 'rgba(153, 102, 255, 1)',
        orange: 'rgba(255, 159, 64, 1)'
    }

    componentDidMount() {
        this.initializeTabs();
    }

    componentDidUpdate() {
        this.createCharts();
    }

    initializeTabs() {
        M.Tabs.init($('.tabs'), {});
    }

    createCharts() {
        const [ namesArray, colorsArray, totalArray, daysOfMonth, lineChartMapping ] = this.mapChartObjects()
        this.createPieChart(namesArray, colorsArray, totalArray);

        this.createLineChart(daysOfMonth, lineChartMapping);
    }

    mapChartObjects() {
        const monthlyRecords = this.props.monthlyRecords.monthlyRecords
        const monthlyExpenses = monthlyRecords.filter((record) => record.category.type === "expense");
        const daysOfMonth =  [
            '01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '30', "31"
        ]
        const lineChartMapping = {};
        
        const namesArray = [];
        const colorsArray = [];
        const totalArray = [];

        for (const expense of monthlyExpenses) {
            if (namesArray.indexOf(expense.category.name) === -1) {
                namesArray.push(expense.category.name);  
                colorsArray.push(expense.category.color);
                totalArray.push(+expense.total);
            } else {
                var index = namesArray.indexOf(expense.category.name);
                totalArray[index] += +expense.total;
            }

            const recordDay = expense.date.slice(6);

            if (daysOfMonth.indexOf(recordDay) > -1) {

                if (!lineChartMapping[recordDay]) {
                    lineChartMapping[recordDay] = 0;
                }

                lineChartMapping[recordDay] += +expense.total;
            }
        }
        
        for (const day of daysOfMonth) {
            if (!lineChartMapping[day]) {
                lineChartMapping[day] = 0;
            }
        }

        return [ namesArray, colorsArray, totalArray, daysOfMonth, lineChartMapping ]
    }


    createLineChart(daysOfMonth, lineChartMapping) {
        var ctx = document.getElementById("lineChart").getContext('2d');
        var config = {
            type: 'line',
            data: {
                labels: daysOfMonth,
                datasets: [{
                    label: 'Expenses',
                    backgroundColor: this.chartColors.pink,
                    borderColor: this.chartColors.pink,
                    data: Object.values(lineChartMapping),
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

        new Chart(ctx, config);

    }

    createPieChart(namesArray, colorsArray, totalArray) {

        var config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: totalArray,
                    backgroundColor: colorsArray,
                    label: 'Dataset 1'
                }],
                labels: namesArray
            },
            options: {
                responsive: true
            }
        };

        var ctx = document.getElementById('pieChart').getContext('2d');
        new Chart(ctx, config);
    }

    render() {
        return (
            <div className="col m12 l12 xl5 offset-xl1">
                    <ul className="tabs tabs-fixed-width">
                        <li className="tab col m3"><a className="active" href="#pieChartContainer">Pie Chart</a></li>
                        <li className="tab col m3"><a href="#lineChartContainer">Line Chart</a></li>
                    </ul>
                    <div id="pieChartContainer" className="col s12 m12 l12">
                        <canvas id="pieChart" width="300" height="300"></canvas>
                    </div>
                    <div id="lineChartContainer" className="col s12 m12 l12">
                        <canvas id="lineChart" width="300" height="300"></canvas>
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

export default connect(mapStateToProps)(GraphCharts); 
