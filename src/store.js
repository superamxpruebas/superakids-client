import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { therapistLoginReducer, updateTherapistProfileReducer } from "./reducers/therapistReducers";
import { userListReducer } from "./reducers/userReducers";
import { problemReducer } from "./reducers/problemReducers";
import { storageCode } from "./helpers/AppProps";

const reducer = combineReducers({
	therapistLogin: therapistLoginReducer,
	updateTherapistProfile: updateTherapistProfileReducer,
	problem: problemReducer,
	users: userListReducer
});

const therapistInfoFromStorage = sessionStorage.getItem("therapistInfo" + storageCode)
	? JSON.parse(sessionStorage.getItem("therapistInfo" + storageCode))
	: null;

const usersFromStorage = sessionStorage.getItem("users" + storageCode)
	? JSON.parse(sessionStorage.getItem("users" + storageCode))
	: [];

const initialState = {
	therapistLogin: { therapistInfo: therapistInfoFromStorage },
	users: { users: usersFromStorage }
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
