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
