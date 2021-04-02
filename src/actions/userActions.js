import axios from "axios";
import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL } from "../constants/userConstants";
import {
	apiURL,
	apiVersion,
	storageCode,
	usersEndpoint,
	severityTitles
} from "../helpers/AppProps";
import { addDateAndNotesObjectsTo, addDateAndNotesObjectsToOnly } from "../helpers/Functions";
import { logout } from "./therapistActions";

export const getUsersList = (therapistId, toastRef) => async (dispatch) => {
	dispatch({
		type: USER_LIST_REQUEST
	});

	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true,
		params: {
			therapistId: therapistId
		}
	};

	try {
		await axios
			.get(apiURL + apiVersion + usersEndpoint, config)
			.then((response) => {
				let users = addDateAndNotesObjectsTo(response.data.subBody);
				sessionStorage.setItem("users" + storageCode, JSON.stringify(users));
				dispatch({
					type: USER_LIST_SUCCESS,
					payload: users
				});
			})
			.catch((error) => {
				dispatch({
					type: USER_LIST_FAIL
				});
				if (error.response.status === 401) {
					dispatch(logout());
					return;
				}
			});
	} catch (error) {
		console.log(error, "getUsersList");
		dispatch({
			type: USER_LIST_FAIL
		});
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error obteniendo usuarios.",
			sticky: true,
			closable: true
		});
	}
};

export const createUser = (form, closeModal, toastRef, setSubmitting) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	};

	try {
		await axios
			.post(apiURL + apiVersion + usersEndpoint, form, config)
			.then((response) => {
				let tempUser = addDateAndNotesObjectsToOnly(response.data.subBody);
				let users = JSON.parse(sessionStorage.getItem("users" + storageCode));
				users.push(tempUser);
				sessionStorage.setItem("users" + storageCode, JSON.stringify(users));
				dispatch({
					type: USER_LIST_SUCCESS,
					payload: users
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
				if (error.response.status === 401) {
					dispatch(logout());
					return;
				}
			});
	} catch (error) {
		console.log(error, "createUser");
		setSubmitting(false);
		closeModal();
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error creando usuario.",
			sticky: true,
			closable: true
		});
	}
};

export const updateUser = (userId, form, closeModal, toastRef, setSubmitting) => async (
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
			.put(apiURL + apiVersion + usersEndpoint + "/" + userId, form, config)
			.then((response) => {
				let tempUser = addDateAndNotesObjectsToOnly(response.data.subBody);
				let users = JSON.parse(sessionStorage.getItem("users" + storageCode));
				const userIndex = users.map((user) => user.userId).indexOf(userId);
				users[userIndex] = tempUser;
				sessionStorage.setItem("users" + storageCode, JSON.stringify(users));
				dispatch({
					type: USER_LIST_SUCCESS,
					payload: users
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
				if (error.response.status === 401) {
					dispatch(logout());
					return;
				}
			});
	} catch (error) {
		console.log(error, "updateUser");
		setSubmitting(false);
		closeModal();
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error actualizando usuario.",
			sticky: true,
			closable: true
		});
	}
};

export const deleteUser = (userId, closeDeleteConfirm, toastRef) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	};

	try {
		await axios
			.delete(apiURL + apiVersion + usersEndpoint + "/" + userId, config)
			.then((response) => {
				let users = JSON.parse(sessionStorage.getItem("users" + storageCode));
				const userIndex = users.map((user) => user.userId).indexOf(userId);
				users.splice(userIndex, 1);
				sessionStorage.setItem("users" + storageCode, JSON.stringify(users));
				dispatch({
					type: USER_LIST_SUCCESS,
					payload: users
				});

				closeDeleteConfirm();
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
				if (error.response.status === 401) {
					dispatch(logout());
					return;
				}
			});
	} catch (error) {
		console.log(error, "deleteUser");
		closeDeleteConfirm();
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error eliminando usuario.",
			sticky: true,
			closable: true
		});
	}
};

export const patchUser = (
	userId,
	form,
	toastRef,
	setSubmitting,
	setLoading,
	setSelectedUser
) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	};

	try {
		await axios
			.patch(apiURL + apiVersion + usersEndpoint + "/" + userId, form, config)
			.then((response) => {
				let tempUser = addDateAndNotesObjectsToOnly(response.data.subBody);
				let users = JSON.parse(sessionStorage.getItem("users" + storageCode));
				const userIndex = users.map((user) => user.userId).indexOf(userId);
				users[userIndex] = tempUser;
				sessionStorage.setItem("users" + storageCode, JSON.stringify(users));
				dispatch({
					type: USER_LIST_SUCCESS,
					payload: users
				});

				setLoading(false);
				setSubmitting(false);
				setSelectedUser(tempUser);
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
				if (error.response.status === 401) {
					dispatch(logout());
					return;
				}
			});
	} catch (error) {
		console.log(error, "patchUser");
		setLoading(false);
		setSubmitting(false);
		toastRef.current.clear();
		toastRef.current.show({
			severity: "error",
			summary: severityTitles["error"],
			detail: "Error actualizando notas y fechas de usuario.",
			sticky: true,
			closable: true
		});
	}
};
