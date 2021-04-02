import {
	THERAPIST_LOGIN_REQUEST,
	THERAPIST_LOGIN_SUCCESS,
	THERAPIST_LOGIN_FAIL,
	THERAPIST_LOGOUT,
	THERAPIST_UPDATE_PROFILE_REQUEST,
	THERAPIST_UPDATE_PROFILE_SUCCESS,
	THERAPIST_UPDATE_PROFILE_FAIL
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
