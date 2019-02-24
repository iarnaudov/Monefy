export const register = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth.signInWithEmailAndPassword({
            email: credentials.email,
            password: credentials.password
        }).then(() => {
            dispatch({ type: "LOGIN_SUCCESS"})
        }).catch((error) => {
            dispatch({ type: "LOGIN_ERROR", error})
        })
    }
}

export const login = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        console.log(firebase);
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
            dispatch({ type: "LOGIN_SUCCESS"})
        }).catch((error) => {
            dispatch({ type: "LOGIN_ERROR", error})
        })
    }
}

export const logout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        console.log(firebase);
        firebase.auth().signOut().then(() => {
            dispatch({ type: "LOGOUT_SUCCESS"})
        }).catch((error) => {
            dispatch({ type: "LOGOUT_ERROR", error})
        })
    }
}