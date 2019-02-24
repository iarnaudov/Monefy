import React, {Component} from 'react'
import {addCategory} from "../../store/actions/categoryActions";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

// @ts-ignore
declare var M

class AddCategory extends Component {
    state = {
        name: "",
        color: "",
        icon: "",
        userId: "default"
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this
            .props
            .addCategory(this.state);
            document.getElementById("formId").reset();
    }

    componentDidMount = () => {
        M.AutoInit();
        const { isAuthenticated } = this.props; 
        
        this.setState({
            ...this.state,
            userId: isAuthenticated
        })
    }

    enableEnterSubmit = () => {
        var input = document.getElementsByTagName("input");
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document
                    .getElementById("addCategoryBtn")
                    .click();
                    document.getElementById("formId").reset();
            }
        });
    }

    render() {
        const { isAuthenticated } = this.props;

        if (!isAuthenticated) {
            return <Redirect to="/login" />
        }



        return (
            <div className="form-container">
                <form className="white" id="formId" onSubmit={(e) => this.handleSubmit(e)}>
                    <h5 className="grey-text text-darken-3">Add Category</h5>
                    <div className="input-field">
                        <i className="material-icons prefix">chrome_reader_mode</i>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="validate"
                            onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">chrome_reader_mode</i>
                        <label htmlFor="icon">Icon</label>
                        <input
                            type="text"
                            id="icon"
                            className="validate"
                            onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">chrome_reader_mode</i>
                        <label htmlFor="color">Color</label>
                        <input
                            type="text"
                            id="color"
                            className="validate"
                            onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <button id="addCategoryBtn" className="btn pink lighten-1">Add Category</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isAuthenticated: state.firebase.auth.uid }
}

const mapDispatchToProps = (dispach) => {
    return {
        addCategory: (state) => dispach(addCategory(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)