import React from 'react'
import { addRecord, editRecord, deleteRecord } from "../../store/actions/recordActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import { firebaseSnapshotToArray } from "../../utility";
import firebase from 'firebase/app';
import "firebase/firestore"
import Swal from 'sweetalert2';


declare var M

class RecordsForm extends React.Component {
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
                if (!this.props.history.location.search) {
                    this.props.addRecord(this.state, this.props.history);
                } else {
                    this.props.editRecord(this.state, this.props.history.location.search.slice(1), this.props.history);
                }
            });
        } else {
            Swal.fire("Please enter valid data.")
        }
    }

    componentDidMount() {
        this.getUserCategories();
        this.prefillData();
    }

    prefillData() {
        if (this.props.history.location.search) {
            this.setEditFormFunctionalities();
        } else {
            this.initializeDatePicker();
            $(".deleteRecord").hide();
        }
    }

    setEditFormFunctionalities() {
        let searchQuery = this.props.history.location.search;
        searchQuery = searchQuery.slice(1);
        const firestore = firebase.firestore();
        firestore
            .collection("records")
            .doc(searchQuery)
            .get()
            .then((snapshot) => {
                const recordData = snapshot.data();
                $("#title").val(recordData.title);
                $("#total").val(recordData.total);
                $("#categoryIcon").removeClass().addClass(recordData.category.icon[0]).addClass(recordData.category.icon[1])
                $("#categoryIcon").css("color", recordData.category.color);
                $(".input-field").find("button.btn").text("Edit Record")
                $("h5.grey-text").text("Edit Record");
                this.iconIsChosen = true;
                const year = +recordData.date.slice(0, 4);
                const month = +recordData.date.slice(4, 6) - 1;
                const day = +recordData.date.slice(6, 8);

                const options = {
                    defaultDate: new Date(year, month, day),
                    setDefaultDate: true,
                    autoClose: true,
                    format: "dd/mm/yyyy"
                };

                var elems = document.querySelector('.datepicker');
                M.Datepicker.init(elems, options);
                this.addDatePickerEventListener();
                M.updateTextFields();
                this.enableDeleteBtn();
                this.setState(recordData)
            });
    }

    enableDeleteBtn() {
        $(".deleteRecord").show();
        $(".deleteRecord").on("click", () => {
            Swal.fire({
                title:"You are about to delete this record",
                text:"Are you sure?", 
                type:"warning",
                confirmButtonColor: "#3569e0",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                cancelButtonColor: "#d6042a",
                focusConfirm: false,
                showCancelButton: true,
            }).then(result => {
                if(result.value) {
                    this.props.deleteRecord(this.props.history.location.search.slice(1), this.props.history);
                }
                
            });
        })
    }

    getUserCategories() {
        const firestore = firebase.firestore();
        firestore
            .collection("categories")
            .where("userId", "==", "XAyM0ZKRtbPmw89GHj9RpFbQTZo2")
            .get()
            .then((snapshot) => {
                const result = firebaseSnapshotToArray(snapshot);

                firestore
                    .collection("categories")
                    .where("userId", "==", this.props.isAuthenticated)
                    .get()
                    .then((snapshot2) => {
                        this.userCategories = result.concat(firebaseSnapshotToArray(snapshot2));
                    })
                    .catch((error) => {
                        console.log(firebaseSnapshotToArray(error))
                    });
            })
            .catch((error) => {
                console.log(firebaseSnapshotToArray(error))
            });


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
                            data-userId=${category.userId}
                            data-categoryType=${category.type}>
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
                    return this.getFormData();
                }
                return "";
            }
        }).then((result) => {
            if (result && result.value && result.value.classes && result.value.classes !== "") {
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
                        type: result.value.type,
                        userId: result.value.userId
                    },
                }, () => { console.log(this.state) })
            } else {
                if (result && result.value && result.value.classes === "") {
                    Swal.fire({ title: 'Please choose category icon', type: 'info' }).then(() => {
                        this.openCategoryModal()
                    })
                }
            }
        })
    }

    getFormData() {
        const classes = document.getElementsByClassName("selectedIcon")[0].className.split(" ").splice(0, 2);
        const color = $(".selectedIcon").attr("data-color");
        const name = $(".selectedIcon").attr("data-name");
        const id = $(".selectedIcon").attr("data-id");
        const userId = $(".selectedIcon").attr("data-userId");
        const type = $(".selectedIcon").attr("data-categoryType");
        return { classes, color, name, id, userId, type };
    }

    initializeDatePicker() {
        const options = {
            defaultDate: new Date(),
            setDefaultDate: true,
            autoClose: true,
            format: "dd/mm/yyyy"
        };

        M.Datepicker.init($(".datepicker"), options);
        this.addDatePickerEventListener();
        $(".datepicker").change();
    }

    addDatePickerEventListener() {
        $(".datepicker").on("change", () => {
            this.setState({
                ...this.state,
                'date': this.concatenateDate($(".datepicker").val())
            }, () => {
                console.log(this.state)
            })
        })
    }

    concatenateDate(date) {
        var params = date.split("/")
        var day = params[0];
        var month = params[1];
        var year = params[2];
        return year + "" + month + "" + day;
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
                    <i className="fas fa-trash-alt right deleteRecord"></i>
                    <div className="row">
                        <div className="input-field col s12 offset-s5">
                            <i id="categoryIcon" className="far fa-question-circle" onClick={() => this.openCategoryModal()}></i>
                        </div>
                    </div>
                    <div className="row">
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
                                maxlength="50"
                                className="validate"
                                onChange={(e) => this.handleChange(e)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <label htmlFor="total">Total</label>
                            <input
                                type="text"
                                id="total"
                                pattern="\d+\.?\d{0,2}"
                                maxlength="10"
                                className="validate"
                                onChange={(e) => this.handleChange(e)} />
                            <span
                                className="helper-text"
                                data-error="Please enter a valid number"></span>
                        </div>
                    </div>
                    <div className="input-field">
                        <div className="row">
                            <button className="btn blue lighten-1 col s5 offset-s3">Add Record</button>
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
        addRecord: (record, routerHistory) => dispach(addRecord(record, routerHistory)),
        editRecord: (record, recordId, routerHistory) => dispach(editRecord(record, recordId, routerHistory)),
        deleteRecord: (recordId, routerHistory) => dispach(deleteRecord(recordId, routerHistory)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsForm)