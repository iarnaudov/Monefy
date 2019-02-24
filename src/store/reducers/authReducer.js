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
        case "REGISTER_SUCCESS":
            console.log("REGISTER_SUCCESS");
            return {
                ...state,
                authError: null
            }
        case "REGISTER_ERROR":
            console.log("REGISTER_ERROR");
            return {
                ...state,
                authError: action.error.message
            }
            case "PASSWORDS_DOES_NOT_MATCH": 
            return {
                ...state,
                authError: "Passwords does not match!"
            }
            case "GET_USER_PROFILE":
            return {
                ...state,
                userName: action.username.username
            }
        default:
            return state;

    }

}

export default authReducer;