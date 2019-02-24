import {firebaseSnapshotToArray} from "../../utility";

export const addRecord = (record) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore
            .collection("categories")
            .where("name", "==", record.category)
            .limit(1)
            .get()
            .then((snapshot) => {
                const items = firebaseSnapshotToArray(snapshot);
                if (items.length > 0) {
                    record.category = firebaseSnapshotToArray(snapshot)[0]
                } else {
                    record.category = ""
                }

                firestore
                    .collection("records")
                    .add(record)
                    .then(() => {
                        dispatch({type: "ADD_RECORD", record: record})
                    })
                    .catch((error) => {
                        dispatch({type: "ADD_RECORD_ERROR", error})
                    });
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