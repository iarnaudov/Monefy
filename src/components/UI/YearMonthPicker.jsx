import React, { Component } from 'react'

export default class YearMonthPicker extends Component {

  render() {
    return (
        <div className="input-field col s12 center-align datepickers-container">
            <div className="year-picker row">
                <div className="year-select" data-year="2017" onClick={(e) => this.props.selectYear(e)}>2017</div>
                <div className="year-select" data-year="2018" onClick={(e) => this.props.selectYear(e)}>2018</div>
                <div className="year-select" data-year="2019" onClick={(e) => this.props.selectYear(e)}>2019</div>
                <div className="year-select" data-year="2020" onClick={(e) => this.props.selectYear(e)}>2020</div>
                <div className="year-select" data-year="2021" onClick={(e) => this.props.selectYear(e)}>2021</div>
            </div>
            <div className="month-picker row">
                <div className="month-select col s1" data-month="01" onClick={(e) => this.props.selectMonth(e)}>Jan</div>
                <div className="month-select col s1" data-month="02" onClick={(e) => this.props.selectMonth(e)}>Feb</div>
                <div className="month-select col s1" data-month="03" onClick={(e) => this.props.selectMonth(e)}>Mar</div>
                <div className="month-select col s1" data-month="04" onClick={(e) => this.props.selectMonth(e)}>Apr</div>
                <div className="month-select col s1" data-month="05" onClick={(e) => this.props.selectMonth(e)}>May</div>
                <div className="month-select col s1" data-month="06" onClick={(e) => this.props.selectMonth(e)}>Jun</div>
                <div className="month-select col s1" data-month="07" onClick={(e) => this.props.selectMonth(e)}>Jul</div>
                <div className="month-select col s1" data-month="08" onClick={(e) => this.props.selectMonth(e)}>Aug</div>
                <div className="month-select col s1" data-month="09" onClick={(e) => this.props.selectMonth(e)}>Sep</div>
                <div className="month-select col s1" data-month="10" onClick={(e) => this.props.selectMonth(e)}>Oct</div>
                <div className="month-select col s1" data-month="11" onClick={(e) => this.props.selectMonth(e)}>Nov</div>
                <div className="month-select col s1" data-month="12" onClick={(e) => this.props.selectMonth(e)}>Dec</div>
            </div>
        </div>
    )
  }
}
