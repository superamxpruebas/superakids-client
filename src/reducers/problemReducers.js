import { PROBLEM_REQUEST, PROBLEM_SUCCESS, PROBLEM_FAIL } from "../constants/problemConstants";

export const problemReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case PROBLEM_REQUEST:
			return { loading: true };
		case PROBLEM_SUCCESS:
			return { loading: false };
		case PROBLEM_FAIL:
			return { loading: false };
		default:
			return state;
	}
};
