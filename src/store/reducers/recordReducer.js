const initialState = {}

const recordReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_RECORD":
            console.log("Created record", action.record);
            break;
        case "FETCH_RECORDS":
            state = {
                ...state,
                monthlyRecords: action.monthlyRecords
            }
            break;
        case "FETCH_RECORDS_ERROR":
            state = {
                ...state,
                error: action.error
            }
            break;
        case "GET_USER_CATEGORIES":
            state = {
                ...state,
                userCategories: action.userCategories
            }
            console.log(state);
            break;
        case "GET_USER_CATEGORIES_ERROR":
            state = {
                ...state,
                error: action.error
            }
            break;     
        default:
            break;
    }
    return state;
}

export default recordReducer;