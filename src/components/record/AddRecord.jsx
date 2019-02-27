import React from 'react'
import { addRecord } from "../../store/actions/recordActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import { firebaseSnapshotToArray } from "../../utility";
import firebase from 'firebase/app';
import "firebase/firestore"
import Swal from 'sweetalert2';

declare var M

class AddRecord extends React.Component {
    state = {
        category: "",
        title: "",
        total: "",
        date: "",
    }

    userCategories = "";
    iconIsChosen = false;
    totalFieldIsValid = () => /\d+\.?\d{0,2}/.test($("#total").val());

    colors = {
        default: "#545454",
        defaultBlue: "#3085d6"
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        }, () => {
            console.log(this.state)
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.totalFieldIsValid && this.iconIsChosen && $("#title").val() !== "") {
            this.setState({
                "userId": this.props.isAuthenticated
            }, () => {
                this.props.addRecord(this.state);
            });
        } else {
            Swal.fire("Please enter valid data.")
        }
    }

    componentDidMount() {
        this.initializeDatePicker();
        this.getUserCategories();
    }

    getUserCategories() {
        const firestore = firebase.firestore();
        firestore
            .collection("categories")
            .where("userId", "==", this.props.isAuthenticated)
            .get()
            .then((snapshot) => {
                this.userCategories = firebaseSnapshotToArray(snapshot);
            })
            .catch((error) => {
                console.log(firebaseSnapshotToArray(error))
            })
    }

    handleIconClick(e) {
        $('i').css('color', this.colors.default);
        $(e.target).css("color", $(e.target).attr("data-color"));
        $(e.target).addClass('selectedIcon');
    }

    openCategoryModal() {
        var content = "";
        for (let index = 1; index <= this.userCategories.length; index++) {
            const category = this.userCategories[index - 1];
            const currentIconClass = category.icon[0] + " " + category.icon[1];

            var icon = `<i class='${currentIconClass}' 
                            data-color=${category.color}
                            data-name=${category.name}
                            data-id=${category.id}
                            data-userId=${category.userId}>
                        </i>`
            content += `<div class="categoryIconContainer">
                            ${icon}
                            <div>
                                <span>${category.name}</span>
                            </div>
                        </div>`
            if (index % 5 === 0) {
                content += "</br>"
            }
        }

        Swal.fire({
            title: 'Please choose an icon',
            html: content,
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            cancelButtonColor: this.colors.default,
            focusConfirm: false,
            onBeforeOpen: () => {
                $('i').removeClass('selectedIcon');
                var icons = $('i');

                for (const icon of icons) {
                    if ($(icon).attr('class') === $("#categoryIcon").attr('class')) {
                        $(icon).css('color', $(icon).attr('data-color'))
                    }

                    $(icon).on('click', (e) => {
                        this.handleIconClick(e);
                    })
                }
            },
            preConfirm: () => {
                const selector = $("i.selectedIcon")
                if (selector.length > 0) {
                    const classes = document.getElementsByClassName("selectedIcon")[0].className.split(" ").splice(0, 2);
                    const color = $(".selectedIcon").attr("data-color");
                    const name = $(".selectedIcon").attr("data-name");
                    const id = $(".selectedIcon").attr("data-id");
                    const userId = $(".selectedIcon").attr("data-userId");

                    return { classes, color, name, id, userId };
                }
                return "";
            }
        }).then((result) => {
            if (result.value.classes && result.value.classes !== "") {
                console.log(result.value.classes);
                $('i').removeClass('selectedIcon');
                $("#categoryIcon").removeClass();
                for (const className of result.value.classes) {
                    $("#categoryIcon").addClass(className);
                }
                $("#categoryIcon").css("color", result.value.color)
                this.iconIsChosen = true;
                M.updateTextFields();
                this.setState({
                    ...this.state,
                    'category': {
                        icon: result.value.classes,
                        color: result.value.color,
                        name: result.value.name,
                        id: result.value.id,
                        userId: result.value.userId
                    },
                }, () => { console.log(this.state) })
            } else {
                if (result.value.classes === "") {
                    Swal.fire({ title: 'Please choose category icon', type: 'info' }).then(() => {
                        this.openCategoryModal()
                    })
                }
            }
        })
    }

    initializeDatePicker() {
        const options = {
            defaultDate: new Date(),
            setDefaultDate: true,
            autoClose: true,
            format: "dd/mm/yyyy"
        };

        M.Datepicker.init($(".datepicker"), options);
        $(".datepicker").on("change", () => {
            this.setState({
                ...this.state,
                'date': $(".datepicker").val()
            }, () => {
                console.log(this.state)
            })
        })
        $(".datepicker").change();
    }

    render() {
        const { isAuthenticated } = this.props;

        if (!isAuthenticated) {
            return <Redirect to="/login" />
        }

        return (
            <div className="form-container">
                <form className="white" onSubmit={(e) => this.handleSubmit(e)}>
                    <h5 className="grey-text text-darken-3 center">Add Record</h5>
                    <div className="row">
                        <div className="input-field col s12 offset-s5">
                            <i id="categoryIcon" className="far fa-check-circle" onClick={() => this.openCategoryModal()}></i>
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="date">Date</label>
                            <input
                                type="text"
                                id="date"
                                className="datepicker validate"
                                onChange={(e) => this.handleChange(e)} />
                        </div>

                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                className="validate"
                                onChange={(e) => this.handleChange(e)} />
                        </div>
                        <div className="input-field col s12">
                            <label htmlFor="total">Total</label>
                            <input
                                type="text"
                                id="total"
                                pattern="\d+\.?\d{0,2}"
                                className="validate"
                                onChange={(e) => this.handleChange(e)} />
                            <span
                                className="helper-text"
                                data-error="Please enter a valid number"></span>
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="row">
                            <button className="btn pink lighten-1 col s5 offset-s3">Add Record</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.firebase.auth.uid,
    }
}

const mapDispatchToProps = (dispach) => {
    return {
        addRecord: (record) => dispach(addRecord(record)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecord)