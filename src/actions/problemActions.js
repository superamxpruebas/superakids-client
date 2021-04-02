import axios from "axios";
import { PROBLEM_REQUEST, PROBLEM_SUCCESS, PROBLEM_FAIL } from "../constants/problemConstants";
import { apiURL, apiVersion, problemsEndpoint, severityTitles } from "../helpers/AppProps";
import { logout } from "./therapistActions";

export const problem = (form, closeModal, toastRef) => async (dispatch) => {
	dispatch({
		type: PROBLEM_REQUEST
	});

	const config = {
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true
	};

	try {
		await axios
			.post(apiURL + apiVersion + problemsEndpoint, form, config)
			.then((response) => {
				dispatch({
					type: PROBLEM_SUCCESS
				});

				closeModal();
				setTimeout(() => {
					toastRef.current.clear();
					toastRef.current.show({
						severity: response.data.severity,
						summary: severityTitles[response.data.severity],
						detail: response.data.message,
						life: 4000,
						closable: true
					});
				}, 500);
			})
			.catch((error) => {
				dispatch({
					type: PROBLEM_FAIL
				});
				if (error.response.status === 401) {
					dispatch(logout());
					return;
				}
			});
	} catch (error) {
		console.log(error, "problem");
		dispatch({
			type: PROBLEM_FAIL
		});
		closeModal();
		setTimeout(() => {
			toastRef.current.clear();
			toastRef.current.show({
				severity: "error",
				summary: severityTitles["error"],
				detail: "Error registrando problema.",
				life: 4000,
				closable: true
			});
		}, 500);
	}
};
