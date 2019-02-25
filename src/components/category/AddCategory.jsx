import React, {Component} from 'react'
import {addCategory} from "../../store/actions/categoryActions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Swal from 'sweetalert2'
import $ from 'jquery';

// @ts-ignore
declare var M

class AddCategory extends Component {
    state = {
        name: "",
        color: "#3085d6",
        icon: "",
        userId: "default"
    }

    colors = {
        default: "#545454",
        defaultBlue: "#3085d6"
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            console.log(this.state)
            this.addIconsEventListener();
        });
    }

    applyColorToIcon = (e) => {
        console.log(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        this
            .props
            .addCategory(this.state);
        document
            .getElementById("formId")
            .reset();
    }

    componentDidMount = async () => {
        M.AutoInit();
        this.setUserAuthentication();
        this.addIconsEventListener();
    }

    setUserAuthentication() {
        const {isAuthenticated} = this.props;

        this.setState({
            ...this.state,
            userId: isAuthenticated
        })
    }

    openCategoryModal = () => {
        Swal.fire({
            title: 'Multiple inputs',
            html: `<input type="color" id="color" class="browser-default" value="${this.colors.defaultBlue}">
                    </br>
                    </br>
                    <i class="far fa-angry"></i>
                    <i class="far fa-sun"></i>
                    `,
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor: this.colors.default,
            focusConfirm: false,
            onBeforeOpen: () => {
                this.addIconsEventListener();
                $("#color").on("input", (e) => {
                    this.handleChange(e);
                })
            },
            preConfirm: () => {
                const selector = $(".far.selected")
                if (selector.length > 0) {
                    return selector[0]
                        .outerHTML
                        .split("fa-")[1]
                        .split(" ")[0];
                }
                return "";
            }
        }).then((value) => {
            if (value && value.value && value.value !== "") {
                console.log(value);
                $("#categoryIcon").removeClass();
                $("#categoryIcon").addClass("far").addClass("fa-" + value.value);
                $("#categoryIcon").css("color", this.state.color)
                M.updateTextFields();
            } else {
                if (value.value === "") {
                    Swal.fire({title: 'Please choose category icon', type: 'info'}).then(() => {
                        this.openCategoryModal()
                    })
                }
            }
        })
    }

    addIconsEventListener() {
        $(".far.selected").css("color", this.state.color);
        var self = this;
        $('.far')
            .on("click", function () {
                $('.far').removeClass("selected");
                $('.far').css("color", self.colors.default);
                $(this).css("color", self.state.color);
                $(this).addClass("selected");
            });
    }

    enableEnterSubmit = () => {
        var input = document.getElementsByTagName("input");
        input.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                document
                    .getElementById("addCategoryBtn")
                    .click();
                document
                    .getElementById("formId")
                    .reset();
            }
        });
    }

    render() {
        const {isAuthenticated} = this.props;

        if (!isAuthenticated) {
            return <Redirect to="/login"/>
        }

        return (
            <div className="form-container">
                <form className="white" id="formId" onSubmit={(e) => this.handleSubmit(e)}>
                <div class="container">
                    <div class="row">
                        <h5 className="grey-text text-darken-3">Add Category</h5>
                    </div>
                    <div class="row">
                        <div class="col s2">
                            <i id="categoryIcon" className="far fa-check-circle" onClick={() => this.openCategoryModal()}></i>
                        </div>
                        <div class="col s10">
                            <div className="input-field">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="validate"
                                onChange={(e) => this.handleChange(e)}/>
                            </div>
                        </div>

                    </div>
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
    return {isAuthenticated: state.firebase.auth.uid}
}

const mapDispatchToProps = (dispach) => {
    return {
        addCategory: (state) => dispach(addCategory(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)