import * as yup from "yup";

/* get default validation values and messages from server */
var validationUtils = {
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
	SECONDNAME_BAD_LENGTH: "El segundo nombre no debe tener una longitud de más de 25 caracteres.",
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
	NEXTFOLLOWUP_EMPTY: "La fecha de próxima entrevista de seguimiento no puede estar vacía.",
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
	EMAILS_LIST_VALUE_EMPTY: "Al menos una de las direcciones de correo electrónico está vacia.",
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
	MODE_ID_INVALID: "ID de Modo de Ejercicio de TDAH no fué proporcionado o es un valor inválido.",
	BIRTHDAY_INVALID: "Formato o valor incorrecto para fecha de nacimiento.",
	PROBLEM_STATE_VALUES_REFERENCE: "PROBLEM_STATE_VALUES",
	UPDATE_PASS_CONFIRM_INVALID:
		"La confirmación para actualizar la contraseña solo puede ser true o false.",
	EMAIL_TOOLONG: "La dirección de correo electrónico no debe ser mayor a 50 caracteres.",
	PASS_MIN_LENGTH: 8,
	PATERNALSURNAME_WHITESPACE:
		"El apellido paterno no debe tener espacios en blanco. Ejemplos: espacios, tabulaciones, etc.",
	UPDATE_ROLE_CONFIRM_EMPTY: "La confirmación para actualizar los roles no puede estar vacía.",
	PASS_NO_MATCH: "Las contraseñas no concuerdan entre sí.",
	PROBLEM_TITLE_MAX: 40,
	PROBLEM_VIEW_MAX: 25,
	UPDATE_PASS_CONFIRM_EMPTY:
		"La confirmación para actualizar la contraseña no puede estar vacía.",
	EMAILS_LIST_NULL: "No se encontró una lista de direcciones de correo.",
	TDAH_STATE_VALUES_REFERENCE: "TDAH_STATE_VALUES",
	MATERNALSURNAME_WHITESPACE:
		"El apellido materno no debe tener espacios en blanco. Ejemplos: espacios, tabulaciones, etc.",
	PASS_MISS_SYMBOL: "La contraseña debe contener al menos 1 símbolo. Ejemplos: =, ?, etc.",
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
	EMAILS_LIST_EMPTY: "La lista de direcciones de correo electrónico no puede estar vacía.",
	PATERNALSURNAME_BAD_LENGTH: "El apellido paterno debe tener una longitud de 1 a 25 caracteres.",
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
	MATERNALSURNAME_BAD_LENGTH: "El apellido materno debe tener una longitud de 1 a 25 caracteres."
};

/* --- regexes --- */
let whiteSpaceRegex = new RegExp(validationUtils.WHITESPACE_REGEX_PATTERN);
let digitRegex = new RegExp(validationUtils.PASS_DIGIT_REGEX_PATTERN);
let symbolRegex = new RegExp(validationUtils.PASS_SYMBOL_REGEX_PATTERN);
let upperCaseRegex = new RegExp(validationUtils.PASS_UPPER_REGEX_PATTERN);
let lowerCaseRegex = new RegExp(validationUtils.PASS_LOWER_REGEX_PATTERN);
let dateRegex = new RegExp(validationUtils.DATE_PATTERN_REGEX);

/* --- common values --- */
const emptyStringDefault = "";
const emptyArray = [];
const falseStringDefault = "false";

/* ------------------ fields ------------------ */

/* --- common --- */

//firstName textfield
export const firstName = {
	name: "firstName",
	default: emptyStringDefault,
	label: "Primer Nombre",
	placeholder: "Primer Nombre",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.required(validationUtils.FIRSTNAME_EMPTY)
		.max(validationUtils.NAME_MAX_LENGTH, validationUtils.FIRSTNAME_BAD_LENGTH)
		.test("containsWhiteSpace", validationUtils.FIRSTNAME_WHITESPACE, (value, context) => {
			return value.search(whiteSpaceRegex) === -1;
		})
};

//secondName textfield
export const secondName = {
	name: "secondName",
	default: emptyStringDefault,
	label: "Segundo Nombre",
	placeholder: "Segundo Nombre",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.optional()
		.max(validationUtils.NAME_MAX_LENGTH, validationUtils.SECONDNAME_BAD_LENGTH)
		.test("containsWhiteSpace", validationUtils.SECONDNAME_WHITESPACE, (value, context) => {
			return value.search(whiteSpaceRegex) === -1;
		})
};

//paternalSurname textfield
export const paternalSurname = {
	name: "paternalSurname",
	default: emptyStringDefault,
	label: "Apellido Paterno",
	placeholder: "Apellido Paterno",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.required(validationUtils.PATERNALSURNAME_EMPTY)
		.max(validationUtils.NAME_MAX_LENGTH, validationUtils.PATERNALSURNAME_BAD_LENGTH)
		.test(
			"containsWhiteSpace",
			validationUtils.PATERNALSURNAME_WHITESPACE,
			(value, context) => {
				return value.search(whiteSpaceRegex) === -1;
			}
		)
};

//maternalSurname textfield
export const maternalSurname = {
	name: "maternalSurname",
	default: emptyStringDefault,
	label: "Apellido Materno",
	placeholder: "Apellido Materno",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.required(validationUtils.MATERNALSURNAME_EMPTY)
		.max(validationUtils.NAME_MAX_LENGTH, validationUtils.MATERNALSURNAME_BAD_LENGTH)
		.test(
			"containsWhiteSpace",
			validationUtils.MATERNALSURNAME_WHITESPACE,
			(value, context) => {
				return value.search(whiteSpaceRegex) === -1;
			}
		)
};

//sex select one
export const sex = {
	name: "sex",
	default: emptyStringDefault,
	label: "Sexo",
	placeholder: "Seleccionar",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.required(validationUtils.SEX_EMPTY)
		.oneOf(validationUtils.SEX_VALUES, validationUtils.SEX_INVALID)
};

/* --- therapist --- */

//email textfield
export const email = {
	name: "email",
	default: emptyStringDefault,
	label: "Correo Electrónico",
	placeholder: "Correo Electrónico",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.required(validationUtils.EMAIL_EMPTY)
		.email(validationUtils.EMAIL_BAD_FORMAT)
		.max(validationUtils.EMAIL_MAX_LENGTH, validationUtils.EMAIL_TOOLONG)
};

//updatePasswordBool checkbox (string value)
export const updatePasswordBool = {
	name: "updatePasswordBool",
	default: falseStringDefault,
	label: "Actualizar contraseña",
	validation: yup
		.string()
		.default(falseStringDefault)
		.required(validationUtils.UPDATE_PASS_CONFIRM_EMPTY)
		.oneOf(validationUtils.BOOLEAN_VALUES, validationUtils.UPDATE_PASS_CONFIRM_INVALID)
};

//

//aqui estos que siguen hay que checarlos

//

//newPassword textfield
export const newPassword = {
	name: "newPassword",
	default: emptyStringDefault,
	label: "Contraseña (nueva)",
	placeholder: "Contraseña (nueva)",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.when(updatePasswordBool.name, {
			is: "true", //validationUtils.BOOLEAN_VALUES[0]
			then: yup
				.string()
				.default(emptyStringDefault)
				.required(validationUtils.PASS_EMPTY)
				.min(validationUtils.PASS_MIN_LENGTH, validationUtils.PASS_BAD_LENGTH)
				.max(validationUtils.PASS_MAX_LENGTH, validationUtils.PASS_BAD_LENGTH)
				.test("passwordsNoMatch", validationUtils.PASS_OLD_NEW_SAME, (value, context) => {
					return !value.match(context.parent[oldPassword.name]);
				})
				.test("passwordHasDigit", validationUtils.PASS_MISS_DIGIT, (value, context) => {
					return value.search(digitRegex) !== -1;
				})
				.test("passwordHasSymbol", validationUtils.PASS_MISS_SYMBOL, (value, context) => {
					return value.search(symbolRegex) !== -1;
				})
				.test("passwordHasUpper", validationUtils.PASS_MISS_UPPER, (value, context) => {
					return value.search(upperCaseRegex) !== -1;
				})
				.test("passwordHasLower", validationUtils.PASS_MISS_LOWER, (value, context) => {
					return value.search(lowerCaseRegex) !== -1;
				})
		})
};

//newPasswordConfirm textfield
export const newPasswordConfirm = {
	name: "newPasswordConfirm",
	default: emptyStringDefault,
	label: "Contraseña (nueva confirmar)",
	placeholder: "Contraseña (nueva confirmar)",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.when(updatePasswordBool.name, {
			is: "true", //validationUtils.BOOLEAN_VALUES[0]
			then: yup
				.string()
				.default(emptyStringDefault)
				.required(validationUtils.UPDATE_PASS_CONFIRM_EMPTY)
				.test("passwordsMatch", validationUtils.PASS_NO_MATCH, (value, context) => {
					return value.match(newPassword.name);
				})
		})
};

//oldPassword textfield
export const oldPassword = {
	name: "oldPassword",
	default: emptyStringDefault,
	label: "Contraseña (actual)",
	placeholder: "Contraseña (actual)",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.when(updatePasswordBool.name, {
			is: "true", //validationUtils.BOOLEAN_VALUES[0]
			then: yup.string().default(emptyStringDefault).required(validationUtils.PASS_OLD_EMPTY)
		})
};

//nextFollowup textfield (date)
export const nextFollowup = {
	name: "nextFollowup",
	default: emptyStringDefault,
	label: "Fecha de Siguiente Entrevista de Seguimiento",
	placeholder: "Fecha",
	//aqui a ver si funciona asi; si no hay valor esta bien y si hay que cheque con regex
	validation: yup
		.string()
		.default(emptyStringDefault)
		.optional()
		.matches(dateRegex, validationUtils.NEXTFOLLOWUP_INVALID)
};

//aqui faltaria nextEvaluationReport
export const nextEvaluationReport = {
	name: "nextEvaluationReport",
	default: emptyStringDefault,
	label: "Fecha de Siguiente Reporte de Evaluación",
	placeholder: "Fecha",
	//aqui a ver si funciona asi; si no hay valor esta bien y si hay que cheque con regex
	validation: yup
		.string()
		.default(emptyStringDefault)
		.optional()
		.matches(dateRegex, validationUtils.NEXTEVALREPORT_INVALID)
};

//emails  textfield (string[])
export const emails = {
	name: "emails",
	default: emptyArray,
	label: "Correos Electrónicos de Terapeutas",
	placeholder: "Correos Electrónicos de Terapeutas",
	//aqui a ver si funciona asi; si no hay valor esta bien y si hay que cheque con regex
	validation: yup
		.array()
		.default(emptyArray)
		.required()
		.of(
			yup
				.string()
				.email(validationUtils.EMAILS_LIST_BAD_FORMAT)
				.max(validationUtils.EMAIL_MAX_LENGTH, validationUtils.EMAILS_LIST_VALUE_TOOLONG)
		)
		.test("isEmpty", validationUtils.EMAILS_LIST_EMPTY, (value, context) => {
			return value.length !== 0;
		}) //aqui checar que funcione test
		.max(validationUtils.EMAILS_LIST_MAX, validationUtils.EMAILS_LIST_TOOLONG)
};

//accountState textfield
export const accountState = {
	name: "accountState",
	default: emptyStringDefault,
	label: "Estado de Cuenta",
	placeholder: "Estado de Cuenta",
	validation: yup
		.string()
		.default(emptyStringDefault)
		.required(validationUtils.ACCOUNT_STATE_EMPTY)
		.oneOf(validationUtils.ACCOUNT_STATE_VALUES, validationUtils.ACCOUNT_STATE_INVALID)
};

//updateRolesBool checkbox (string value)
export const updateRolesBool = {
	name: "updateRolesBool",
	default: falseStringDefault,
	label: "Actualizar Roles de Terapeuta",
	validation: yup
		.string()
		.default(falseStringDefault)
		.required(validationUtils.UPDATE_ROLE_CONFIRM_EMPTY)
		.oneOf(validationUtils.BOOLEAN_VALUES, validationUtils.UPDATE_ROLE_CONFIRM_INVALID)
};

//roleIds textfield (number[])
export const roleIds = {
	name: "roleIds",
	default: emptyArray,
	label: "Roles",
	validation: yup
		.array()
		.default(emptyArray)
		.when(updateRolesBool.name, {
			is: "true", //validationUtils.BOOLEAN_VALUES[0]
			then: yup
				.array()
				.default(emptyArray)
				.of(yup.number())
				.max(
					validationUtils.ROLES_MAX_NUMBER,
					validationUtils.ROLES_LIST_MAX_NUMBER_REACHED
				)
		})
};

//title textfield
export const title = {
	name: "title",
	default: emptyStringDefault,
	label: "Título",
	placeholder: "Título",
	validation: yup
		.string()
		.required(validationUtils.PROBLEM_TITLE_EMPTY)
		.max(validationUtils.PROBLEM_TITLE_MAX, validationUtils.PROBLEM_TITLE_TOOLONG)
};

//view textarea
export const view = {
	name: "view",
	default: emptyStringDefault,
	label: "Nombre de pantalla",
	placeholder: "Nombre de pantalla",
	validation: yup
		.string()
		.required(validationUtils.PROBLEM_VIEW_EMPTY)
		.max(validationUtils.PROBLEM_VIEW_MAX, validationUtils.PROBLEM_VIEW_TOOLONG)
		.oneOf(validationUtils.PROBLEM_VIEW_VALUES, validationUtils.PROBLEM_VIEW_INVALID)
};

//description textfield
export const description = {
	name: "description",
	default: emptyStringDefault,
	label: "Descripción",
	placeholder: "Descripción",
	validation: yup
		.string()
		.required(validationUtils.PROBLEM_DESC_EMPTY)
		.max(validationUtils.PROBLEM_DESC_MAX, validationUtils.PROBLEM_DESC_TOOLONG)
};
