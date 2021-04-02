import axios from "axios";
import {
	THERAPIST_LOGIN_REQUEST,
	THERAPIST_LOGIN_SUCCESS,
	THERAPIST_LOGIN_FAIL,
	THERAPIST_LOGOUT,
	THERAPIST_UPDATE_PROFILE_REQUEST,
	THERAPIST_UPDATE_PROFILE_SUCCESS,
	THERAPIST_UPDATE_PROFILE_FAIL
} from "../constants/therapistConstants";
import {
	apiURL,
	apiVersion,
	storageCode,
	therapistsEndpoint,
	severityTitles
} from "../helpers/AppProps";

export const login = (email, password, rememberMe, setSubmitting, errorMessage) => async (
	dispatch
) => {
	dispatch({
		type: THERAPIST_LOGIN_REQUEST
	});

	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	};

	try {
		await axios
			.post(apiURL + apiVersion + "/access/login", { email, password }, config)
			.then((response) => {
				if (rememberMe) {
					localStorage.setItem("rememberMe" + storageCode, email);
				} else {
					localStorage.removeItem("rememberMe" + storageCode);
				}

				sessionStorage.setItem(
					"therapistInfo" + storageCode,
					JSON.stringify(response.data.subBody)
				);

				dispatch({
					type: THERAPIST_LOGIN_SUCCESS,
					payload: response.data.subBody
				});
			})
			.catch((error) => {
				if (error.response.data) {
					errorMessage.current.replace([
						{
							severity: error.response.data.severity,
							summary: "",
							detail: error.response.data.message,
							sticky: true,
							closable: false
						}
					]);
				}
				dispatch({
					type: THERAPIST_LOGIN_FAIL,
					payload: {}
				});
			});
	} catch (error) {
		errorMessage.current.replace([
			{
				severity: "error",
				summary: "",
				detail: "Error iniciando sesión.",
				sticky: true,
				closable: false
			}
		]);
	}
	/* aqui despues
        const { validation } = await axios.post(
			apiURL + "/api/v1/utils/validation",
			{ email, password },
			config
		);*/
	//aqui despues, tambien ver fields
	//sessionStorage.setItem("validationUtils", JSON.stringify);

	setSubmitting(false);
};

export const logout = () => (dispatch) => {
	sessionStorage.setItem("logoutAction" + storageCode, "logoutAction");
	sessionStorage.removeItem("therapistInfo" + storageCode);
	sessionStorage.removeItem("users" + storageCode);
	document.location.href = "/login";
	//dispatch({ type: THERAPIST_LOGOUT }); aqui tenia esto pero se veia feo, asi que lo quite, comentado esta mejor
};

export const updateTherapistProfile = (form, id, closeModal, toastRef) => async (dispatch) => {
	dispatch({
		type: THERAPIST_UPDATE_PROFILE_REQUEST
	});

	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	};

	try {
		await axios
			.put(apiURL + apiVersion + therapistsEndpoint + "/" + id, form, config)
			.then((response) => {
				sessionStorage.setItem(
					"therapistInfo" + storageCode,
					JSON.stringify(response.data.subBody)
				);

				dispatch({
					type: THERAPIST_UPDATE_PROFILE_SUCCESS
				});
				dispatch({
					type: THERAPIST_LOGIN_SUCCESS,
					payload: response.data.subBody
				});

				closeModal();
				toastRef.current.clear();
				toastRef.current.show({
					severity: response.data.severity,
					summary: severityTitles[response.data.severity],
					detail: response.data.message,
					life: 4000,
					closable: true
				});
			})
			.catch((error) => {
				dispatch({
					type: THERAPIST_UPDATE_PROFILE_FAIL
				});
				if (error.response.status === 401) {
					dispatch(logout());
					return;
				}
			});
	} catch (error) {
		console.log(error, "updateTherapistProfile");
		dispatch({
			type: THERAPIST_UPDATE_PROFILE_FAIL
		});
		closeModal();
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error actualizando perfil.",
			sticky: true,
			closable: true
		});
	}
};
