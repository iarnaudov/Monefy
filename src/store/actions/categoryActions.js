import Swal from "sweetalert2";

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