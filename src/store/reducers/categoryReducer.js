const initialState = {}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CATEGORY":
            console.log("Created category", action);
            return state;
        case "ADD_CATEGORY_ERROR":
            console.log("Create project error", action.error);
            return state;
        case "DELETE_CATEGORY":
            console.log("Deleted category");
            return state;
        case "DELETE_CATEGORY_ERROR":
            console.log("Create project error", action.error);
            return state;
        default:
            return state;
    }
}

export default categoryReducer;