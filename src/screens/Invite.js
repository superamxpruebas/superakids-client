import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";
import FormInput from "../forms/FormInput";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { stringArrayToPRSelectObjects } from "../helpers/Functions";
import { AppLogoUrl, apiURL, apiVersion, passwordRulesMessageObject } from "../helpers/AppProps";
import { Messages } from "primereact/messages";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import {
	firstName,
	secondName,
	paternalSurname,
	maternalSurname,
	sex,
	email,
	newPassword,
	newPasswordConfirm
} from "../forms/Fields";

const therapistSignupValidationSchema = yup.object().shape({
	[firstName.name]: firstName.validation,
	[secondName.name]: secondName.validation,
	[paternalSurname.name]: paternalSurname.validation,
	[maternalSurname.name]: maternalSurname.validation,
	[sex.name]: sex.validation,
	[email.name]: email.validation,
	[newPassword.signupName]: newPassword.signupValidation,
	[newPasswordConfirm.signupName]: newPasswordConfirm.signupValidation
});

let therapistCreateInitialValues = {
	[email.name]: email.default,
	[firstName.name]: firstName.default,
	[secondName.name]: secondName.default,
	[paternalSurname.name]: paternalSurname.default,
	[maternalSurname.name]: maternalSurname.default,
	[newPassword.signupName]: newPassword.default,
	[newPasswordConfirm.signupName]: newPasswordConfirm.default,
	[sex.name]: sex.default
};

const Invite = ({ history, match }) => {
	const messageRef = useRef(null);
	const passwordMessage = useRef(null);

	const therapistLogin = useSelector((state) => state.therapistLogin);
	const { therapistInfo } = therapistLogin;

	// ui state
	const [submitLoading, setSubmitLoading] = useState(false);
	const [step, setStep] = useState("LOADING"); //LOADING, CONTINUE, ERROR, FORM, FINISH
	const sexOptionsUi = useRef(stringArrayToPRSelectObjects(["Hombre", "Mujer"])); //aqui despues

	const uuid = match.params.uuid ? match.params.uuid : "";

	useEffect(() => {
		axios
			.get(apiURL + apiVersion + "/access/invite/" + uuid)
			.then((response) => {
				therapistCreateInitialValues.email = response.data;
				setStep("CONTINUE");
			})
			.catch((error) => {
				console.log("useEffect - catch");
				setStep("ERROR");
				if (error.response) {
					messageRef.current.replace([
						{
							severity: error.response.data.severity,
							detail: error.response.data.message,
							sticky: true,
							closable: false
						}
					]);
				} else {
					messageRef.current.replace([
						{
							severity: "error",
							detail: "Ocurrió un error interno :(",
							sticky: true,
							closable: false
						}
					]);
				}
			});
	}, [uuid]);

	if (therapistInfo) {
		history.push("/");
		return <></>;
	}

	// methods

	const handleInviteSubmit = (form, onSubmitProps) => {
		setSubmitLoading(true);
		onSubmitProps.setSubmitting(true);
		axios
			.post(apiURL + apiVersion + "/access/invite/" + uuid, form, {
				headers: { "Content-Type": "application/json" }
			})
			.then((response) => {
				messageRef.current.replace([
					{
						severity: response.data.severity,
						detail: response.data.message,
						sticky: true,
						closable: false
					}
				]);
				onSubmitProps.setSubmitting(false);
				setSubmitLoading(false);
				setStep("FINISH");
			})
			.catch((error) => {
				console.log("handleInviteSubmit - catch");
				setStep("ERROR");
				if (error.response) {
					messageRef.current.replace([
						{
							severity: error.response.data.severity,
							detail: error.response.data.message,
							sticky: true,
							closable: false
						}
					]);
				} else {
					messageRef.current.replace([
						{
							severity: "error",
							detail: "Ocurrió un error tratando de crear cuenta.",
							sticky: true,
							closable: false
						}
					]);
				}
			});
	};

	const title = () => {
		switch (step) {
			case "LOADING":
				return "Cargando...";
			case "CONTINUE":
				return "¡Bienvenido a SuperaKids!";
			default:
				return "Creación de Cuenta";
		}
	};

	return (
		<div className={step === "FORM" ? "add-align-form" : "outer"}>
			<div className="inner">
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
				<h3 style={{ textAlign: "center" }}>{title()}</h3>
				<Messages ref={messageRef} />
				<hr />
				{step === "LOADING" && (
					<>
						<div className="center-spinner">
							<ProgressSpinner />
						</div>
					</>
				)}
				{step === "ERROR" && <></>}
				{step === "CONTINUE" && (
					<>
						<p>
							Antes de poder utilizar la plataforma es necesario que configure su
							cuenta.
						</p>
						<Button
							label="Continuar"
							icon="pi pi-arrow-right"
							iconPos="right"
							className="p-button p-mt-1 p-mb-1"
							type="button"
							onClick={(e) => {
								setStep("FORM");
								setTimeout(() => {
									passwordMessage.current.show(passwordRulesMessageObject);
								}, 1000);
							}}
						/>
					</>
				)}
				{step === "FORM" && (
					<>
						<Formik
							initialValues={therapistCreateInitialValues}
							validationSchema={therapistSignupValidationSchema}
							onSubmit={handleInviteSubmit}
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
										<div
											className="p-fluid p-formgrid p-grid"
											style={{ width: "100%", maxWidth: "100%" }}
										>
											<div className="p-col-12">
												<h6>Datos Personales y Credenciales</h6>
											</div>
											<div className="p-col-6">
												<FormInput
													inputName={firstName.name}
													labelText={firstName.label}
													placeholder={firstName.placeholder}
												/>
											</div>
											<div className="p-col-6">
												<FormInput
													inputName={secondName.name}
													labelText={secondName.label}
													placeholder={secondName.placeholder}
													optionalField
												/>
											</div>
											<div className="p-col-6">
												<FormInput
													inputName={paternalSurname.name}
													labelText={paternalSurname.label}
													placeholder={paternalSurname.placeholder}
												/>
											</div>
											<div className="p-col-6">
												<FormInput
													inputName={maternalSurname.name}
													labelText={maternalSurname.label}
													placeholder={maternalSurname.placeholder}
												/>
											</div>
											<div className="p-col-12">
												<div className="p-field">
													<label htmlFor={sex.name}>{sex.label}</label>
													<Dropdown
														name={sex.name}
														inputId={sex.name}
														value={values[sex.name]}
														options={sexOptionsUi.current}
														onChange={(e) => {
															setFieldValue(sex.name, e.target.value);
														}}
														placeholder={sex.placeholder}
													/>
													<small
														id={sex.name + "-error"}
														className="p-invalid"
													>
														{touched[sex.name] &&
															errors[sex.name] &&
															errors[sex.name]}
													</small>
												</div>
											</div>
											<div className="p-col-12">
												<FormInput
													inputName={email.name}
													labelText={email.label}
													placeholder={email.placeholder}
												/>
											</div>
											<div className="p-col-12">
												<div className={" p-mt-3 p-mb-3 "}>
													<Messages ref={passwordMessage} />
												</div>
											</div>
											<div className="p-col-12">
												<FormInput
													inputName={newPassword.signupName}
													labelText={newPassword.label}
													placeholder={newPassword.placeholder}
													type="password"
												/>
											</div>
											<div className="p-col-12">
												<FormInput
													inputName={newPasswordConfirm.signupName}
													labelText={newPasswordConfirm.label}
													placeholder={newPasswordConfirm.placeholder}
													type="password"
												/>
											</div>
											<div className="p-col-12 p-mt-3 p-mb-3">
												<Button
													label="Crear Cuenta"
													icon="pi pi-check"
													className="p-button"
													type="submit"
													disabled={
														isSubmitting || !isValid || submitLoading
													}
												/>
											</div>
											{submitLoading && (
												<div className="p-col-12 p-mt-1 p-mb-1">
													<ProgressBar
														mode="indeterminate"
														style={{ height: "6px" }}
													></ProgressBar>
												</div>
											)}
										</div>
									</Form>
								);
							}}
						</Formik>
					</>
				)}
				{step === "FINISH" && (
					<>
						<div
							className="p-fluid p-formgrid p-grid"
							style={{ width: "100%", maxWidth: "100%" }}
						>
							<div className="p-col-12 p-mt-3 p-mb-3">
								<Button
									label="Ir a Inicio de Sesión"
									className="p-button p-mt-1 p-mb-1"
									type="button"
									onClick={(e) => {
										history.push("/login");
									}}
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Invite;
