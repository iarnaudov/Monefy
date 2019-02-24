export const addCategory = (category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        firestore
            .collection("categories")
            .add(category)
            .then(() => {
                dispatch({type: "ADD_CATEGORY", category: category})
            })
            .catch((error) => {
                dispatch({type: "ADD_CATEGORY_ERROR", error})
            })
    }
}