import React, { useState, useEffect, useRef } from "react";
import { Image, Container, Row, Tabs, Tab } from "react-bootstrap";
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
import { Dialog } from "primereact/dialog";
import SKModal from "../components/SKModal";
import { Usuarios as screenName, spanishCalendarProps } from "../helpers/AppProps";
import {
	defaultImageWhenEmpty,
	parseDate,
	stringArrayToPRSelectObjects,
	getTodayDate,
	getPresentYear,
	getNextYear,
	currentYearRange,
	getTwoYearRange,
	getTomorrowFrom
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
	nextEvaluationReport,
	notes
} from "../forms/Fields";
import UserForm from "../forms/UserForm";
import UserDatesAndNotesForm from "../forms/UserDatesAndNotesForm";

const Users = () => {
	//const users = useRef(null);
	const [users, setUsers] = useState([]);
	const usersDataTable = useRef(null);
	const educationOptionsUi = useRef();
	const sexOptionsUi = useRef([]);

	const birthdayYearRangeRef = useRef("");
	const twoYearRangeRef = useRef("");
	const presentYearRef = useRef(new Date());
	const nextYearRef = useRef(new Date());
	const todayDateRef = useRef(new Date());
	const tomorrowDateRef = useRef(new Date());

	useEffect(() => {
		//aqui falta, usersService se obtiene de redux o algo
		let usersService2 = [
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
				//notes: '{"contents":""}',
				notes:
					"{\"contents\":\"<p>ksksksksksksksk</p><p><br></p><p><br></p><p>algo</p><p><strong> con estiloddd</strong>d<strong>d</strong></p><p><strong>ddddd</strong></p><p><br></p><p><br></p><p><strong class='ql-font-serif'>ddddddd</strong></p><p><br></p><p><br></p><p><strong class='ql-font-serif' style='background-color: rgb(255, 255, 0);'>hola </strong><strong style='color: rgb(73, 80, 87); background-color: rgb(255, 255, 0);'>hola hola hola hola hola </strong></p>\"}",
				nextFollowup: "30/12/2020",
				nextEvaluationReport: "30/12/2020",
				yearsOld: 24,
				next5DaysForEvaluationReport: "04/01/2021",
				next5DaysForFollowup: "04/01/2021",
				fullName: "josué  moralesññññ ornelaééééáús"
			}
		]; //aqui quitar
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
				notes:
					'{\'contents\':\'<p>ksksksksksksksk</p><p><br></p><p><br></p><p>algo</p><p><strong> con estiloddd</strong>d<strong>d</strong></p><p><strong>ddddd</strong></p><p><br></p><p><br></p><p><strong class="ql-font-serif">ddddddd</strong></p><p><br></p><p><br></p><p><strong class="ql-font-serif" style="background-color: rgb(255, 255, 0);">hola </strong><strong style="color: rgb(73, 80, 87); background-color: rgb(255, 255, 0);">hola hola hola hola hola </strong></p>\'}',
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
				secondName: "",
				paternalSurname: "hernández",
				maternalSurname: "ornelas",
				education: "prepa",
				sex: "Hombre",
				birthday: "12/02/1996",
				addedDate: "05/10/2020 00:45:32",
				imageUrl:
					"https://s3.us-east-2.amazonaws.com/superakids-bucket/user/img/user-2.gif",
				notes: '{"contents": "<p>string con áéúgh y ññññ jeje</p>"}',
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
				notes: '{"contents": "<p>string con áéúgh y ññññ jeje</p>"}',
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
				notes: '{"contents": "<p>string con áéúgh y ññññ jeje</p>"}',
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
				notes: '{"contents": ""}',
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
				notes: '{"contents": ""}',
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
				notes: '{"contents": ""}',
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
				notes: '{"contents": ""}',
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
				notes: '{"contents": ""}',
				nextFollowup: "15/12/2020",
				nextEvaluationReport: "22/11/2020",
				yearsOld: 1,
				next5DaysForEvaluationReport: "27/11/2020",
				next5DaysForFollowup: "20/12/2020",
				fullName: "eefefeijefij  morales ornelas"
			}
		];
		setUsers(addDateObjectsTo(usersService2));

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

		//initialize attributes only once
		birthdayYearRangeRef.current = currentYearRange();
		twoYearRangeRef.current = getTwoYearRange();
		presentYearRef.current = getPresentYear();
		nextYearRef.current = getNextYear();
		todayDateRef.current = getTodayDate();
		tomorrowDateRef.current = getTomorrowFrom(todayDateRef.current.getTime());
	}, []);

	//form data
	const userInitialValues = {
		[firstName.name]: firstName.default,
		[secondName.name]: secondName.default,
		[paternalSurname.name]: paternalSurname.default,
		[maternalSurname.name]: maternalSurname.default,
		[sex.name]: sex.default,
		[education.name]: education.default,
		[birthday.name]: birthday.default
	};
	const datesAndNotesInitialValues = {
		[nextFollowup.name]: nextFollowup.default,
		[nextEvaluationReport.name]: nextEvaluationReport.default,
		[notes.name]: notes.default
	};

	//ui state

	const [customModalTitle, setCustomModalTitle] = useState("");
	const [customModalButtonText, setCustomModalButtonText] = useState("");
	const [userAction, setUserAction] = useState(""); // CREATE or UPDATE only
	const [usingUser, setUsingUser] = useState(userInitialValues);
	const [usingDatesAndNotes, setUsingDatesAndNotes] = useState(datesAndNotesInitialValues);
	const [showModal, setShowModal] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [globalFilter, setGlobalFilter] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [selectedEducation, setSelectedEducation] = useState(null);
	const [selectedSex, setSelectedSex] = useState(null);
	const [currentFullName, setCurrentFullName] = useState("");
	const [currentYearsOld, setCurrentYearsOld] = useState([0, 100]);
	const [currentNextFollowup, setCurrentNextFollowup] = useState(null);

	//methods

	const addDateObjectsTo = (tempUsers) => {
		console.log("procesando usuarios"); //aqui quitar
		return tempUsers.map((user, i) => {
			user.nextFollowupDate = parseDate(user.nextFollowup);
			user.nextEvaluationReportDate = parseDate(user.nextEvaluationReport);
			console.log("index: " + i);
			console.log(user.notes);
			let tempObj = JSON.parse(user.notes);
			user.notesContents = tempObj.contents;
			return user;
		});
	};

	const handleRowDoubleClick = (e) => {
		if (selectedUser == null) {
			setSelectedUser(e.data);
			return;
		}
		if (selectedUser.userId === e.data.userId) {
			setSelectedUser(null);
			return;
		}
		setSelectedUser(e.data);
	};

	const handleUserDelete = () => {
		//aqui falta todo

		console.log("se elimino a usuario");
		setShowDeleteConfirm(false);
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

	//inner components

	const renderDeleteConfirmFooter = () => {
		return (
			<div>
				<Button
					label="No"
					icon="pi pi-times"
					onClick={() => setShowDeleteConfirm(false)}
					className="p-button-text"
				/>
				<Button label="Sí" icon="pi pi-check" onClick={handleUserDelete} />
			</div>
		);
	};

	const modalContent = () => {
		if (userAction === "CREATE") {
			return (
				<UserForm
					userAction={userAction}
					usingUser={usingUser}
					selectedUser={selectedUser}
					educationOptionsUi={educationOptionsUi}
					customModalButtonText={customModalButtonText}
					sexOptionsUi={sexOptionsUi}
					setShowModal={setShowModal}
				/>
			);
		} else {
			return (
				<Tabs defaultActiveKey="details" id="userTabs">
					<Tab eventKey="details" title="Información Básica">
						<UserForm
							userAction={userAction}
							usingUser={usingUser}
							selectedUser={selectedUser}
							educationOptionsUi={educationOptionsUi}
							customModalButtonText={customModalButtonText}
							sexOptionsUi={sexOptionsUi}
							setShowModal={setShowModal}
						/>
					</Tab>
					<Tab eventKey="datesAndNotes" title="Fechas y Notas">
						<UserDatesAndNotesForm
							usingDatesAndNotes={usingDatesAndNotes}
							twoYearRangeRef={twoYearRangeRef}
							selectedUser={selectedUser}
							tomorrowDateRef={tomorrowDateRef}
							todayDateRef={todayDateRef}
							presentYearRef={presentYearRef}
							nextYearRef={nextYearRef}
							customModalButtonText={customModalButtonText}
							userAction={userAction}
						/>
					</Tab>
				</Tabs>
			);
		}
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
											setCustomModalButtonText("Crear");
											setUserAction("CREATE");
											setUsingUser(userInitialValues);
											setShowModal(true);
										}
									},
									{
										label: "Editar",
										icon: "pi pi-pencil",
										command: () => {
											setCustomModalTitle("Editar Usuario");
											setCustomModalButtonText("Guardar");
											setUserAction("UPDATE");
											setUsingUser({
												...selectedUser,
												birthday: parseDate(selectedUser.birthday)
											});
											setUsingDatesAndNotes({
												[nextFollowup.name]: selectedUser.nextFollowupDate,
												[nextEvaluationReport.name]:
													selectedUser.nextEvaluationReportDate,
												[notes.name]: selectedUser.notesContents
											});
											setShowModal(true);
										},
										disabled: selectedUser == null
									},
									{
										label: "Eliminar",
										icon: "pi pi-trash",
										command: () => {
											setShowDeleteConfirm(true);
										},
										disabled: selectedUser == null
									},
									{
										label: "Recargar",
										icon: "pi pi-replay",
										command: () => {
											//aqui falta todo
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
								onRowDoubleClick={(e) => handleRowDoubleClick(e)}
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
					title={
						customModalTitle +
						(userAction === "UPDATE"
							? " con ID: " + (selectedUser && selectedUser.userId)
							: "")
					}
					showModalState={showModal}
					closeButtonFunction={() => {
						setShowModal(false);
					}}
				>
					{modalContent()}
				</SKModal>
				<Dialog
					header={"Eliminar Usuario con ID: " + (selectedUser ? selectedUser.userId : 0)}
					visible={showDeleteConfirm}
					modal
					style={{ width: "350px" }}
					footer={renderDeleteConfirmFooter()}
					onHide={() => setShowDeleteConfirm(false)}
				>
					<div className="confirmation-content">
						<i
							className="pi pi-exclamation-triangle p-mr-3"
							style={{ fontSize: "2rem" }}
						/>
						<span>
							¿Está seguro que quiere eliminar a{" "}
							{selectedUser && selectedUser.fullName} y todos sus registros?
						</span>
					</div>
				</Dialog>
			</main>
			<Footer screenName={screenName} />
		</>
	);
};

export default Users;
