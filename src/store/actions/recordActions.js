import {firebaseSnapshotToArray} from "../../utility";
import Swal from 'sweetalert2';

export const addRecord = (record, routerHistory) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("records").add(record);
        Swal.fire({
            title:"Successfully Created Item",
            type:"success",
        }).then(() => {
            routerHistory.push("/");
        })
    }
}

export const editRecord = (record, recordId, routerHistory) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("records")
        .doc(recordId)
        .set(record);     

        Swal.fire({
            title:"Successfully Edited Item",
            type:"success",
        }).then(() => {
            routerHistory.push("/");
        })
    }
}

export const deleteRecord = (recordId, routerHistory) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore.collection("records")
        .doc(recordId)
        .delete()
        .then(() => {
            //dispatch({type: "DELETE_RECORD"})
        })

        Swal.fire({
            title:"Successfully Deleted Item",
            type:"success",
        }).then(() => {
            routerHistory.push("/");
        })
    }
}

export const fetchRecords = (userId) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore
            .collection("records")
            .where("userId", "==", userId)
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