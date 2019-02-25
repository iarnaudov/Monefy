import React from 'react'
import {addRecord} from "../../store/actions/recordActions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import $ from "jquery";

declare var M

class AddRecord extends React.Component {
    state = {
        category: "",
        title: "",
        total: "",
        date: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            "userId": this.props.isAuthenticated
        }, () => {
            this.props.addRecord(this.state);
        });
    }

    componentDidMount() {
        this.initializeDatePicker();
    }

    initializeDatePicker() {
        const options = {
            defaultDate: new Date(),
            setDefaultDate: true,
            autoClose: true,
            format: "dd/mm/yyyy"
        };

        M.Datepicker.init($(".datepicker"), options);
    }

    render() {
        const {isAuthenticated} = this.props;

        if (!isAuthenticated) {
            return <Redirect to="/login"/>
        }

        return (
            <div className="form-container">
                <form className="white" onSubmit={(e) => this.handleSubmit(e)}>
                    <h5 className="grey-text text-darken-3">Add Record</h5>
                    <div className="input-field">
                        <i className="material-icons prefix">chrome_reader_mode</i>
                        <label htmlFor="category">Category</label>
                        <input
                            type="text"
                            id="category"
                            className="validate"
                            onChange={(e) => this.handleChange(e)}/>

                    </div>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="validate"
                            onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="total">Total</label>
                        <input
                            type="text"
                            id="total"
                            pattern="\d+\.?\d{1,2}"
                            className="validate"
                            onChange={(e) => this.handleChange(e)}/>
                        <span
                            className="helper-text"
                            data-error="Please enter a valid number"></span>
                    </div>
                    <div className="input-field">
                        <label htmlFor="date">Date</label>
                        <input
                            type="text"
                            id="date"
                            className="datepicker validate"
                            onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Add Record</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {isAuthenticated: state.firebase.auth.uid}
}

const mapDispatchToProps = (dispach) => {
    return {
        addRecord: (record) => dispach(addRecord(record))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord)