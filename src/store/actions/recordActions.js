import {firebaseSnapshotToArray} from "../../utility";

export const createRecord = (record) => {
    return (dispatch, getState) => {
        
        dispatch({
            type: "CREATE_RECORD",
            record: record
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