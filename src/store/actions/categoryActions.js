export const addCategory = (category) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const categoriesCollection = firestore.collection("categories");
        categoriesCollection
            .add(category)
            .then(() => {
                dispatch({type: "ADD_CATEGORY", category: category})
            })
            .catch((error) => {
                dispatch({type: "ADD_CATEGORY_ERROR", error})
            })
    }
}