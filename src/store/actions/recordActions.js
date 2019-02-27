import {firebaseSnapshotToArray} from "../../utility";
import Swal from 'sweetalert2';

export const addRecord = (record) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("records").add(record);
        Swal.fire({
            title:"Successfully Created Item",
            type:"success",
        }).then(() => {
            window.location.reload();
        })
    }
}

export const fetchRecords = () => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore
            .collection("categories")
            .get()
            .then((snapshot) => {
                dispatch({type: "FETCH_RECORDS", records: firebaseSnapshotToArray(snapshot)})
            })
            .catch((error) => {
                dispatch({type: "FETCH_RECORDS_ERROR", error})
            })
    }
}

export const getUserCategories = (userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore
            .collection("categories")
            .where("userId", "==", userId)
            .get()
            .then((snapshot) => {
                dispatch({type: "GET_USER_CATEGORIES", userCategories: firebaseSnapshotToArray(snapshot)})
            })
            .catch((error) => {
                dispatch({type: "GET_USER_CATEGORIES_ERROR", error})
            })
    }
}