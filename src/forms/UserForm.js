import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import {
	firstName,
	secondName,
	paternalSurname,
	maternalSurname,
	education,
	sex,
	birthday
} from "./Fields";
import {
	dateToString,
	currentYearRange,
	parseDateTime,
	dateTimeToString
} from "../helpers/Functions";
import { spanishCalendarProps, imagePreviewTitleUsers } from "../helpers/AppProps";
import ImageUploader from "./ImageUploader";
import FormInput from "./FormInput";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { createUser, updateUser } from "../actions/userActions";
import { useDispatch } from "react-redux";

//form data
const userValidationSchema = yup.object().shape({
	[firstName.name]: firstName.validation,
	[secondName.name]: secondName.validation,
	[paternalSurname.name]: paternalSurname.validation,
	[maternalSurname.name]: maternalSurname.validation,
	[sex.name]: sex.validation,
	[education.name]: education.validation,
	[birthday.name]: birthday.validation
});

const UserForm = (props) => {
	const {
		userAction,
		usingUser,
		selectedUser,
		educationOptionsUi,
		customModalButtonText,
		sexOptionsUi,
		setShowModal,
		toastRef,
		setSelectedUser
	} = props;

	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	//methods

	const closeModal = () => {
		setLoading(false);
		setShowModal(false);
		setTimeout(() => {
			setSelectedUser(null);
		}, 1000);
	};

	const handleUserSubmit = (form, onSubmitProps) => {
		setLoading(true);
		onSubmitProps.setSubmitting(true);

		form.birthday = dateToString(form.birthday);

		if (userAction === "CREATE") {
			dispatch(createUser(form, closeModal, toastRef, onSubmitProps.setSubmitting));
		}
		if (userAction === "UPDATE") {
			dispatch(
				updateUser(
					selectedUser.userId,
					form,
					closeModal,
					toastRef,
					onSubmitProps.setSubmitting
				)
			);
		}
	};

	const disabled = userAction === "DETAILS";
	return (
		<>
			{(userAction === "UPDATE" || userAction === "DETAILS") && (
				<ImageUploader
					photoUrl={selectedUser ? selectedUser.imageUrl : null}
					imagePreviewTitle={imagePreviewTitleUsers}
					disabled={disabled}
					id={selectedUser.userId}
					toastRef={toastRef}
					closeModal={closeModal}
					mode="user"
				/>
			)}
			<Formik
				initialValues={usingUser}
				validationSchema={userValidationSchema}
				onSubmit={handleUserSubmit}
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
									<h6>Datos Personales</h6>
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
									<div className="p-field">
										<label htmlFor={education.name}>{education.label}</label>
										<Dropdown
											name={education.name}
											inputId={education.name}
											value={values[education.name]}
											options={educationOptionsUi.current}
											onChange={(e) => {
												setFieldValue(education.name, e.target.value);
											}}
											placeholder={education.placeholder}
											disabled={disabled}
										/>
										<small id={education.name + "-error"} className="p-invalid">
											{touched[education.name] &&
												errors[education.name] &&
												errors[education.name]}
										</small>
									</div>
								</div>
								<div className="p-col-12">
									<div className="p-field">
										<label htmlFor={birthday.name}>{birthday.label}</label>
										<Calendar
											id={birthday.name}
											name={birthday.name}
											value={values[birthday.name]}
											onChange={(e) => {
												setFieldValue(birthday.name, e.value);
											}}
											locale={spanishCalendarProps}
											showIcon
											dateFormat="dd/mm/yy"
											monthNavigator
											yearNavigator
											yearRange={currentYearRange()}
											placeholder={birthday.placeholder}
											disabled={disabled}
										/>
										<small id={birthday.name + "-helper"}>
											Formato: dd/mm/aaaa
										</small>
										<small id={birthday.name + "-error"} className="p-invalid">
											{touched[birthday.name] &&
												errors[birthday.name] &&
												errors[birthday.name]}
										</small>
									</div>
								</div>
								{(userAction === "UPDATE" || userAction === "DETAILS") && (
									<div
										className="p-col-12"
										style={{
											padding: "0px 10px"
										}}
									>
										<label>Fecha de creación: </label>
										<span>
											{selectedUser &&
												" " +
													dateTimeToString(
														parseDateTime(selectedUser.addedDate)
													)}
										</span>
									</div>
								)}
								{!disabled && (
									<>
										<div className="p-col-6 p-mt-3 p-mb-3">
											<Button
												label="Restaurar Valores"
												icon="pi pi-replay"
												className="p-button p-button-secondary"
												type="reset"
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
										<div className="p-col-12 p-mt-1 p-mb-1">
											{loading && (
												<ProgressBar
													mode="indeterminate"
													style={{ height: "6px" }}
												></ProgressBar>
											)}
										</div>
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

export default UserForm;
