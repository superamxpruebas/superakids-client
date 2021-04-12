import axios from "axios";
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
import {
	apiURL,
	apiVersion,
	storageCode,
	therapistsEndpoint,
	severityTitles
} from "../helpers/AppProps";

import {
	addDateObjectsAndUsersTo,
	addDateObjectsAndUsersToOnly,
	addDateObjectsToOnly
} from "../helpers/Functions";

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
				if (error.response) {
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
	sessionStorage.removeItem("therapists" + storageCode);
	document.location.href = "/login";
	//dispatch({ type: THERAPIST_LOGOUT }); aqui tenia esto pero se veia feo, asi que lo quite, comentado esta mejor
};

export const updateTherapistProfile = (form, id, closeModal, toastRef, setSubmitting) => async (
	dispatch
) => {
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

				let therapists = sessionStorage.getItem("therapists" + storageCode);
				if (therapists) {
					therapists = JSON.parse(therapists);
					const therapistIndex = therapists
						.map((therapist) => therapist.therapistId)
						.indexOf(id);
					therapists[therapistIndex] = addDateObjectsToOnly(response.data.subBody);
					sessionStorage.setItem("therapists" + storageCode, JSON.stringify(therapists));
					dispatch({
						type: THERAPIST_LIST_SUCCESS,
						payload: therapists
					});
				}

				setSubmitting(false);
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
		setSubmitting(false);
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

export const getTherapistsList = (toastRef) => async (dispatch) => {
	dispatch({
		type: THERAPIST_LIST_REQUEST
	});

	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	};

	try {
		await axios
			.get(apiURL + apiVersion + therapistsEndpoint, config)
			.then((response) => {
				let therapists = addDateObjectsAndUsersTo(response.data.subBody);
				sessionStorage.setItem("therapists" + storageCode, JSON.stringify(therapists));
				dispatch({
					type: THERAPIST_LIST_SUCCESS,
					payload: therapists
				});
			})
			.catch((error) => {
				dispatch({
					type: THERAPIST_LIST_FAIL
				});
				if (error.response.status === 401) {
					dispatch(logout());
					return;
				}
			});
	} catch (error) {
		console.log(error, "getTherapistsList");
		dispatch({
			type: THERAPIST_LIST_FAIL
		});
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error obteniendo terapeutas.",
			sticky: true,
			closable: true
		});
	}
};

export const createTherapists = (form, closeModal, toastRef, setSubmitting) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	};

	try {
		await axios
			.post(apiURL + apiVersion + therapistsEndpoint, form, config)
			.then((response) => {
				let newTherapists = addDateObjectsAndUsersTo(response.data.subBody.newTherapists);
				let therapists = JSON.parse(sessionStorage.getItem("therapists" + storageCode));

				newTherapists.forEach((newTherpist) => {
					therapists.push(newTherpist);
				});
				sessionStorage.setItem("therapists" + storageCode, JSON.stringify(therapists));
				dispatch({
					type: THERAPIST_LIST_SUCCESS,
					payload: therapists
				});

				setSubmitting(false);
				closeModal();
				toastRef.current.clear();

				let newAccounts = response.data.subBody.new;
				let accounts = newAccounts.map((email) => email + ", ");
				accounts = accounts.substring(0, accounts.length - 3) + ".";
				if ((response.data.severity = "many")) {
					toastRef.current.show({
						severity: "info",
						summary: severityTitles["info"],
						detail: response.data.message + " " + accounts,
						life: 4000,
						closable: true
					});
				} else {
					if ((response.data.severity = "success")) {
						toastRef.current.show([
							{
								severity: response.data.severity,
								summary: severityTitles[response.data.severity],
								detail: response.data.message,
								life: 4000,
								closable: true
							},
							{
								severity: "info",
								summary: severityTitles["info"],
								detail: "Cuentas nuevas: " + accounts,
								life: 4000,
								closable: true
							}
						]);
					} else {
						toastRef.current.show({
							severity: response.data.severity,
							summary: severityTitles[response.data.severity],
							detail: response.data.message,
							life: 4000,
							closable: true
						});
					}
				}
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 401) {
						dispatch(logout());
						return;
					}
					if (error.response.data) {
						console.log("createTherapists - catch");
						console.log(error);
						console.log(error.response);
						setSubmitting(false);
						closeModal();
						toastRef.current.clear();
						toastRef.current.show({
							severity: error.response.data.severity,
							summary: severityTitles[error.response.data.severity],
							detail: error.response.data.message,
							life: 4000,
							closable: true
						});
					}
				}
			});
	} catch (error) {
		console.log(error, "createTherapists");
		setSubmitting(false);
		closeModal();
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error creando Terapeutas.",
			sticky: true,
			closable: true
		});
	}
};

export const deleteTherapist = (
	therapistId,
	newTherapistId,
	newTherapistsList,
	closeModal,
	toastRef
) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true,
		params: {
			newTherapistId: newTherapistId
		}
	};

	try {
		await axios
			.delete(apiURL + apiVersion + therapistsEndpoint + "/" + therapistId, config)
			.then((response) => {
				sessionStorage.setItem(
					"therapists" + storageCode,
					JSON.stringify(newTherapistsList)
				);
				dispatch({
					type: THERAPIST_LIST_SUCCESS,
					payload: newTherapistsList
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
				if (error.response) {
					if (error.response.status === 401) {
						dispatch(logout());
						return;
					}
				}
			});
	} catch (error) {
		console.log(error, "deleteTherapist");
		closeModal();
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error eliminando Terapeuta.",
			sticky: true,
			closable: true
		});
	}
};

export const updateTherapist = (form, id, closeModal, toastRef, setSubmitting) => async (
	dispatch
) => {
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
				let therapists = JSON.parse(sessionStorage.getItem("therapists" + storageCode));
				const therapistIndex = therapists
					.map((therapist) => therapist.therapistId)
					.indexOf(id);
				let oldTherapist = therapists[therapistIndex];
				let users = [];
				if (oldTherapist.users > 0) {
					users = [...oldTherapist.users];
				}
				let updatedTherapist = addDateObjectsToOnly(response.data.subBody);
				updatedTherapist.users = users;
				therapists[therapistIndex] = updatedTherapist;

				sessionStorage.setItem("therapists" + storageCode, JSON.stringify(therapists));
				dispatch({
					type: THERAPIST_LIST_SUCCESS,
					payload: therapists
				});

				setSubmitting(false);
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
				if (error.response) {
					if (error.response.status === 401) {
						dispatch(logout());
						return;
					}
					if (error.response.data) {
						setSubmitting(false);
						closeModal();
						toastRef.current.clear();
						toastRef.current.show({
							severity: error.response.data.severity,
							summary: severityTitles[error.response.data.severity],
							detail: error.response.data.message,
							life: 4000,
							closable: true
						});
					}
				}
			});
	} catch (error) {
		console.log(error, "updateTherapist");
		setSubmitting(false);
		closeModal();
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error actualizando Terapeuta.",
			sticky: true,
			closable: true
		});
	}
};
