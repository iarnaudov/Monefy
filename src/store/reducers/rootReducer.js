import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import recordReducer from "./recordReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    monthlyRecords: recordReducer,
    category: categoryReducer,
});

export default rootReducer;