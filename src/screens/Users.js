import React, { useState, useEffect, useRef } from "react";
import { Image, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Calendar } from "primereact/calendar";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormInput from "../forms/FormInput";
import SKModal from "../components/SKModal";
import {
	Usuarios as screenName,
	spanishCalendarProps,
	currentYearRange
} from "../helpers/AppProps";
import {
	defaultImageWhenEmpty,
	parseDate,
	stringArrayToPRSelectObjects,
	dateToString
} from "../helpers/Functions";
import {
	fullName,
	firstName,
	secondName,
	paternalSurname,
	maternalSurname,
	education,
	sex,
	birthday,
	yearsOld,
	nextFollowup,
	nextEvaluationReport
} from "../forms/Fields";

const Users = () => {
	//const users = useRef(null);
	const [users, setUsers] = useState([]);
	const usersDataTable = useRef(null);
	const educationOptionsUi = useRef();
	const sexOptionsUi = useRef([]);

	useEffect(() => {
		//aqui falta, usersService se obtiene de redux o algo
		let usersService = [
			{
				userId: 1,
				therapistId: 1,
				firstName: "josué",
				secondName: "",
				paternalSurname: "moralesññññ",
				maternalSurname: "ornelaééééáús",
				education: "1er Año de Preescolar",
				sex: "Hombre",
				birthday: "20/02/1996",
				addedDate: "05/10/2020 00:45:32",
				imageUrl: null,
				notes: '{"edad": 28, "prop": "string y así", "2da_prueba": "ñññéújdjdjdááá"}',
				nextFollowup: "30/12/2020",
				nextEvaluationReport: "30/12/2020",
				yearsOld: 24,
				next5DaysForEvaluationReport: "04/01/2021",
				next5DaysForFollowup: "04/01/2021",
				fullName: "josué  moralesññññ ornelaééééáús"
			},
			{
				userId: 2,
				therapistId: 1,
				firstName: "hector",
				secondName: null,
				paternalSurname: "hernández",
				maternalSurname: "ornelas",
				education: "prepa",
				sex: "Hombre",
				birthday: "12/02/1996",
				addedDate: "05/10/2020 00:45:32",
				imageUrl:
					"https://s3.us-east-2.amazonaws.com/superakids-bucket/user/img/user-2.gif",
				notes: '{"prueba": "string con áéúgh y ññññ jeje"}',
				nextFollowup: "03/06/2019",
				nextEvaluationReport: "12/02/2025",
				yearsOld: 24,
				next5DaysForEvaluationReport: "17/02/2025",
				next5DaysForFollowup: "08/06/2019",
				fullName: "hector hernández ornelas"
			},
			{
				userId: 4,
				therapistId: 1,
				firstName: "eefefeijefij",
				secondName: "",
				paternalSurname: "morales",
				maternalSurname: "ornelas",
				education: "1er Año de Preescolar",
				sex: "Hombre",
				birthday: "12/02/1996",
				addedDate: "19/10/2020 22:13:51",
				imageUrl: null,
				notes: "{}",
				nextFollowup: "15/12/2020",
				nextEvaluationReport: "22/11/2020",
				yearsOld: 1,
				next5DaysForEvaluationReport: "27/11/2020",
				next5DaysForFollowup: "20/12/2020",
				fullName: "eefefeijefij  morales ornelas"
			},
			{
				userId: 5,
				therapistId: 1,
				firstName: "eefefeijefij",
				secondName: "",
				paternalSurname: "morales",
				maternalSurname: "ornelas",
				education: "1er Año de Preescolar",
				sex: "Hombre",
				birthday: "12/02/1996",
				addedDate: "19/10/2020 22:13:51",
				imageUrl: null,
				notes: "{}",
				nextFollowup: "15/12/2020",
				nextEvaluationReport: "22/11/2020",
				yearsOld: 1,
				next5DaysForEvaluationReport: "27/11/2020",
				next5DaysForFollowup: "20/12/2020",
				fullName: "eefefeijefij  morales ornelas"
			},
			{
				userId: 6,
				therapistId: 1,
				firstName: "eefefeijefij",
				secondName: "",
				paternalSurname: "morales",
				maternalSurname: "ornelas",
				education: "1er Año de Preescolar",
				sex: "Hombre",
				birthday: "12/02/1996",
				addedDate: "19/10/2020 22:13:51",
				imageUrl: null,
				notes: "{}",
				nextFollowup: "15/12/2020",
				nextEvaluationReport: "22/11/2020",
				yearsOld: 1,
				next5DaysForEvaluationReport: "27/11/2020",
				next5DaysForFollowup: "20/12/2020",
				fullName: "eefefeijefij  morales ornelas"
			},
			{
				userId: 7,
				therapistId: 1,
				firstName: "eefefeijefij",
				secondName: "",
				paternalSurname: "morales",
				maternalSurname: "ornelas",
				education: "1er Año de Preescolar",
				sex: "Hombre",
				birthday: "12/02/1996",
				addedDate: "19/10/2020 22:13:51",
				imageUrl: null,
				notes: "{}",
				nextFollowup: "15/12/2020",
				nextEvaluationReport: "22/11/2020",
				yearsOld: 1,
				next5DaysForEvaluationReport: "27/11/2020",
				next5DaysForFollowup: "20/12/2020",
				fullName: "eefefeijefij  morales ornelas"
			},
			{
				userId: 8,
				therapistId: 1,
				firstName: "eefefeijefij",
				secondName: "",
				paternalSurname: "morales",
				maternalSurname: "ornelas",
				education: "1er Año de Preescolar",
				sex: "Hombre",
				birthday: "12/02/1996",
				addedDate: "19/10/2020 22:13:51",
				imageUrl: null,
				notes: "{}",
				nextFollowup: "15/12/2020",
				nextEvaluationReport: "22/11/2020",
				yearsOld: 1,
				next5DaysForEvaluationReport: "27/11/2020",
				next5DaysForFollowup: "20/12/2020",
				fullName: "eefefeijefij  morales ornelas"
			},
			{
				userId: 9,
				therapistId: 1,
				firstName: "eefefeijefij",
				secondName: "",
				paternalSurname: "morales",
				maternalSurname: "ornelas",
				education: "1er Año de Preescolar",
				sex: "Hombre",
				birthday: "12/02/1996",
				addedDate: "19/10/2020 22:13:51",
				imageUrl: null,
				notes: "{}",
				nextFollowup: "15/12/2020",
				nextEvaluationReport: "22/11/2020",
				yearsOld: 1,
				next5DaysForEvaluationReport: "27/11/2020",
				next5DaysForFollowup: "20/12/2020",
				fullName: "eefefeijefij  morales ornelas"
			},
			{
				userId: 10,
				therapistId: 1,
				firstName: "eefefeijefij",
				secondName: "",
				paternalSurname: "morales",
				maternalSurname: "ornelas",
				education: "1er Año de Preescolar",
				sex: "Hombre",
				birthday: "12/02/1996",
				addedDate: "19/10/2020 22:13:51",
				imageUrl: null,
				notes: "{}",
				nextFollowup: "15/12/2020",
				nextEvaluationReport: "22/11/2020",
				yearsOld: 1,
				next5DaysForEvaluationReport: "27/11/2020",
				next5DaysForFollowup: "20/12/2020",
				fullName: "eefefeijefij  morales ornelas"
			}
		];
		setUsers(addDateObjectsTo(usersService));

		//aqui falta - se obtiene de session, tal vez usar spread operator para hacer copia y que se quede guardado
		educationOptionsUi.current = stringArrayToPRSelectObjects([
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
		]);

		//aqui se obtiene desde redux o session, tal vez usar spread operator para hacer copia y que se quede guardado
		sexOptionsUi.current = stringArrayToPRSelectObjects(["Hombre", "Mujer"]);
	}, []);

	//form data
	const validationSchema = yup.object().shape({
		[firstName.name]: firstName.validation,
		[secondName.name]: secondName.validation,
		[paternalSurname.name]: paternalSurname.validation,
		[maternalSurname.name]: maternalSurname.validation,
		[sex.name]: sex.validation,
		[education.name]: education.validation,
		[birthday.name]: birthday.validation
	});
	const initialValues = {
		[firstName.name]: firstName.default,
		[secondName.name]: secondName.default,
		[paternalSurname.name]: paternalSurname.default,
		[maternalSurname.name]: maternalSurname.default,
		[sex.name]: sex.default,
		[education.name]: education.default,
		[birthday.name]: birthday.default
	};

	//ui state
	const [customModalTitle, setCustomModalTitle] = useState("");
	const [userAction, setUserAction] = useState("");
	const [usingUser, setUsingUser] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [globalFilter, setGlobalFilter] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [selectedEducation, setSelectedEducation] = useState(null);
	const [selectedSex, setSelectedSex] = useState(null);
	const [currentFullName, setCurrentFullName] = useState("");
	const [currentYearsOld, setCurrentYearsOld] = useState([0, 100]);
	const [currentNextFollowup, setCurrentNextFollowup] = useState(null);

	//methods

	const addDateObjectsTo = (tempUsers) => {
		return tempUsers.map((user) => {
			user.nextFollowupDate = parseDate(user.nextFollowup);
			user.nextEvaluationReportDate = parseDate(user.nextEvaluationReport);
			return user;
		});
	};

	const onSubmit = (form) => {
		//aqui falta todo
		//
		console.log("se subio formulario");
		console.log(form);
	};

	//table components

	const bodyTemplateFor = (rowData, columnName, field, image) => {
		return (
			<>
				<span className="p-column-title">{columnName}</span>
				{image && (
					<Image
						src={defaultImageWhenEmpty(rowData.imageUrl)}
						style={{ margin: "5px 10px" }}
						className="p-shadow-2 rounded-image rounded-image-small"
					/>
				)}
				{rowData[field]}
			</>
		);
	};

	//aqui viendo si lo voy a usar
	const actionBodyTemplate = () => {
		return <Button type="button" icon="pi pi-cog" className="p-button-secondary"></Button>;
	};

	//filters

	// eslint-disable-next-line
	const educationFilter = () => {
		return (
			<Dropdown
				value={selectedEducation}
				options={educationOptionsUi.current}
				onChange={(e) => {
					usersDataTable.current.filter(e.value, education.name, "equals");
					setSelectedEducation(e.value);
				}}
				showClear
				placeholder={education.placeholder}
				className="p-column-filter full-width"
			/>
		);
	};

	// eslint-disable-next-line
	const fullNameFilter = () => {
		return (
			<InputText
				type="search"
				value={currentFullName}
				onInput={(e) => {
					setCurrentFullName(e.target.value);
					usersDataTable.current.filter(e.target.value, fullName.name, "contains");
				}}
				placeholder={fullName.placeholder}
				className="p-column-filter full-width"
			/>
		);
	};

	// eslint-disable-next-line
	const yearsOldFilter = () => {
		return (
			<>
				<div className="full-width p-text-center p-mb-2">
					{currentYearsOld[0]} - {currentYearsOld[1]}
				</div>
				<Slider
					value={currentYearsOld}
					onChange={(e) => {
						setCurrentYearsOld(e.value);
						usersDataTable.current.filter(e.value, yearsOld.name, "custom");
					}}
					range
				/>
			</>
		);
	};

	// eslint-disable-next-line
	const sexFilter = () => {
		return (
			<Dropdown
				value={selectedSex}
				options={sexOptionsUi.current}
				onChange={(e) => {
					usersDataTable.current.filter(e.value, sex.name, "equals");
					setSelectedSex(e.value);
				}}
				showClear
				placeholder={sex.placeholder}
				className="p-column-filter full-width"
			/>
		);
	};

	// eslint-disable-next-line
	const dateRangeFilter = (id) => {
		return (
			//aqui hay que reemplazarlo, ver popo
			<Calendar //aqui tengo algo raro del warning
				id={"dateRange-" + id}
				className="p-column-filter full-width"
				value={currentNextFollowup}
				onChange={(e) => {
					setCurrentNextFollowup(e.value);
					console.log(e.value);
					//aqui falta
				}}
				selectionMode="range"
				readOnlyInput
				showButtonBar
				locale={spanishCalendarProps}
				dateFormat="dd/mm/yy" //aqui asi dejarlo??
				monthNavigator
				yearNavigator
				yearRange={currentYearRange()}
				disabledDays={[0]}
				placeholder="Rango"
			/>
		);
	};

	//sorting date fields

	const nextFollowupSort = (e) => {
		//sort by closest date
		let result = [...usersDataTable.current.props.value].sort(
			(a, b) => b.nextFollowupDate - a.nextFollowupDate
		);
		//1 = closest - furthest, -1 = furthest - closest
		if (e.order === 1) {
			result.reverse();
		}
		return result;
	};

	const nextEvaluationReportSort = (e) => {
		//sort by closest date
		let result = [...usersDataTable.current.props.value].sort(
			(a, b) => b.nextEvaluationReportDate - a.nextEvaluationReportDate
		);
		//1 = closest - furthest, -1 = furthest - closest
		if (e.order === 1) {
			result.reverse();
		}
		return result;
	};

	return (
		<>
			<Header />
			<main className="py-4">
				<Container>
					<h1 style={{ color: "white" }}>Usuarios</h1>

					<Row>
						<div className="datatable-doc-demo">
							<Menubar
								model={[
									{
										label: "Nuevo",
										icon: "pi pi-plus",
										command: () => {
											setCustomModalTitle("Nuevo Usuario");
											setUserAction("NEW");
											setUsingUser(initialValues);
											setShowModal(true);
										}
									},
									{
										label: "Editar",
										icon: "pi pi-pencil",
										command: () => {
											setCustomModalTitle("Editar Usuario");
											setUserAction("UPDATE");
											setUsingUser({
												...selectedUser,
												birthday: parseDate(selectedUser.birthday)
											});
											setShowModal(true);
										},
										disabled: selectedUser == null
									},
									{
										label: "Eliminar",
										icon: "pi pi-trash",
										command: () => {
											alert("eliminar");
										},
										disabled: selectedUser == null
									},
									{
										label: "Seleccionar para trabajar",
										icon: "pi pi-user",
										command: () => {
											alert("seleccionado");
										},
										disabled: selectedUser == null
									},
									{
										label: "Recargar",
										icon: "pi pi-replay",
										command: () => {
											alert("recargar");
										}
									}
								]}
								end={
									<span className="p-input-icon-left">
										<i className="pi pi-search" />
										<InputText
											type="search"
											onInput={(e) => setGlobalFilter(e.target.value)}
											placeholder="Búsqueda"
										/>
									</span>
								}
							/>
							<DataTable
								//filter not contemplated, but can be added later 5/jan/2020
								ref={usersDataTable}
								value={users}
								className="p-datatable-customers"
								dataKey="userId"
								rowHover
								globalFilter={globalFilter}
								selection={selectedUser}
								onSelectionChange={(e) => setSelectedUser(e.value)}
								paginator
								rows={10}
								emptyMessage="Sin usuarios"
								currentPageReportTemplate="Mostrando usuarios de {first} a {last} de un total de {totalRecords}"
								paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
								rowsPerPageOptions={[10, 25, 50]}
								style={{ width: "100%", minWidth: "100%" }}
							>
								<Column selectionMode="single" style={{ width: "3em" }} />

								<Column
									field={fullName.name}
									header={fullName.label}
									body={(rowData) =>
										bodyTemplateFor(
											rowData,
											fullName.label,
											fullName.name,
											true
										)
									}
									sortable
									//filter
									//filterElement={fullNameFilter()}
									style={{ width: "300px" }}
								/>
								<Column
									field={nextFollowup.name}
									header={nextFollowup.label}
									body={(rowData) =>
										bodyTemplateFor(
											rowData,
											nextFollowup.label,
											nextFollowup.name,
											false
										)
									}
									sortable
									sortFunction={nextFollowupSort}
									//filter
									//filterElement={dateRangeFilter(1)}
								/>
								<Column
									field={nextEvaluationReport.name}
									header={nextEvaluationReport.label}
									body={(rowData) =>
										bodyTemplateFor(
											rowData,
											nextEvaluationReport.label,
											nextEvaluationReport.name,
											false
										)
									}
									sortable
									sortFunction={nextEvaluationReportSort}
									//filter
									//filterElement={dateRangeFilter(2)}
								/>
								<Column
									field={sex.name}
									header={sex.label}
									body={(rowData) =>
										bodyTemplateFor(rowData, sex.label, sex.name, false)
									}
									sortable
									//filter
									//filterElement={sexFilter()}
								/>
								<Column
									field={education.name}
									header={education.label}
									body={(rowData) =>
										bodyTemplateFor(
											rowData,
											education.label,
											education.name,
											false
										)
									}
									sortable
									//filter
									//filterElement={educationFilter()}
								/>
								<Column
									field={yearsOld.name}
									header={yearsOld.label}
									body={(rowData) =>
										bodyTemplateFor(
											rowData,
											yearsOld.label,
											yearsOld.name,
											false
										)
									}
									sortable
									//filter
									//filterElement={yearsOldFilter()}
									//filterMatchMode="custom"
									/*filterFunction={(value, filter) => {
										return value >= filter[0] && value <= filter[1];
									}}*/
								/>
							</DataTable>
						</div>
					</Row>
				</Container>
				<SKModal
					title={customModalTitle}
					showModalState={showModal}
					closeButtonFunction={() => {
						setShowModal(false);
					}}
				>
					<Formik
						initialValues={usingUser}
						validationSchema={validationSchema}
						onSubmit={onSubmit}
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
											<div className="p-field">
												<label htmlFor={education.name}>
													{education.label}
												</label>
												<Dropdown
													name={education.name}
													inputId={education.name}
													value={values[education.name]}
													options={educationOptionsUi.current}
													onChange={(e) => {
														setFieldValue(
															education.name,
															e.target.value
														);
													}}
													placeholder={education.placeholder}
												/>
												<small
													id={education.name + "-error"}
													className="p-invalid"
												>
													{touched[education.name] &&
														errors[education.name] &&
														errors[education.name]}
												</small>
											</div>
										</div>
										<div className="p-col-12">
											<div className="p-field">
												<label htmlFor={birthday.name}>
													{birthday.label}
												</label>
												<Calendar
													id={birthday.name}
													name={birthday.name}
													value={values[birthday.name]}
													onChange={(e) => {
														setFieldValue(
															birthday.name,
															dateToString(e.value)
														);
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
												<small
													id={birthday.name + "-error"}
													className="p-invalid"
												>
													{touched[birthday.name] &&
														errors[birthday.name] &&
														errors[birthday.name]}
												</small>
											</div>
										</div>
										<div className="p-col-12 p-mt-3 p-mb-3">
											<Button
												label="Crear"
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
				</SKModal>
			</main>
			<Footer screenName={screenName} />
		</>
	);
};

export default Users;
