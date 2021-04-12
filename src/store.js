import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	therapistListReducer,
	therapistLoginReducer,
	updateTherapistProfileReducer
} from "./reducers/therapistReducers";
import { userListReducer } from "./reducers/userReducers";
import { problemReducer } from "./reducers/problemReducers";
import { storageCode } from "./helpers/AppProps";

const reducer = combineReducers({
	therapistLogin: therapistLoginReducer,
	updateTherapistProfile: updateTherapistProfileReducer,
	problem: problemReducer,
	users: userListReducer,
	therapists: therapistListReducer
});

const therapistInfoFromStorage = sessionStorage.getItem("therapistInfo" + storageCode)
	? JSON.parse(sessionStorage.getItem("therapistInfo" + storageCode))
	: null;

const usersFromStorage = sessionStorage.getItem("users" + storageCode)
	? JSON.parse(sessionStorage.getItem("users" + storageCode))
	: [];

const therapistsFromStorage = sessionStorage.getItem("therapists" + storageCode)
	? JSON.parse(sessionStorage.getItem("therapists" + storageCode))
	: [];

const initialState = {
	therapistLogin: { therapistInfo: therapistInfoFromStorage },
	users: { users: usersFromStorage },
	therapists: { therapists: therapistsFromStorage }
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
