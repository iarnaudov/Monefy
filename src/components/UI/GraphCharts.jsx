import React from 'react'

export default function GraphCharts() {
  return (
       <div className="col s12 m5 offset-m1">
            <ul className="tabs tabs-fixed-width">
                <li className="tab col s3"><a className="active" href="#pieChartContainer">Pie Chart</a></li>
                <li className="tab col s3"><a href="#lineChartContainer">Line Chart</a></li>
            </ul>
            <div id="pieChartContainer" className="col s12">
                <canvas id="pieChart" width="400" height="400"></canvas>
            </div>
            <div id="lineChartContainer" className="col s12">
                <canvas id="lineChart" width="800" height="600"></canvas>
            </div>
        </div>
  )
}
