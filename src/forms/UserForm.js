import React from "react";
import ImageUploader from "./ImageUploader";
import FormInput from "./FormInput";
import { Formik, Form } from "formik";
import * as yup from "yup";

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
const userInitialValues = {
	[firstName.name]: firstName.default,
	[secondName.name]: secondName.default,
	[paternalSurname.name]: paternalSurname.default,
	[maternalSurname.name]: maternalSurname.default,
	[sex.name]: sex.default,
	[education.name]: education.default,
	[birthday.name]: birthday.default
};

const UserForm = (props) => {
	//methods

	const handleUserSubmit = (form) => {
		//aqui falta todo

		//aqui puede ser crear o actualizar

		//las fechas deben de transformarse antes de mandar request
		form = {
			//aqui checar que este bien
			...form,
			birthday: dateToString(form.birthday)
		};

		console.log("se subio formulario");
		console.log(form);

		setShowModal(false);
	};

	const handleUserDelete = () => {
		//aqui falta todo

		console.log("se elimino a usuario");
		setShowDeleteConfirm(false);
	};

	const { userAction, usingUser, disableForm } = props;
	return (
		<>
			{userAction === "UPDATE" && (
				<ImageUploader
					url={"aqui falta"} //aqui falta, creo que la voy importar de un archivo
					photoUrl={selectedUser ? selectedUser.imageUrl : null}
					imagePreviewTitle={imagePreviewTitleUsers}
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
											touchUI
											dateFormat="dd/mm/yy"
											monthNavigator
											yearNavigator
											yearRange={currentYearRange()}
											placeholder={birthday.placeholder}
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
								<div
									className="p-col-12"
									style={{
										padding: "0px 10px"
									}}
								>
									<label>Fecha de creación: </label>
									<span>
										{selectedUser && //aqui voy, me quede haciendo esto
											" " +
												dateTimeToString(
													parseDateTime(selectedUser.addedDate)
												)}
									</span>
								</div>
								<div className="p-col-12 p-mt-3 p-mb-3">
									<Button
										label={customModalButtonText}
										icon="pi pi-check"
										className="p-button"
										type="submit"
										disabled={!isValid || isSubmitting}
									/>
								</div>
							</div>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default UserForm;
