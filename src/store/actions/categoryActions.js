import Swal from "sweetalert2";
import {firebaseSnapshotToArray} from "../../utility";

export const addCategory = (category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore
            .collection("categories")
            .add(category)
            .then(() => {
                dispatch({type: "ADD_CATEGORY", category: category})
                Swal.fire({
                    title:"Successfully Created Category",
                    type:"success",
                }).then(() => {
                    //window.location.reload();
                })
            })
            .catch((error) => {
                dispatch({type: "ADD_CATEGORY_ERROR", error})
                Swal.fire({
                    title:"Error creating category",
                    type:"error",
                })
            })
    }
}

export const deleteCategory = (categoryId) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        await firestore.collection("categories").doc(categoryId).delete();
        const snapshot = await firestore.collection("records").get()
        const records = firebaseSnapshotToArray(snapshot).filter((record) => record.category.id === categoryId);

        for (const record of records) {
            await firestore.collection("records").doc(record.id).delete();
        }

        dispatch({type: "DELETE_CATEGORY"})
        Swal.fire({
            title:"Successfully Deleted Category",
            type:"success",
        }).then(() => {
            //window.location.reload();
        }).catch((error) => {
            dispatch({type: "DELETE_CATEGORY", error})
            Swal.fire({
                title:"Error deleting category",
                type:"error",
            })
        })
    }
}