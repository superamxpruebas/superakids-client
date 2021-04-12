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
	if (dateString === "" || dateString == null) return null;
	let positions = dateString.split("/");
	let day = parseInt(positions[0]);
	let month = parseInt(positions[1]) - 1;
	let year = parseInt(positions[2]);
	return new Date(year, month, day);
}

export function parseDateTime(dateTimeString) {
	if (dateTimeString === "" || dateTimeString == null) return null;
	let positions = dateTimeString.split(" ");
	let date = parseDate(positions[0]);
	let timePositions = positions[1].split(":");
	date.setHours(parseInt(timePositions[0]), parseInt(timePositions[0]));
	return date;
}

export function dateToString(date) {
	if (date == null) return "";
	let day = ("0" + date.getDate()).slice(-2);
	let month = ("0" + (date.getMonth() + 1)).slice(-2);
	return `${day}/${month}/${date.getFullYear()}`;
}

export function dateTimeToString(dateTime) {
	if (dateTime == null) return "";
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	};
	let result = "";
	let hours = ("0" + dateTime.getHours()).slice(-2);
	let minutes = ("0" + dateTime.getMinutes()).slice(-2);
	try {
		result =
			dateTime.toLocaleDateString("es-MX", options) +
			" a las " +
			hours +
			":" +
			minutes +
			" horas";
		return result;
	} catch (e) {
		return dateToString(dateTime);
	}
}

export function getTodayDate() {
	let today = new Date();
	let date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	return date;
}
export function getTomorrowFrom(dateMilis) {
	let today = new Date(dateMilis);
	let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
	return date;
}

export function sumMonthsTo(dateMilis, months) {
	let newDate = new Date(dateMilis);
	newDate.setMonth(newDate.getMonth() + months);
	return newDate;
}

export function getPresentYear() {
	return new Date(new Date().getFullYear(), 0, 1);
}

export function getNextYear() {
	return new Date(new Date().getFullYear() + 1, 11, 31);
}

export function getTwoYearRange() {
	let presentYear = getPresentYear().getFullYear();
	let nextYear = getNextYear().getFullYear();
	return `${presentYear}:${nextYear}`;
}

//primereact calendar year range - 1960 - actual year
export const currentYearRange = () => {
	let year = new Date().getFullYear();
	return `1960:${year}`;
};

export const addDateAndNotesObjectsTo = (tempUsers) => {
	return tempUsers.map((user, i) => {
		return addDateAndNotesObjectsToOnly(user);
	});
};

export const addDateAndNotesObjectsToOnly = (user) => {
	user.nextFollowupDate = parseDate(user.nextFollowup);
	user.nextEvaluationReportDate = parseDate(user.nextEvaluationReport);
	let tempObj = JSON.parse(user.notes);
	user.notesContents = tempObj.contents;
	return user;
};

export const addDateObjectsAndUsersTo = (tempTherapists) => {
	return tempTherapists.map((therapist, i) => {
		return addDateObjectsAndUsersToOnly(therapist);
	});
};

export const addDateObjectsAndUsersToOnly = (therapist) => {
	therapist.users = [];
	therapist.lastSessionDate = parseDateTime(therapist.lastSession);
	return therapist;
};

export const addDateObjectsToOnly = (therapist) => {
	therapist.lastSessionDate = parseDateTime(therapist.lastSession);
	return therapist;
};
