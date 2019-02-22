import React, {Component} from 'react'

// @ts-ignore
declare var M

class AddCategory extends Component {
    state = {}

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    componentDidMount = () => {
        M.AutoInit();
    }

    render() {
        const styles = {
            margin: {
                marginLeft: "15px"
            }

        };

        return (
            <div className="form-container">
                <form className="white" onSubmit={(e) => this.handleSubmit(e)}>
                    <h5 className="grey-text text-darken-3">Add Category</h5>
                    <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

                    <div id="modal1" className="modal">
                        <div className="modal-content">
                            <h4>Modal Header</h4>
                            <p><i className="material-icons" onClick={() => console.log("da")}>email</i></p>
                        </div>
                        <div className="modal-footer">
                            <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                        </div>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">chrome_reader_mode</i>
                        <label htmlFor="categoryName">Name</label>
                        <input
                            type="text"
                            id="categoryName"
                            className="validate"
                            onChange={(e) => this.handleChange(e)}/>
                        <span
                            className="helper-text"
                            data-error="Please enter valid email address"
                            data-success="right"></span>
                    </div>
                    <label>Category Type</label>
                    <div className="input-field">
                        <p className="radioButton">
                            <label>
                                <input name="categoryGroup" type="radio"/>
                                <span>Expense</span>
                            </label>
                        </p>
                        <p className="radioButton" style={styles.margin}>
                            <label>
                                <input name="categoryGroup" type="radio"/>
                                <span>Income</span>
                            </label>
                        </p>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Add Category</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddCategory
