import React, {Component} from 'react'
import {addCategory} from "../../store/actions/categoryActions";
import {connect} from "react-redux";

// @ts-ignore
declare var M

class AddCategory extends Component {
    state = {
        categoryName: "",
        categoryColor: "",
        categoryIcon: "",
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
        return (
            <div className="form-container">
                <form className="white" id="formId" onSubmit={(e) => this.handleSubmit(e)}>
                    <h5 className="grey-text text-darken-3">Add Category</h5>
                    <div className="input-field">
                        <i className="material-icons prefix">chrome_reader_mode</i>
                        <label htmlFor="categoryName">Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            className="validate"
                            onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">chrome_reader_mode</i>
                        <label htmlFor="categoryIcon">Icon</label>
                        <input
                            type="text"
                            id="categoryIcon"
                            className="validate"
                            onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">chrome_reader_mode</i>
                        <label htmlFor="categoryColor">Color</label>
                        <input
                            type="text"
                            id="categoryColor"
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

const mapDispatchToProps = (dispach) => {
    return {
        addCategory: (state) => dispach(addCategory(state))
    }
}

export default connect(null, mapDispatchToProps)(AddCategory)