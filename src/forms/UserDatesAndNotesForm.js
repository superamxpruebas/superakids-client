import React, { useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Message } from "primereact/message";
import { ProgressBar } from "primereact/progressbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import { Formik, Form } from "formik";
import { spanishCalendarProps, formatCalendarProps } from "../helpers/AppProps";
import { dateToString, sumMonthsTo } from "../helpers/Functions";
import { nextFollowup, nextEvaluationReport, notes } from "../forms/Fields";
import { useDispatch } from "react-redux";
import { patchUser } from "../actions/userActions";

const UserDatesAndNotesForm = (props) => {
	const {
		usingDatesAndNotes,
		twoYearRangeRef,
		selectedUser,
		tomorrowDateRef,
		todayDateRef,
		presentYearRef,
		nextYearRef,
		customModalButtonText,
		userAction,
		toastRef,
		setSelectedUser
	} = props;

	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const disabled = userAction === "DETAILS";

	//methods

	const handleDatesAndNotesSubmit = (form, onSubmitProps) => {
		setLoading(true);
		onSubmitProps.setSubmitting(true);

		//process data
		let values = { nextEvaluationReport: "", nextFollowup: "", notes: "" };
		values.nextEvaluationReport = dateToString(form.nextEvaluationReport);
		values.nextFollowup = dateToString(form.nextFollowup);
		let tempNotes = form.notes.replace('"', "'");
		values.notes = JSON.stringify({ contents: tempNotes });

		dispatch(
			patchUser(
				selectedUser.userId,
				values,
				toastRef,
				onSubmitProps.setSubmitting,
				setLoading,
				setSelectedUser
			)
		);
	};

	return (
		<Formik initialValues={usingDatesAndNotes} onSubmit={handleDatesAndNotesSubmit}>
			{(formik) => {
				const {
					values,
					isSubmitting,
					isValid,
					setFieldValue,
					touched,
					errors,
					setSubmitting
				} = formik;
				return (
					<Form>
						<div className="p-field p-grid p-mt-3">
							<div className="p-col-12">
								<div className={" p-mt-3 p-mb-3 "}>
									<Message
										severity="info"
										text="Al seleccionar una fecha, se calculará el tiempo restante y el sistema recalculará automáticamente la siguiente entrevista de seguimiento en 2 o 6 meses (respectivamente) una vez pasada esta."
									/>
								</div>
							</div>
							<div className="p-col-12 p-lg-6 p-field">
								<label htmlFor={nextFollowup.name}>
									{nextFollowup.label} <small> (opcional)</small>
								</label>
								<Calendar
									id={nextFollowup.name}
									name={nextFollowup.name}
									value={values[nextFollowup.name]}
									onChange={(e) => {
										setFieldValue(nextFollowup.name, e.value);
									}}
									locale={spanishCalendarProps}
									showIcon
									dateFormat={formatCalendarProps}
									monthNavigator
									yearNavigator
									yearRange={twoYearRangeRef.current}
									placeholder={nextFollowup.placeholder}
									style={{
										width: "100%"
									}}
									readOnlyInput
									minDate={presentYearRef.current}
									maxDate={nextYearRef.current}
									type="search"
									showButtonBar
									touchUI
									disabled={disabled}
								/>
								<small>Formato: dd/mm/aaaa. Cada 2 meses.</small>
							</div>
							<div
								className="p-col-12 p-lg-6 p-field"
								style={{
									padding: "0px 10px"
								}}
							>
								<label>Tiempo restante:</label>
								<span
									className="p-pt-2"
									style={{
										display: "flex",
										alignItems: "center"
									}}
								>
									{selectedUser &&
										(values[nextFollowup.name] ? (
											tomorrowDateRef.current.getTime() ===
											values[nextFollowup.name].getTime() ? (
												"Mañana"
											) : values[nextFollowup.name].getTime() <=
											  todayDateRef.current.getTime() ? (
												(values[nextFollowup.name].getTime() ===
												todayDateRef.current.getTime()
													? "Hoy"
													: "Fecha pasada") +
												", siguiente fecha: " +
												dateToString(
													sumMonthsTo(
														values[nextFollowup.name].getTime(),
														2
													)
												) +
												" (en 2 meses)"
											) : (
												<ReactTimeAgo
													date={values[nextFollowup.name]}
													locale="es-MX"
													future
												/>
											)
										) : (
											"Sin fecha seleccionada"
										))}
								</span>
							</div>
							<div className="p-col-12 p-lg-6 p-field">
								<label htmlFor={nextEvaluationReport.name}>
									{nextEvaluationReport.label} <small> (opcional)</small>
								</label>
								<Calendar
									id={nextEvaluationReport.name}
									name={nextEvaluationReport.name}
									value={values[nextEvaluationReport.name]}
									onChange={(e) => {
										setFieldValue(nextEvaluationReport.name, e.value);
									}}
									locale={spanishCalendarProps}
									showIcon
									touchUI
									dateFormat={formatCalendarProps}
									monthNavigator
									yearNavigator
									yearRange={twoYearRangeRef.current}
									placeholder={nextEvaluationReport.placeholder}
									style={{
										width: "100%"
									}}
									readOnlyInput
									minDate={presentYearRef.current}
									maxDate={nextYearRef.current}
									showButtonBar
									disabled={disabled}
								/>
								<small>Formato: dd/mm/aaaa. Cada 6 meses.</small>
							</div>
							<div
								className="p-col-12 p-lg-6 p-field"
								style={{
									padding: "0px 10px"
								}}
							>
								<label>Tiempo restante:</label>
								<span
									className="p-pt-2"
									style={{
										display: "flex",
										alignItems: "center"
									}}
								>
									{selectedUser &&
										(values[nextEvaluationReport.name] ? (
											tomorrowDateRef.current.getTime() ===
											values[nextEvaluationReport.name].getTime() ? (
												"Mañana"
											) : values[nextEvaluationReport.name].getTime() <=
											  todayDateRef.current.getTime() ? (
												(values[nextEvaluationReport.name].getTime() ===
												todayDateRef.current.getTime()
													? "Hoy"
													: "Fecha pasada") +
												", siguiente fecha: " +
												dateToString(
													sumMonthsTo(
														values[nextEvaluationReport.name].getTime(),
														6
													)
												) +
												" (en 6 meses)"
											) : (
												<ReactTimeAgo
													date={values[nextEvaluationReport.name]}
													locale="es-MX"
													future
												/>
											)
										) : (
											"Sin fecha seleccionada"
										))}
								</span>
							</div>
							<div className="p-col-12 p-field">
								<label htmlFor={notes.name}>
									{notes.label} <small> (opcional)</small>
								</label>
								<ReactQuill
									theme="snow"
									placeholder={notes.placeholder}
									modules={{
										toolbar: [
											[{ header: [1, 2, 3, false] }],
											[{ font: [] }],
											[{ color: [] }, { background: [] }],
											[{ align: [] }],
											["bold", "italic", "underline", "strike"],
											[{ script: "sub" }, { script: "super" }],
											[{ list: "ordered" }, { list: "bullet" }],
											[{ indent: "-1" }, { indent: "+1" }],
											["link", "blockquote"],
											["clean"]
										]
									}}
									value={values[notes.name]}
									onChange={(e) => {
										setFieldValue(notes.name, e);
									}}
									formats={[
										"header",
										"font",
										"size",
										"bold",
										"italic",
										"underline",
										"strike",
										"blockquote",
										"list",
										"bullet",
										"indent",
										"link"
									]}
									readOnly={disabled ? true : false}
								/>
							</div>
							{!disabled && (
								<>
									<div className="p-col-12 p-mt-3 p-mb-3">
										<Button
											label={customModalButtonText}
											icon="pi pi-check"
											className="p-button"
											type="submit"
											disabled={isSubmitting}
											style={{ width: "100%" }}
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
	);
};

export default UserDatesAndNotesForm;
