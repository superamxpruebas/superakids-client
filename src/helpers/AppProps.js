/*

This file contains constants and default values used throught the whole application.

*/

//app version
export const AppVersion = "0.1.0"; //last updated 22/dec/2020

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
	"https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png";

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
