import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Messages } from "primereact/messages";
import { ProgressBar } from "primereact/progressbar";
import { Formik, Form } from "formik";
import {
	firstName,
	secondName,
	paternalSurname,
	maternalSurname,
	sex,
	email,
	updatePasswordBool,
	oldPassword,
	newPassword,
	newPasswordConfirm,
	accountState,
	updateRolesBool,
	roleIds
} from "../forms/Fields";
import * as yup from "yup";
import FormInput from "../forms/FormInput";
import ImageUploader from "./ImageUploader";
import { dateTimeToString, parseDateTime } from "../helpers/Functions";
import { passwordRulesMessageObject, imagePreviewTitleTherapists } from "../helpers/AppProps";
import TherapistRoles from "./TherapistRoles";
import { updateTherapistProfile, updateTherapist } from "../actions/therapistActions";
import { useDispatch } from "react-redux";

//from data

const therapistUpdateValidationSchema = yup.object().shape({
	[firstName.name]: firstName.validation,
	[secondName.name]: secondName.validation,
	[paternalSurname.name]: paternalSurname.validation,
	[maternalSurname.name]: maternalSurname.validation,
	[sex.name]: sex.validation,
	[email.name]: email.validation,
	[updatePasswordBool.name]: updatePasswordBool.validation,
	[oldPassword.name]: oldPassword.validation,
	[newPassword.name]: newPassword.validation,
	[newPasswordConfirm.name]: newPasswordConfirm.validation,
	[updateRolesBool.name]: updateRolesBool.validation
});

const TherapistForm = (props) => {
	const {
		therapistAction, //DETAILS, UPDATE, CREATE
		usingTherapist,
		selectedTherapist,
		customModalButtonText,
		setShowModal,
		toastRef,
		therapistInfo,
		fromProfile,
		sexOptionsUi,
		setSelectedTherapist
	} = props;

	const passwordMessage = useRef(null);
	const accountStateMessageRef = useRef(null);
	const adminMessageRef = useRef(null);

	const [loading, setLoading] = useState(false);
	const [adminButtonDisable, setAdminButtonDisable] = useState(false);
	const [deactivateButtonDisable, setDeactivateButtonDisable] = useState(false);

	const dispatch = useDispatch();

	const isSelf = therapistInfo.therapistId === usingTherapist.therapistId;
	const disabled = therapistAction === "DETAILS";

	// methods

	const initialValues = () => {
		/*return therapistAction === "CREATE"
			? therapistCreateInitialValues - aqui despues */
		return {
			[email.name]: usingTherapist.email,
			[firstName.name]: usingTherapist.firstName,
			[secondName.name]: usingTherapist.secondName,
			[paternalSurname.name]: usingTherapist.paternalSurname,
			[maternalSurname.name]: usingTherapist.maternalSurname,
			[updatePasswordBool.name]: updatePasswordBool.default,
			[oldPassword.name]: oldPassword.default,
			[newPassword.name]: newPassword.default,
			[newPasswordConfirm.name]: newPasswordConfirm.default,
			[sex.name]: usingTherapist.sex,
			[accountState.name]: usingTherapist.accountState,
			[updateRolesBool.name]: updateRolesBool.default,
			[roleIds.name]: usingTherapist.roleDtos.map((roleDto) => roleDto.therapistRoleId)
		};
	};

	const validationSchema = () => {
		/* return therapistAction === "CREATE"
			? therapistSignupValidationSchema - aqui despues */
		return therapistUpdateValidationSchema;
	};

	const closeModal = () => {
		setLoading(false);
		setShowModal(false);
		setTimeout(() => {
			if (!fromProfile && setSelectedTherapist) setSelectedTherapist(null);
		}, 1000);
	};

	const handleTherapistSubmit = (form, onSubmitProps) => {
		setLoading(true);
		onSubmitProps.setSubmitting(true);
		if (isSelf) {
			dispatch(
				updateTherapistProfile(
					form,
					selectedTherapist.therapistId,
					closeModal,
					toastRef,
					onSubmitProps.setSubmitting
				)
			);
		} else {
			dispatch(
				updateTherapist(
					form,
					selectedTherapist.therapistId,
					closeModal,
					toastRef,
					onSubmitProps.setSubmitting
				)
			);
		}
	};

	const showPasswordMessage = (show) => {
		if (show) {
			passwordMessage.current.show(passwordRulesMessageObject);
		} else {
			passwordMessage.current.clear();
		}
	};

	return (
		<>
			<ImageUploader
				photoUrl={usingTherapist.imageUrl}
				toastRef={toastRef}
				id={usingTherapist.therapistId}
				closeModal={closeModal}
				disabled={disabled}
				imagePreviewTitle={imagePreviewTitleTherapists}
				mode={isSelf ? "self" : "therapist"}
			/>
			<Formik
				initialValues={initialValues()}
				validationSchema={validationSchema()}
				onSubmit={handleTherapistSubmit}
				isInitialValid={false}
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
									<hr />
									<h6>Datos Personales y Credenciales</h6>
								</div>
								<div className="p-col-6">
									<FormInput
										inputName={firstName.name}
										labelText={firstName.label}
										placeholder={firstName.placeholder}
										disabled={disabled}
									/>
								</div>
								<div className="p-col-6">
									<FormInput
										inputName={secondName.name}
										labelText={secondName.label}
										placeholder={secondName.placeholder}
										optionalField
										disabled={disabled}
									/>
								</div>
								<div className="p-col-6">
									<FormInput
										inputName={paternalSurname.name}
										labelText={paternalSurname.label}
										placeholder={paternalSurname.placeholder}
										disabled={disabled}
									/>
								</div>
								<div className="p-col-6">
									<FormInput
										inputName={maternalSurname.name}
										labelText={maternalSurname.label}
										placeholder={maternalSurname.placeholder}
										disabled={disabled}
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
											disabled={disabled}
										/>
										<small id={sex.name + "-error"} className="p-invalid">
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
										disabled={disabled}
									/>
								</div>
								{!disabled && (
									<>
										<div className="p-col-12 p-lg-3">
											<div className="p-field-checkbox ">
												<Checkbox
													name={updatePasswordBool.name}
													inputId={updatePasswordBool.name}
													checked={JSON.parse(
														values[updatePasswordBool.name]
													)}
													onChange={(e) => {
														setFieldValue(
															updatePasswordBool.name,
															e.checked.toString()
														);
														showPasswordMessage(e.checked);
													}}
												/>
												<label htmlFor={updatePasswordBool.name}>
													{updatePasswordBool.label}
												</label>
											</div>
											<div className="p-field">
												<small id="updatePasswordHelp">
													Para actualizar la contraseña se debe confirmar
													haciendo click en este campo.
												</small>
											</div>
										</div>
										<div
											className="p-col-12 p-lg-9"
											style={{
												//gray background if disabled
												background: !JSON.parse(
													values[updatePasswordBool.name]
												)
													? "#E9ECEF"
													: "inherit"
											}}
										>
											{isSelf && (
												<FormInput
													inputName={oldPassword.name}
													labelText={oldPassword.label}
													disabled={
														!JSON.parse(values[updatePasswordBool.name])
													}
													type="password"
												/>
											)}
											<div className={" p-mt-3 p-mb-3 "}>
												<Messages ref={passwordMessage} />
											</div>
											<FormInput
												inputName={newPassword.name}
												labelText={newPassword.label}
												disabled={
													!JSON.parse(values[updatePasswordBool.name])
												}
												type="password"
											/>
											<FormInput
												inputName={newPasswordConfirm.name}
												labelText={newPasswordConfirm.label}
												disabled={
													!JSON.parse(values[updatePasswordBool.name])
												}
												type="password"
											/>
										</div>
									</>
								)}
								{(therapistAction === "UPDATE" || therapistAction === "DETAILS") &&
									!fromProfile && (
										<>
											<TherapistRoles
												therapistAction={therapistAction}
												usingTherapist={usingTherapist}
												setFieldValue={setFieldValue}
												isSelf={isSelf}
												selectedTherapist={selectedTherapist}
												adminMessageRef={adminMessageRef}
												disabled={disabled}
												adminButtonDisable={adminButtonDisable}
												setAdminButtonDisable={setAdminButtonDisable}
											/>
											<div className="p-col-12">
												<Messages ref={adminMessageRef}></Messages>
											</div>
											{therapistAction === "DETAILS" && (
												<>
													<div
														className="p-col-12"
														style={{
															padding: "0px 10px"
														}}
													>
														<label>
															<strong>Fecha de afilicación: </strong>
														</label>
														<span>
															{selectedTherapist &&
																" " +
																	dateTimeToString(
																		parseDateTime(
																			selectedTherapist.addedDate
																		)
																	)}
														</span>
													</div>
													<div
														className="p-col-12"
														style={{
															padding: "0px 10px"
														}}
													>
														<label>
															<strong>
																Fecha de creación de cuenta:{" "}
															</strong>
														</label>
														<span>
															{selectedTherapist &&
																" " +
																	dateTimeToString(
																		parseDateTime(
																			selectedTherapist.createdDate
																		)
																	)}
														</span>
													</div>
												</>
											)}
										</>
									)}
								{therapistAction === "UPDATE" && !isSelf && !fromProfile && (
									<>
										<div className="p-col-12">
											<Button
												label="Desactivar Terapeuta"
												icon="pi pi-lock"
												className="p-button p-button-danger"
												type="button"
												disabled={deactivateButtonDisable}
												onClick={(e) => {
													setFieldValue(accountState.name, "Desactivada");
													setDeactivateButtonDisable(true);
													accountStateMessageRef.current.show({
														severity: "info",
														summary: "",
														detail:
															"Se desactivará la cuenta al guardar Terapeuta.",
														closable: false,
														sticky: true
													});
												}}
											/>
										</div>
										<div className="p-col-12">
											<Messages ref={accountStateMessageRef}></Messages>
										</div>
									</>
								)}
								{!disabled && (
									<>
										<div className="p-col-6 p-mt-3 p-mb-3">
											<Button
												label="Restaurar Valores"
												icon="pi pi-replay"
												className="p-button p-button-secondary"
												type="reset"
												onClick={(e) => {
													showPasswordMessage(false);
													accountStateMessageRef.current.clear();
													adminMessageRef.current.clear();
													setAdminButtonDisable(false);
													setDeactivateButtonDisable(false);
												}}
											/>
										</div>
										<div className="p-col-6 p-mt-3 p-mb-3">
											<Button
												label={customModalButtonText}
												icon="pi pi-check"
												className="p-button"
												type="submit"
												disabled={!isValid || isSubmitting || loading}
											/>
										</div>
										{loading && (
											<div className="p-col-12 p-mt-1 p-mb-1">
												<ProgressBar
													mode="indeterminate"
													style={{ height: "6px" }}
												></ProgressBar>
											</div>
										)}
									</>
								)}
							</div>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

TherapistForm.defaultProps = {
	disabled: false,
	fromProfile: false
};

export default TherapistForm;
