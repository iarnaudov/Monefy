import React from 'react'
import {createRecord} from "../../store/actions/recordActions";
import {connect} from "react-redux";

class AddRecord extends React.Component {
    state = {
        recordName: "",
        content: ""
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addRecord(this.state);
    }

    render() {
        return (
            <div className="form-container">
                <form className="white" onSubmit={(e) => this.handleSubmit(e)}>
                    <h5 className="grey-text text-darken-3">Add Record</h5>
                    <div className="input-field">
                        <i className="material-icons prefix">chrome_reader_mode</i>
                        <label htmlFor="recordName">Name</label>
                        <input
                            type="text"
                            id="recordName"
                            className="validate"
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

const mapDispatchToProps = (dispach) => {
    return {
        addRecord: (record) => dispach(createRecord(record))
    }
}

export default connect(null, mapDispatchToProps)(AddRecord)
