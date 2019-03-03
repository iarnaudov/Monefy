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
        type: "",
        userId: "default"
    }

    colors = {
        default: "#545454",
        defaultBlue: "#3085d6"
    }

    handleChange(e) {
        const target = e.target.id || e.target.name
        this.setState({
            [target]: e.target.value
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

    componentDidUpdate() {
        console.log("updated")
        console.log(this.state)
    }

    setUserAuthentication() {
        const {isAuthenticated} = this.props;

        this.setState({
            ...this.state,
            userId: isAuthenticated
        })
    }

    openCategoryModal = () => {
        var self = this;
        Swal.fire({
            title: 'Multiple inputs',
            html: `<input type="color" id="color" class="browser-default" value="${this.state.color}">
                    </br>
                    </br>
                    <i class="fas fa-bed"></i>
                    <i class="far fa-sun"></i>
                    <i class="fas fa-paw"></i>
                    <i class="fas fa-gift"></i>
                    <i class="fas fa-umbrella-beach"></i>
                    </br>
                    <i class="fas fa-dog"></i>
                    <i class="fas fa-phone-volume"></i>
                    <i class="fas fa-car"></i>
                    <i class="fas fa-oil-can"></i>
                    <i class="fas fa-gas-pump"></i>
                    </br>
                    <i class="fas fa-home"></i>
                    <i class="fas fa-campground"></i>
                    <i class="far fa-address-book"></i>
                    <i class="fas fa-chart-line"></i>
                    <i class="fas fa-phone"></i>
                    </br>
                    <i class="fas fa-tag"></i>
                    <i class="fas fa-dove"></i>
                    <i class="fas fa-donate"></i>
                    <i class="fas fa-dollar-sign"></i>
                    <i class="far fa-heart"></i>
                    </br>
                    <i class="fas fa-plane-departure"></i>
                    <i class="fas fa-piggy-bank"></i>
                    <i class="fas fa-seedling"></i>
                    <i class="fas fa-hand-holding-usd"></i>
                    <i class="fas fa-globe"></i>
                    </br>
                    <i class="far fa-smile"></i>
                    <i class="far fa-keyboard"></i>
                    <i class="fas fa-user-secret"></i>
                    <i class="fas fa-shield-alt"></i>
                    <i class="fas fa-coffee"></i>
                    </br>
                    <i class="fas fa-apple-alt"></i>
                    <i class="far fa-credit-card"></i>
                    <i class="fas fa-ice-cream"></i>
                    <i class="fas fa-pizza-slice"></i>
                    <i class="fas fa-hamburger"></i>
                    </br>
                    </br>
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
                $("i").removeClass("selected");
                if(self.state.icon) {
                    $(`.${self.state.icon[0]}.${self.state.icon[1]}`).addClass("selected");
                    $(`.${self.state.icon[0]}.${self.state.icon[1]}`).css("color", this.state.color)
                }
            },
            preConfirm: () => {
                const selector = $("i.selected")
                if (selector.length > 0) {
                    const classes =  document.getElementsByClassName("selected")[0].className.split(" ").splice(0,2);
                    return classes;
                }
                return "";
            }
        }).then((value) => {
            if (value && value.value && value.value !== "") {
                console.log(value);
                $("#categoryIcon").removeClass();
                for (const className of value.value) {
                    $("#categoryIcon").addClass(className);
                }
                $("#categoryIcon").css("color", this.state.color)
                M.updateTextFields();

                this.setState({
                    "icon": value.value
                });
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
        $("i.selected").css("color", this.state.color);
        var self = this;
        $('i')
            .on("click", function () {
                $('i').removeClass("selected");
                $('i').css("color", self.colors.default);
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
                <div className="container">
                    <div className="row">
                        <h5 className="grey-text text-darken-3 center">Add Category</h5>
                    </div>
                    <div className="row">
                        <div className="col s2">
                            <i id="categoryIcon" className="far fa-check-circle" onClick={() => this.openCategoryModal()}></i>
                        </div>
                        <div className="col s10">
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
                    <div className="row">
                        <p className="radioButton">
                            <label>
                                <input name="type" type="radio" value="expense" onClick={(e) => this.handleChange(e)}/>
                                <span>Expenses</span>
                            </label>
                        </p>
                        <p className="radioButton">
                            <label>
                                <input name="type" type="radio" value="income" onClick={(e) => this.handleChange(e)}/>
                                <span>Income</span>
                            </label>
                        </p>
                    </div>
                </div>
                    <div className="row">
                        <button id="addCategoryBtn" className="btn pink lighten-1 col s5 offset-s3">Add Category</button>
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