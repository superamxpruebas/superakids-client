import React, { useState, useEffect, useRef } from "react";
import { Image, Tabs, Tab } from "react-bootstrap";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ScrollPanel } from "primereact/scrollpanel";
import { Messages } from "primereact/messages";
import SKModal from "./SKModal";
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
import ImageUploader from "../forms/ImageUploader";
import { stringArrayToPRSelectObjects } from "../helpers/Functions";
import { defaultImageWhenEmpty } from "../helpers/Functions";
import { passwordRulesMessageObject } from "../helpers/AppProps";

const AccountDetails = () => {
	const sexOptionsUi = useRef([]);
	const passwordMessage = useRef(null);
	const validationUtils = useRef({});

	//aqui esta hardcoded - falta
	//aqui creo que tengo que usar useselector de redux
	const loggedTherapist = {
		therapistId: 1,
		email: "josueemx@gmail.com",
		firstName: "Josué",
		secondName: "Israel",
		paternalSurname: "Morales",
		maternalSurname: "Ornelas",
		fullName: "Josué Israel Morales Ornelas",
		accountState: "Activada",
		sex: "Hombre",
		photoUrl:
			"https://superakids-bucket.s3.us-east-2.amazonaws.com/therapist/img/therapist-1.jpeg",
		createdDate: "04/10/2020 23:53:51",
		addedDate: "04/10/2020 23:53:51",
		roleDtos: [
			{
				therapistRoleId: 1,
				name: "ROLE_Administrador",
				timestamp: "07/10/2020 14:37:02",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
			},
			{
				therapistRoleId: 2,
				name: "ROLE_Terapeuta",
				timestamp: "07/10/2020 14:37:02",
				description:
					"Lorem ipsum dolor sit amet, consec et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consec et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consec et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consec et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consec et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
			}
		]
	};

	//from data
	const validationSchema = yup.object().shape({
		[firstName.name]: firstName.validation,
		[secondName.name]: secondName.validation,
		[paternalSurname.name]: paternalSurname.validation,
		[maternalSurname.name]: maternalSurname.validation,
		[sex.name]: sex.validation,
		[email.name]: email.validation,
		[updatePasswordBool.name]: updatePasswordBool.validation,
		[oldPassword.name]: oldPassword.validation,
		[newPassword.name]: newPassword.validation,
		[newPasswordConfirm.name]: newPasswordConfirm.validation
	});
	const initialValues = {
		[email.name]: loggedTherapist.email,
		[firstName.name]: loggedTherapist.firstName,
		[secondName.name]: loggedTherapist.secondName,
		[paternalSurname.name]: loggedTherapist.paternalSurname,
		[maternalSurname.name]: loggedTherapist.maternalSurname,
		[updatePasswordBool.name]: updatePasswordBool.default,
		[oldPassword.name]: oldPassword.default,
		[newPassword.name]: newPassword.default,
		[newPasswordConfirm.name]: newPasswordConfirm.default,
		[sex.name]: loggedTherapist.sex,
		[accountState.name]: loggedTherapist.accountState,
		[updateRolesBool.name]: updateRolesBool.default,
		[roleIds.name]: loggedTherapist.roleDtos.map((roleDto) => roleDto.therapistRoleId)
	};

	//ui state
	const [showModal, setShowModal] = useState(false);
	const [selectedRole, setSelectedRole] = useState(null);
	const [roleDetails, setRoleDetails] = useState("Seleccione un rol para ver sus detalles.");

	/* get values required values once */
	useEffect(() => {
		//aqui se obtiene desde redux o algo asi
		sexOptionsUi.current = stringArrayToPRSelectObjects(["Hombre", "Mujer"]);
		//aqui se obtiene desde redux o algo asi
		validationUtils.current = {
			PROBLEM_TITLE_EMPTY: "El título del problema no puede estar vacío.",
			ROLES_LIST_NOT_FOUND: "No se encontró el rol especificado.",
			PROBLEM_DESC_MAX: 150,
			DATE_PATTERN_REGEX: "^[0-9]{2}[\\/]{1}[0-9]{2}[\\/]{1}[0-9]{4}$",
			PASS_SYMBOL_REGEX_PATTERN: "[^a-zA-Z\\d\\s]+",
			EMAIL_REGEX_PATTERN:
				"^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$",
			SYSTEM_MAX_LENGTH: 25,
			PATERNALSURNAME_EMPTY: "El apellido paterno no puede estar vacío.",
			IMAGE_EMPTY: "La imagen no puede estar vacía.",
			SECONDNAME_BAD_LENGTH:
				"El segundo nombre no debe tener una longitud de más de 25 caracteres.",
			EMAIL_EMPTY: "La dirección de correo electrónico no puede estar vacía.",
			FIRSTNAME_WHITESPACE:
				"El primer nombre no debe tener espacios en blanco. Ejemplos: espacios, tabulaciones, etc.",
			IMAGE_SIZE_MAX: 10000000,
			FIRSTNAME_BAD_LENGTH: "El primer nombre debe tener una longitud de 1 a 25 caracteres.",
			EMAILS_LIST_VALUE_TOOLONG:
				"Al menos una de las direcciones de correo electrónico es mayor a 50 caracteres.",
			PROBLEM_VIEW_INVALID: "Valor incorrecto para la vista del problema.",
			PASS_UPPER_REGEX_PATTERN: "[A-Z]+",
			EMAILS_LIST_TOOLONG:
				"La lista de direcciones de correo electrónico no puede tener más de 25 direcciones de correo.",
			ACCOUNT_STATE_INVALID: "Valor incorrecto para el estado de cuenta de Terapeuta.",
			NEXTFOLLOWUP_EMPTY:
				"La fecha de próxima entrevista de seguimiento no puede estar vacía.",
			PASS_BAD_FORMAT: "El formato de la contraseña es incorrecto.",
			EMAIL_BAD_FORMAT: "Formato incorrecto de dirección de correo electrónico.",
			EMAILS_LIST_BAD_FORMAT:
				"Al menos una de las direcciones de correo electrónico tiene un formato incorrecto.",
			NEXTEVALREPORT_INVALID:
				"Formato o valor incorrecto para fecha de próximo reporte de evaluación.",
			EDUCATION_MAX_LENGTH: 30,
			NAME_MAX_LENGTH: 25,
			MATERNALSURNAME_EMPTY: "El apellido materno no puede estar vacío.",
			BOOLEAN_VALUES: ["true", "false"],
			THERAPIST_ID_INVALID: "ID de Terapeuta no fué proporcionado o es un valor inválido.",
			NOTES_EMPTY: "Las notas no pueden estar vacías.",
			SYSTEM_TOOLONG: "El sistema no debe ser mayor a 25 caracteres.",
			NEXTEVALREPORT_EMPTY: "La fecha de próximo reporte de evaluación no puede estar vacía.",
			SYSTEM_EMPTY: "El sistema no puede estar vacío.",
			PASS_MISS_LOWER: "La contraseña debe contener letras minúsculas.",
			PROBLEM_VIEW_VALUES_REFERENCE: "PROBLEM_VIEW_VALUES",
			NEXTEVALREPORT_PASSED_DATE:
				"La fecha de próximo reporte de evaluación debe de ser de hoy en adelante.",
			PASS_LOWER_REGEX_PATTERN: "[a-z]+",
			IMAGE_INVALID_FORMAT: "Formato de imagen inválido.",
			EMAILS_LIST_VALUE_EMPTY:
				"Al menos una de las direcciones de correo electrónico está vacia.",
			LEVELEXERCISE_ID_INVALID:
				"ID de Ejercicio de Nivel no fué proporcionado o es un valor inválido.",
			NAME_MIN_LENGTH: 1,
			EDUCAITON_EMPTY: "El valor de educación no puede estar vacío.",
			PROBLEM_STATE_VALUES: ["Pendiente", "Revisando", "Corregido"],
			PASS_CONFIRM_EMPTY: "La confirmación de contraseña no puede estar vacía.",
			DATETIME_PATTERN: "dd/MM/yyyy HH:mm:ss",
			FIRSTNAME_EMPTY: "El primer nombre no puede estar vacío.",
			PASS_MISS_UPPER: "La contraseña debe contener al menos 1 letra mayúscula.",
			EMAIL_MAX_LENGTH: 50,
			PASS_BAD_LENGTH: "La contraseña debe tener una longitud de 8 a 24 caracteres.",
			PROBLEM_DESC_TOOLONG: "La descripción del problema no debe ser mayor a 150 caracteres.",
			ACCOUNT_STATE_EMPTY: "El estado de cuenta de Terapeuta no puede estar vacío.",
			ROLES_LIST_MAX_NUMBER_REACHED: "No se puede asignar más de 10 roles a un Terapeuta.",
			PASS_EMPTY: "La contraseña no puede estar vacía.",
			NEXTFOLLOWUP_INVALID:
				"Formato o valor incorrecto para fecha de próxima entrevista de seguimiento.",
			SEX_INVALID: "Valor incorrecto para sexo.",
			BIRTHDAY_EMPTY: "La fecha de nacimiento no puede estar vacía.",
			PASS_OLD_NEW_SAME: "La contraseña vieja y nueva no pueden ser iguales.",
			USER_ID_INVALID: "ID de Usuario no fué proporcionado o es un valor inválido.",
			UPDATE_ROLE_CONFIRM_INVALID:
				"La confirmación para actualizar los roles solo puede ser true o false.",
			MODE_ID_INVALID:
				"ID de Modo de Ejercicio de TDAH no fué proporcionado o es un valor inválido.",
			BIRTHDAY_INVALID: "Formato o valor incorrecto para fecha de nacimiento.",
			PROBLEM_STATE_VALUES_REFERENCE: "PROBLEM_STATE_VALUES",
			UPDATE_PASS_CONFIRM_INVALID:
				"La confirmación para actualizar la contraseña solo puede ser true o false.",
			EMAIL_TOOLONG: "La dirección de correo electrónico no debe ser mayor a 50 caracteres.",
			PASS_MIN_LENGTH: 8,
			PATERNALSURNAME_WHITESPACE:
				"El apellido paterno no debe tener espacios en blanco. Ejemplos: espacios, tabulaciones, etc.",
			UPDATE_ROLE_CONFIRM_EMPTY:
				"La confirmación para actualizar los roles no puede estar vacía.",
			PASS_NO_MATCH: "Las contraseñas no concuerdan entre sí.",
			PROBLEM_TITLE_MAX: 40,
			PROBLEM_VIEW_MAX: 25,
			UPDATE_PASS_CONFIRM_EMPTY:
				"La confirmación para actualizar la contraseña no puede estar vacía.",
			EMAILS_LIST_NULL: "No se encontró una lista de direcciones de correo.",
			TDAH_STATE_VALUES_REFERENCE: "TDAH_STATE_VALUES",
			MATERNALSURNAME_WHITESPACE:
				"El apellido materno no debe tener espacios en blanco. Ejemplos: espacios, tabulaciones, etc.",
			PASS_MISS_SYMBOL:
				"La contraseña debe contener al menos 1 símbolo. Ejemplos: =, ?, etc.",
			SEX_VALUES: ["Hombre", "Mujer"],
			EDUCATION_VALUES_REFERENCE: "EDUCATION_VALUES",
			ROLES_LIST_NULL: "No se encontró una lista de roles.",
			BOOLEAN_VALUES_REFERENCE: "BOOLEAN_VALUES",
			SECONDNAME_WHITESPACE:
				"El segundo nombre no debe tener espacios en blanco. Ejemplos: espacios, tabulaciones, etc.",
			NEXTFOLLOWUP_PASSED_DATE:
				"La fecha de próxima entrevista de seguimiento debe de ser de hoy en adelante.",
			IMAGE_TOOBIG: "La imagen no puede ser mayor de 10 MB.",
			PASS_DIGIT_REGEX_PATTERN: "\\d+",
			ACCOUNT_STATE_VALUES_REFERENCE: "ACCOUNT_STATE_VALUES",
			TDAH_SETTINGS_VALUES_EMPTY: "Los ajustes de Partida de TDAH no puede estar vacío.",
			IMAGE_FORMAT_VALUES: ["gif", "GIF", "png", "PNG", "jpg", "JPG", "jpeg", "JPEG"],
			EDUCATION_INVALID: "Valor incorrecto para educación.",
			PROBLEM_VIEW_TOOLONG: "La vista del problema no debe ser mayor a 25 caracteres.",
			EMAILS_LIST_MAX: 25,
			ROLES_MAX_NUMBER: 10,
			ACTIVITYEXERCISE_ID_INVALID:
				"ID de Ejercicio de Actividad no fué proporcionado o es un valor inválido.",
			TDAH_STATE_VALUES: ["Pendiente", "Completado"],
			EMAILS_LIST_EMPTY:
				"La lista de direcciones de correo electrónico no puede estar vacía.",
			PATERNALSURNAME_BAD_LENGTH:
				"El apellido paterno debe tener una longitud de 1 a 25 caracteres.",
			NOTES_INVALID: "Formato o valor incorrecto para notas.",
			PROBLEM_VIEW_VALUES: [
				"Dashboard",
				"Usuarios",
				"TDAH",
				"Actividad_tdah",
				"Supera",
				"Actividad_supera",
				"Administracion"
			],
			WHITESPACE_REGEX_PATTERN: "\\s+",
			PROBLEM_TITLE_TOOLONG: "El título del problema no debe ser mayor a 40 caracteres.",
			DATE_PATTERN: "dd/MM/yyyy",
			PROBLEM_VIEW_EMPTY: "La vista del problema no puede estar vacía.",
			SEX_EMPTY: "El sexo no puede estar vacío.",
			EDUCATION_TOOLONG: "El valor de educación no debe ser mayor a 30 caracteres.",
			PASS_MISS_DIGIT: "La contraseña debe contener al menos 1 dígito.",
			PASS_MAX_LENGTH: 24,
			ACCOUNT_STATE_VALUES: ["Activada", "Desactivada"],
			TDAH_STATE_EMPTY: "El estado de Partida de TDAH no puede estar vacío.",
			PROBLEM_DESC_EMPTY: "La descripción del problema no puede estar vacía.",
			TDAH_STATE_INVALID: "Valor incorrecto para estado de Partida de TDAH.",
			PASS_OLD_EMPTY: "La contraseña vieja no puede estar vacía.",
			SEX_VALUES_REFERENCE: "SEX_VALUES",
			EDUCATION_VALUES: [
				"1er Año de Preescolar",
				"2do Año de Preescolar",
				"3er Año de Preescolar",
				"1er Año de Primaria",
				"2do Año de Primaria",
				"3er Año de Primaria",
				"4to Año de Primaria",
				"5to Año de Primaria",
				"6to Año de Primaria",
				"1er Año de Secundaria",
				"2do Año de Secundaria",
				"3rer Año de Secundaria",
				"1er Año de Preparatoria",
				"2do Año de Preparatoria",
				"3er Año de Preparatoria",
				"4to Año de Preparatoria",
				"1er Año de Universidad",
				"2do Año de Universidad",
				"3er Año de Universidad",
				"4to Año de Universidad",
				"5to Año de Universidad en adelante",
				"Maestría",
				"Doctorado",
				"Sin estudios",
				"Profesionista"
			],
			TDAH_SETTINGS_VALUES_INVALID: "Valor incorrecto para ajustes de Partida de TDAH.",
			MATERNALSURNAME_BAD_LENGTH:
				"El apellido materno debe tener una longitud de 1 a 25 caracteres."
		};
	}, []);

	// --- methods ---
	const showPasswordMessage = (show) => {
		if (show) {
			passwordMessage.current.show(passwordRulesMessageObject);
		} else {
			passwordMessage.current.clear();
		}
	};

	const signOut = () => {
		//aqui falta
		console.log("sign out");
	};

	const onSubmit = (form) => {
		//aqui falta todo
		//
		console.log("se subio formulario");
		console.log(form);
	};

	return (
		<div id="AccountDetailsDiv">
			<div style={{ marginBottom: "5vh" }}>
				<h1>Cuenta</h1>
				<Image
					src={defaultImageWhenEmpty(loggedTherapist.photoUrl)}
					style={{ marginBottom: "25px" }}
					className="p-shadow-2 rounded-image rounded-image-big"
				/>
				<h4 style={{ marginBottom: "10px" }}>{loggedTherapist.fullName}</h4>
				<h5 style={{ marginBottom: "10px", fontStyle: "italic" }}>
					Terapeuta (ID: {loggedTherapist.therapistId})
				</h5>
				<p style={{ marginBottom: "10px" }}>{loggedTherapist.email}</p>
				<p style={{ marginBottom: "10px" }}>
					Fecha de afilicación: <br />
					{loggedTherapist.addedDate}
				</p>
				<p style={{ marginBottom: "10px" }}>
					Fecha de creación de cuenta: <br />
					{loggedTherapist.addedDate}
				</p>
			</div>
			<Button
				label="Modificar Cuenta y Roles"
				icon="pi pi-id-card"
				className="p-button-raised p-button-info"
				style={{ marginBottom: "10px", width: "100%" }}
				onClick={() => {
					setShowModal(true);
				}}
			/>
			<Button
				label="Cerrar Sesión"
				icon="pi pi-sign-out"
				className="p-button-raised p-button-danger"
				style={{ width: "100%" }}
				onClick={signOut}
			/>
			<SKModal
				title="Modificar Cuenta y Roles"
				showModalState={showModal}
				closeButtonFunction={() => {
					setShowModal(false);
				}}
			>
				<Tabs defaultActiveKey="update" id="therapistModalTabs">
					<Tab eventKey="update" title="Modificar" className="scrollable-tab">
						<ImageUploader
							url={"aqui falta"} //aqui falta, creo que la voy importar de un archivo
							photoUrl={loggedTherapist.photoUrl} //aqui checar que quede bien el nombre generico
						/>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
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
														Para actualizar la contraseña se debe
														confirmar haciendo click en este campo.
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
												<FormInput
													inputName={oldPassword.name}
													labelText={oldPassword.label}
													disabled={
														!JSON.parse(values[updatePasswordBool.name])
													}
													type="password"
												/>
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
											<div className="p-col-6 p-mt-3 p-mb-3">
												<Button
													label="Restaurar Valores"
													icon="pi pi-replay"
													className="p-button p-button-secondary"
													type="reset"
													onClick={(e) => showPasswordMessage(false)}
												/>
											</div>
											<div className="p-col-6 p-mt-3 p-mb-3">
												<Button
													label="Guardar Cambios"
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
					</Tab>
					<Tab
						eventKey="roles"
						title="Roles"
						className="scrollable-tab"
						style={{ overflowX: "hidden" }}
					>
						<div className="p-fluid p-formgrid p-grid">
							<div className="p-col-12 p-md-8 p-lg-8">
								<DataTable
									value={loggedTherapist.roleDtos}
									selectionMode="single"
									selection={selectedRole}
									onSelectionChange={(e) => setSelectedRole(e.value)}
									dataKey="therapistRoleId"
									onRowSelect={(e) => {
										setRoleDetails(e.data.description);
									}}
									scrollable
									scrollHeight="35vh"
								>
									<Column field="name" header="Nombre"></Column>
									<Column field="timestamp" header="Fecha de Asignación"></Column>
								</DataTable>
							</div>
							<div className="p-col-12 p-md-4 p-lg-4 no-padding">
								<DataTable>
									<Column field="n" header="Detalles de Rol"></Column>
								</DataTable>
								<ScrollPanel style={{ width: "96%", height: "35vh" }}>
									{roleDetails}
								</ScrollPanel>
							</div>
						</div>
					</Tab>
				</Tabs>
			</SKModal>
		</div>
	);
};

export default AccountDetails;
