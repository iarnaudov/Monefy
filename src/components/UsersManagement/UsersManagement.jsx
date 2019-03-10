import React, { Component } from 'react'
import { firebaseSnapshotToArray } from "../../utility";
import firebase from 'firebase/app';
import "firebase/firestore"
import $ from "jquery";

export default class UsersManagement extends Component {

    state = {};

    componentDidMount() {
        this.getUsersData()
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    blockUser(e) {
        const currentUser = $(e.target).closest(".row").find(".user-title").text();
        const prevState = this.state;

        prevState.users.forEach((user) => {
            if (user.username === currentUser) {
                user.blocked = true;
                this.manageUserAccess(user);
            }
        });

        this.setState({
            ...prevState,
        })

    }

    unBlockUser(e) {
        const currentUser = $(e.target).closest(".row").find(".user-title").text();
        const prevState = this.state;

        prevState.users.forEach((user) => {
            if (user.username === currentUser) {
                user.blocked = false;
                this.manageUserAccess(user);
            }
        });

        this.setState({
            ...prevState,
        })

    }

    manageUserAccess(user) {
        const firestore = firebase.firestore();
        firestore
            .collection("users")
            .doc(user.id)
            .set({...user, "blocked": user.blocked})
    }

    getUsersData() {
        const firestore = firebase.firestore();
        firestore
            .collection("users")
            .get()
            .then((snapshot) => {
                const users = firebaseSnapshotToArray(snapshot)
                this.setState({ users })
            });
    }

    render() {
        let result = null;
        if (this.state.users) {
            result = this.state.users.map((user) => {
                if (user.username === "Admin") {
                    return null;
                }

                return <div className="row" key={user.username}>
                    <div className="col s3 offset-s2 user-title">{user.username}</div>
                    <div className="col s3">

                        {
                            user.blocked
                                ? <i className="fas fa-user-alt-slash right"></i>
                                : <i className="fas fa-user-check right"></i>
                        }
                    </div>
                    <div className="col s3">
                        {
                            user.blocked
                                ? <span className="btn blue lighten-1" onClick={(e) => this.unBlockUser(e)}>Unblock</span>
                                : <span className="btn blue lighten-1" onClick={(e) => this.blockUser(e)}>Block</span>
                        }
                    </div>
                </div>
            })
        }

        return (
            <div className="users-container">
                {result}
            </div>
        )
    }
}
