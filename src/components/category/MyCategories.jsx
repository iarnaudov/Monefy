import React, { Component } from 'react'
import firebase from 'firebase/app';
import "firebase/firestore";
import { firebaseSnapshotToArray } from "../../utility";
import { connect } from "react-redux";
import Swal from 'sweetalert2';

export class MyCategories extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        this.getUserCategories();
    }

    openCategoryWindow(recordId) {
        Swal.fire({
            title: "Delete this category?",
            text: "This will delete all the records related to this category",
            type: "error",
            confirmButtonColor: "#3569e0",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            cancelButtonColor: "#d6042a",
            focusConfirm: false,
            showCancelButton: true,
        }).then((result) => {
            if(result.value) {
                // delete category and all of its occurencies
                console.log(recordId);
            }
        })
        
    }

    getUserCategories() {
        const firestore = firebase.firestore();
        firestore
            .collection("categories")
            .where("userId", "==", this.props.isAuthenticated)
            .get()
            .then((snapshot2) => {
                const userCategories = firebaseSnapshotToArray(snapshot2);
                this.setState({
                    categories: userCategories
                }, () => {
                    console.log(this.state);

                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (this.state.categories.length > 0) {
            return (
                <div className="category-container">
                    {
                        this.state.categories.map((category) => {
                            return <div className="row" key={category.id}>
                                        <div className="category-row">
                                            <div className="col s3">
                                                <i className={`${category.icon[0]} + " " + ${category.icon[1]}`} style={{ color: category.color }}></i>
                                            </div>
                                            <div className="col s8 category-title">{category.name}</div>
                                            <i className="fas fa-trash-alt right deleteCategory" onClick={() => this.openCategoryWindow(category.id)}></i>
                                        </div>
                                    </div>
                        })
                    }
                </div>
            )
        } else {
            return (
                <div>
                    <h5>No categories!</h5>
                </div>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.firebase.auth.uid,
    }
}

export default connect(mapStateToProps)(MyCategories)