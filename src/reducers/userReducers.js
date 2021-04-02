import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL } from "../constants/userConstants";

export const userListReducer = (state = { loadingUsers: false, users: [] }, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loadingUsers: true };
		case USER_LIST_SUCCESS:
			return { loadingUsers: false, users: action.payload };
		case USER_LIST_FAIL:
			return { loadingUsers: false, users: [] };
		default:
			return state;
	}
};
