const initialState = {}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            console.log("LOGIN_ERROR");
            return {
                ...state,
                authError: "Login failed"
            }
        case "LOGIN_SUCCESS":
            console.log("LOGIN_SUCCESS");
            return {
                ...state,
                authError: null
            }
        case "LOGOUT_ERROR":
            console.log("LOGOUT_ERROR");
            return state;
        case "LOGOUT_SUCCESS":
            console.log("LOGOUT_SUCCESS");
            return state;
        default:
            return state;

    }

}

export default authReducer;