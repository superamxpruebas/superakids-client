import React, { useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import FormInput from "../forms/FormInput";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppLogoUrl, storageCode, apiURL, apiVersion } from "../helpers/AppProps";
import { login } from "../actions/therapistActions";
import { Messages } from "primereact/messages";
import axios from "axios";

const Login = ({ history }) => {
	const errorMessage = useRef(null);

	const dispatch = useDispatch();
	const therapistLogin = useSelector((state) => state.therapistLogin);
	const { therapistInfo } = therapistLogin;

	if (therapistInfo) {
		history.push("/");
	}

	useEffect(() => {
		let doLogout = sessionStorage.getItem("logoutAction" + storageCode);
		if (doLogout) {
			axios
				.post(apiURL + apiVersion + "/access/logout", {}, { withCredentials: true })
				.then((response) => {
					errorMessage.current.replace([
						{
							severity: response.data.severity,
							detail: response.data.message,
							sticky: true,
							closable: false
						}
					]);
				})
				.catch((error) => {
					errorMessage.current.replace([
						{
							severity: error.response.data.severity || "error",
							detail: error.response.data.message || "Ocurrió un error interno :(",
							sticky: true,
							closable: false
						}
					]);
				});
			sessionStorage.removeItem("logoutAction" + storageCode);
		}
	}, []);

	//methods

	const handleLogin = ({ email, password, rememberMe }, props) => {
		if (errorMessage.current) errorMessage.current.clear();
		dispatch(login(email, password, rememberMe, props.setSubmitting, errorMessage));
	};

	const setInitialValues = () => {
		let storedCredentials = localStorage.getItem("rememberMe" + storageCode);
		if (storedCredentials) {
			return {
				email: storedCredentials,
				password: "",
				rememberMe: true
			};
		}
		return {
			email: "",
			password: "",
			rememberMe: false
		};
	};

	return (
		<div className="outer">
			<div className="inner">
				<Formik
					initialValues={setInitialValues()}
					validationSchema={yup.object().shape({
						email: yup
							.string()
							.default("")
							.required("La dirección de correo electrónico no puede estar vacía.")
							.email("Formato incorrecto de dirección de correo electrónico.")
							.max(
								50,
								"La dirección de correo electrónico no debe ser mayor a 50 caracteres."
							),
						password: yup
							.string()
							.default("")
							.required("La contraseña no puede estar vacía."),
						rememberMe: yup.boolean().default(false)
					})}
					onSubmit={handleLogin}
				>
					{(formik) => {
						const {
							values,
							isSubmitting,
							isValid,
							setFieldValue,
							touched,
							errors
						} = formik;
						return (
							<Form>
								<img
									alt="Logo"
									src={AppLogoUrl}
									style={{
										width: "50%",
										marginRight: "auto",
										marginLeft: "auto",
										display: "block",
										padding: "20px"
									}}
								></img>
								<h3>Iniciar Sesión</h3>
								<div
									className="p-fluid p-formgrid p-grid"
									style={{ width: "100%", maxWidth: "100%" }}
								>
									<div className="p-col-12">
										<Messages ref={errorMessage} />
										<hr />
									</div>
									<div className="p-col-12">
										<FormInput
											inputName="email"
											labelText="Correo Electrónico"
											placeholder="Correo Electrónico"
										/>
									</div>
									<div className="p-col-12">
										<FormInput
											inputName="password"
											labelText="Contraseña"
											placeholder="Contraseña"
											type="password"
										/>
									</div>
									<div className="p-col-12">
										<div className="p-field-checkbox">
											<Checkbox
												inputId="rememberMe"
												checked={values["rememberMe"]}
												onChange={(e) => {
													setFieldValue("rememberMe", e.checked);
												}}
											/>
											<label
												htmlFor="rememberMe"
												style={{ marginBottom: "0px" }}
											>
												Recordarme
											</label>
										</div>
									</div>
									<div className="p-col-12 p-mt-3 p-mb-3">
										<Button
											label={isSubmitting ? "Cargando..." : "Entrar"}
											className="p-button"
											type="submit"
											disabled={isSubmitting}
										/>
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default Login;
