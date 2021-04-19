import React, { useState, useEffect, useRef } from "react";
import { Image, Container, Row, Tabs, Tab } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
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
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, deleteUser } from "../actions/userActions";

const Users = ({ history }) => {
	const toastRef = useRef(null);
	const usersDataTable = useRef(null);
	const educationOptionsUi = useRef(
		stringArrayToPRSelectObjects([
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
		])
	); //aqui despues
	const sexOptionsUi = useRef(stringArrayToPRSelectObjects(["Hombre", "Mujer"])); //aqui despues

	const birthdayYearRangeRef = useRef(currentYearRange());
	const twoYearRangeRef = useRef(getTwoYearRange());
	const presentYearRef = useRef(getPresentYear());
	const nextYearRef = useRef(getNextYear());
	const todayDateRef = useRef(getTodayDate());
	const tomorrowDateRef = useRef(getTomorrowFrom(todayDateRef.current.getTime()));

	const dispatch = useDispatch();
	const { therapistInfo } = useSelector((state) => state.therapistLogin);
	const { loadingUsers, users } = useSelector((state) => state.users);

	useEffect(() => {
		if (therapistInfo) {
			if (users.length === 0) dispatch(getUsersList(therapistInfo.therapistId, toastRef));
		}
		// eslint-disable-next-line
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
	const [userAction, setUserAction] = useState(""); // CREATE, DETAILS, UPDATE
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
	const [deleteLoading, setDeleteLoading] = useState(false);

	if (!therapistInfo) {
		history.push("/login");
		return <></>;
	}

	//methods

	const closeDeleteConfirm = () => {
		setDeleteLoading(false);
		setShowDeleteConfirm(false);
		setTimeout(() => {
			setSelectedUser(null);
		}, 1000);
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
		setDeleteLoading(true);
		dispatch(deleteUser(selectedUser.userId, closeDeleteConfirm, toastRef));
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
				<Button
					label="Sí"
					icon="pi pi-check"
					onClick={handleUserDelete}
					disabled={deleteLoading}
				/>
				{deleteLoading && (
					<div className="p-col-12 p-mt-1 p-mb-1">
						<ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
					</div>
				)}
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
					toastRef={toastRef}
					setSelectedUser={setSelectedUser}
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
							toastRef={toastRef}
							setSelectedUser={setSelectedUser}
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
							setSelectedUser={setSelectedUser}
							toastRef={toastRef}
							fromScreen="users"
							setUsingDatesAndNotes={setUsingDatesAndNotes}
						/>
					</Tab>
				</Tabs>
			);
		}
	};

	return (
		<>
			<Header />
			<Toast ref={toastRef} position="top-right" baseZIndex={10000} />
			<main className="py-4">
				<Container>
					<h1 style={{ color: "white" }}>Usuarios</h1>
					<div id="dashboardA">
						<a href="/">
							<i className="pi pi-arrow-left"></i> Regresar a Dashboard
						</a>
					</div>
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
												[nextFollowup.name]: selectedUser.nextFollowupDate
													? new Date(selectedUser.nextFollowupDate)
													: null,
												[nextEvaluationReport.name]: selectedUser.nextEvaluationReportDate
													? new Date(
															selectedUser.nextEvaluationReportDate
													  )
													: null,
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
											setSelectedUser(null);
											dispatch(
												getUsersList(therapistInfo.therapistId, toastRef)
											);
										},
										disabled: loadingUsers
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
								loading={loadingUsers}
								loadingIcon="pi pi-spinner"
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
