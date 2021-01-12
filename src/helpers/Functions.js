import { defaultAccountPhoto } from "../helpers/AppProps";

//replaces accents for easier string comparison
export function normalizeAccents(string) {
	string = string.replace(/á/gi, "a");
	string = string.replace(/é/gi, "e");
	string = string.replace(/í/gi, "i");
	string = string.replace(/ó/gi, "o");
	string = string.replace(/ú/gi, "u");
	string = string.replace(/ü/gi, "u");
	return string;
}

export function stringArrayToPRSelectObjects(array) {
	return array.map((option) => ({ label: option, value: option }));
}

export function defaultImageWhenEmpty(photoUrl) {
	return photoUrl ? photoUrl : defaultAccountPhoto;
}

export function parseDate(dateString) {
	let positions = dateString.split("/");
	let day = parseInt(positions[0]);
	let month = parseInt(positions[1]) - 1;
	let year = parseInt(positions[2]);
	return new Date(year, month, day);
}

export function dateToString(date) {
	if (date == null) return "";
	let day = ("0" + date.getDate()).slice(-2);
	let month = ("0" + (date.getMonth() + 1)).slice(-2);
	return `${day}/${month}/${date.getFullYear()}`;
}
