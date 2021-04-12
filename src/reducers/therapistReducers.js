import {
	THERAPIST_LOGIN_REQUEST,
	THERAPIST_LOGIN_SUCCESS,
	THERAPIST_LOGIN_FAIL,
	THERAPIST_LOGOUT,
	THERAPIST_UPDATE_PROFILE_REQUEST,
	THERAPIST_UPDATE_PROFILE_SUCCESS,
	THERAPIST_UPDATE_PROFILE_FAIL,
	THERAPIST_LIST_REQUEST,
	THERAPIST_LIST_SUCCESS,
	THERAPIST_LIST_FAIL
} from "../constants/therapistConstants";

export const therapistLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case THERAPIST_LOGIN_REQUEST:
			return { loading: true };
		case THERAPIST_LOGIN_SUCCESS:
			return { loading: false, therapistInfo: action.payload };
		case THERAPIST_LOGIN_FAIL:
			return { loading: false };
		case THERAPIST_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const updateTherapistProfileReducer = (state = { loading: false }, action) => {
	switch (action.type) {
		case THERAPIST_UPDATE_PROFILE_REQUEST:
			return { loading: true };
		case THERAPIST_UPDATE_PROFILE_SUCCESS:
			return { loading: false };
		case THERAPIST_UPDATE_PROFILE_FAIL:
			return { loading: false };
		default:
			return state;
	}
};

export const therapistListReducer = (
	state = { loadingTherapists: false, therapists: [] },
	action
) => {
	switch (action.type) {
		case THERAPIST_LIST_REQUEST:
			return { loadingTherapists: true };
		case THERAPIST_LIST_SUCCESS:
			return { loadingTherapists: false, therapists: action.payload };
		case THERAPIST_LIST_FAIL:
			return { loadingTherapists: false, therapists: [] };
		default:
			return state;
	}
};
