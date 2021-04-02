/*

This file contains constants and default values used throught the whole application.

*/

//app version
export const AppVersion = "1.0.1"; //last updated 15/mar/2020

//api url
export const apiURL = "http://localhost:8080"; //aqui hay que estar modificando
//api version
export const apiVersion = "/api/v1";

//endpoints
export const therapistsEndpoint = "/therapists";
export const usersEndpoint = "/users";
export const problemsEndpoint = "/problems";

//image upload endpoints
export const therapistImageEndpoint = apiURL + apiVersion + therapistsEndpoint + "/?/image/upload";
export const userImageEndpoint = apiURL + apiVersion + usersEndpoint + "/?/image/upload";

//local/session storage code
export const storageCode = "SK-2021";

//default logos
export const AppLogoUrl =
	"https://superakids-bucket.s3.us-east-2.amazonaws.com/logos/SuperaKidsLogo.png";

//see ValidationUtils.java for updated values
//screen names
export const Dashboard = "Dashboard";
export const Usuarios = "Usuarios";
export const TDAH = "TDAH";
export const Actividad_tdah = "Actividad_tdah";
export const Supera = "Supera";
export const Actividad_supera = "Actividad_supera";
export const Administracion = "Administracion";

//default profile image/photo values
export const profileImageTextDefault = "Imagen actual";
export const profileImageTextPreview = "Vista previa de imagen";
export const defaultAccountPhoto =
	"https://superakids-bucket.s3.us-east-2.amazonaws.com/defaults/img/defaultProfileImage.png";

// title values for ImageUploader component
export const imagePreviewTitleUsers = "Foto de Usuario";
export const imagePreviewTitleTherapists = "Foto de Terapeuta";

//default password values
export const passwordRulesMessageObject = {
	severity: "info",
	sticky: true,
	closable: false,
	content: (
		<>
			<span class="p-message-icon pi  pi-info-circle"></span>
			<div className="p-ml-2">
				<p className="p-text-bold p-mb-1">
					La contraseña debe cumplir con los siguientes requisitos:
				</p>
				<ul>
					<li>Longitud de 8 (mínimo) a 24 (máximo) caracteres.</li>
					<li>Incluir al menos 1 dígito.</li>
					<li>Incluir al menos 1 símbolo.</li>
					<li>Incluir al menos 1 letra minúscula.</li>
					<li>Incluir al menos 1 letra mayúscula.</li>
				</ul>
			</div>
		</>
	)
};

//primereact calendar spanish translation
export const spanishCalendarProps = {
	firstDayOfWeek: 1,
	dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
	dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
	dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
	monthNames: [
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Septiembre",
		"Octubre",
		"Noviembre",
		"Diciembre"
	],
	monthNamesShort: [
		"Ene",
		"Feb",
		"Mar",
		"Abr",
		"May",
		"Jun",
		"Jul",
		"Ago",
		"Sep",
		"Oct",
		"Nov",
		"Dic"
	],
	today: "Hoy",
	clear: "Limpiar"
};
//primereact calendar format
export const formatCalendarProps = "dd/mm/yy";

//diccionario de severidades para toasts
export const severityTitles = {
	success: "Éxito",
	info: "Informe",
	warn: "Advertencia",
	error: "Error",
	many: "Advertencia"
};
