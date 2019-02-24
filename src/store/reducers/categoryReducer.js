const initialState = {
    categories: [
        {
            id: "1",
            name: "House",
            icon: "tohoo",
            color: "red",
            userId: "default"
        }, {
            id: "2",
            name: "Cat",
            icon: "gdfg",
            color: "red",
            userId: "default"
        }, {
            id: "3",
            name: "Car",
            icon: "gfg",
            color: "red",
            userId: "default"
        }
    ]
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CATEGORY":
            console.log("Created category", action);
            return state;
        case "ADD_CATEGORY_ERROR":
            console.log("Create project error", action.error);
            return state;
        default:
            return state;
    }
}

export default categoryReducer;