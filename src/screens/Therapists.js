import React, { useState, useEffect, useRef } from "react";
import { Image, Container, Row, Tabs, Tab } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { Chips } from "primereact/chips";
import { Messages } from "primereact/messages";
import SKModal from "../components/SKModal";
import FormInput from "../forms/FormInput";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Administracion as screenName } from "../helpers/AppProps";
import {
	defaultImageWhenEmpty,
	stringArrayToPRSelectObjects,
	getTodayDate,
	getPresentYear,
	getNextYear,
	currentYearRange,
	getTwoYearRange,
	getTomorrowFrom,
	parseDate
} from "../helpers/Functions";
import {
	fullName,
	firstName,
	secondName,
	paternalSurname,
	maternalSurname,
	email,
	emails,
	password,
	updatePasswordBool,
	oldPassword,
	newPassword,
	newPasswordConfirm,
	accountState,
	updateRolesBool,
	roleIds,
	createdDate,
	addedDate,
	users,
	sex,
	lastSession,
	isAdmin,
	nextFollowup,
	nextEvaluationReport,
	notes
} from "../forms/Fields";
import TherapistForm from "../forms/TherapistForm";
import UserForm from "../forms/UserForm";
import UserDatesAndNotesForm from "../forms/UserDatesAndNotesForm";
import { useDispatch, useSelector } from "react-redux";
import { getTherapistsList, deleteTherapist, createTherapists } from "../actions/therapistActions";
import { getUsersListFor } from "../actions/userActions";

const Therapists = ({ history }) => {
	const toastRef = useRef(null);
	const therapistsDataTable = useRef(null);
	const deleteTherapistDataTable = useRef(null);
	const currentUsersDataTable = useRef(null);
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
	const { loadingTherapists, therapists } = useSelector((state) => state.therapists);

	if (!therapistInfo) {
		history.push("/login");
	}
	if (!therapistInfo.isAdmin) {
		history.push("/");
		//aqui despues - si muestro un mensaje/toast en dashboard jeje
	}

	useEffect(() => {
		if (therapists.length === 0) dispatch(getTherapistsList(toastRef));
		// eslint-disable-next-line
	}, []);

	//form data
	const therapistInitialValues = {
		[email.name]: email.default,
		[firstName.name]: firstName.default,
		[secondName.name]: secondName.default,
		[paternalSurname.name]: paternalSurname.default,
		[maternalSurname.name]: maternalSurname.default,
		[updatePasswordBool.name]: updatePasswordBool.default,
		[oldPassword.name]: oldPassword.default,
		[newPassword.name]: newPassword.default,
		[newPasswordConfirm.name]: newPasswordConfirm.default,
		[sex.name]: sex.default,
		[accountState.name]: accountState.default,
		[updateRolesBool.name]: updateRolesBool.default,
		[roleIds.name]: roleIds.default
	};

	//ui state

	const [customModalTitle, setCustomModalTitle] = useState("");
	const [customModalButtonText, setCustomModalButtonText] = useState("");
	const [therapistAction, setTherapistAction] = useState(""); //DETAILS, UPDATE
	const [usingTherapist, setUsingTherapist] = useState(therapistInitialValues);
	const [showModal, setShowModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [globalFilter, setGlobalFilter] = useState(null);
	const [globalFilterUsers, setGlobalFilterUsers] = useState(null);
	const [deleteTherapistGlobalFilter, setDeleteTherapistGlobalFilter] = useState(null);
	const [selectedTherapist, setSelectedTherapist] = useState(null);
	const [selectedDeleteTherapist, setSelectedDeleteTherapist] = useState(null);
	const [deleteTherapistContinue, setDeleteTherapistContinue] = useState(false);
	const [selectedEducation, setSelectedEducation] = useState(null);
	const [selectedSex, setSelectedSex] = useState(null);
	const [currentFullName, setCurrentFullName] = useState("");
	const [currentNextFollowup, setCurrentNextFollowup] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [usingUser, setUsingUser] = useState(null);
	const [usingDatesAndNotes, setUsingDatesAndNotes] = useState(null);
	const [loadingUsers, setLoadingUsers] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [createLoading, setCreateLoading] = useState(false);
	const [createDisable, setCreateDisable] = useState(false);
	const createMessageRef = useRef(null);
	const [deleteTherapistsList, setDeleteTherapistsList] = useState([]);
	const [loadingDeleteTherapist, setLoadingDeleteTherapist] = useState(false);

	// methods

	const closeCreateModal = () => {
		setCreateLoading(false);
		setShowCreateModal(false);
	};

	const closeDeleteConfirm = () => {
		setDeleteLoading(false);
		setDeleteTherapistContinue(false);
		setShowDeleteConfirm(false);
		setTimeout(() => {
			setSelectedTherapist(null);
			setDeleteTherapistsList([]);
			setSelectedDeleteTherapist(null);
		}, 1000);
	};

	const createDeleteTherapistsList = () => {
		return new Promise((resolve) => {
			let newTherapists = [...therapists];
			const therapistIndex = newTherapists
				.map((therapist) => therapist.therapistId)
				.indexOf(selectedTherapist.therapistId);
			newTherapists.splice(therapistIndex, 1);
			setDeleteTherapistsList(newTherapists);
			setLoadingDeleteTherapist(false);
		});
	};

	const checkSelfOrAdmin = () => {
		if (selectedTherapist.therapistId === therapistInfo.therapistId) return false;
		if (selectedTherapist.isAdmin) return true;
		return false;
	};

	const handleCreateTherapistSubmit = (form, onSubmitProps) => {
		setCreateLoading(true);
		onSubmitProps.setSubmitting(true);
		dispatch(createTherapists(form, closeCreateModal, toastRef, onSubmitProps.setSubmitting));
	};

	const handleRowDoubleClick = (e) => {
		if (selectedTherapist == null) {
			setSelectedTherapist(e.data);
			return;
		}
		if (selectedTherapist.therapistId === e.data.therapistId) {
			setSelectedTherapist(null);
			return;
		}
		setSelectedTherapist(e.data);
	};

	const handleDeleteTherapistRowDoubleClick = (e) => {
		if (selectedDeleteTherapist == null) {
			setSelectedDeleteTherapist(e.data);
			return;
		}
		if (selectedDeleteTherapist.therapistId === e.data.therapistId) {
			setSelectedDeleteTherapist(null);
			return;
		}
		setSelectedDeleteTherapist(e.data);
	};

	const handleUsersRowDoubleClick = (e) => {
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

	const handleTherapistDelete = () => {
		setDeleteLoading(true);
		dispatch(
			deleteTherapist(
				selectedTherapist.therapistId,
				selectedDeleteTherapist.therapistId,
				deleteTherapistsList,
				closeDeleteConfirm,
				toastRef
			)
		);
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

	const bodyTemplateForSingleColumn = (rowData, columnName, field, image) => {
		return (
			<>
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

	const bodyTemplateIsAdmin = (rowData) => {
		return (
			<>
				<span className="p-column-title">{isAdmin.label}</span>
				{rowData[isAdmin.name] ? "Sí" : "No"}
			</>
		);
	};

	//filters

	//sort methods

	const lastSessionSort = (e) => {
		//sort by closest date
		let result = [...therapistsDataTable.current.props.value].sort(
			(a, b) => b.lastSessionDate - a.lastSessionDate
		);
		//1 = closest - furthest, -1 = furthest - closest
		if (e.order === 1) {
			result.reverse();
		}
		return result;
	};

	//inner components

	const UsersTable = () => {
		return (
			<>
				<span>Seleccione un Usuario para ver sus detalles:</span>
				<br />
				<div className="datatable-doc-demo">
					<DataTable
						ref={currentUsersDataTable}
						value={selectedTherapist.users}
						className="p-datatable-customers"
						dataKey="userId"
						rowHover
						globalFilter={globalFilterUsers}
						selection={selectedUser}
						onSelectionChange={(e) => setSelectedUser(e.value)}
						onRowDoubleClick={(e) => handleUsersRowDoubleClick(e)}
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
								bodyTemplateForSingleColumn(
									rowData,
									fullName.label,
									fullName.name,
									true
								)
							}
							sortable
						/>
					</DataTable>
					<div
						className="p-fluid p-formgrid p-grid"
						style={{ width: "100%", maxWidth: "100%" }}
					>
						<div className="p-col-12 p-mt-3 p-mb-3">
							<Button
								label="Continuar"
								icon="pi pi-arrow-right"
								className="p-button"
								type="button"
								onClick={(e) => {
									setCustomModalTitle(
										"Detalles de Usuario con ID: " +
											(selectedUser ? selectedUser.userId : 0)
									);
									setUsingUser({
										...selectedUser,
										birthday: parseDate(selectedUser.birthday)
									});
									setUsingDatesAndNotes({
										[nextFollowup.name]: selectedUser.nextFollowupDate
											? new Date(selectedUser.nextFollowupDate)
											: null,
										[nextEvaluationReport.name]: selectedUser.nextEvaluationReportDate
											? new Date(selectedUser.nextEvaluationReportDate)
											: null,
										[notes.name]: selectedUser.notesContents
									});
									setTherapistAction("USER");
								}}
								disabled={selectedUser == null}
							/>
						</div>
					</div>
				</div>
			</>
		);
	};

	const ModalContent = () => {
		if (therapistAction === "UPDATE" || therapistAction === "DETAILS") {
			return (
				<TherapistForm
					therapistAction={therapistAction}
					usingTherapist={usingTherapist}
					selectedTherapist={selectedTherapist}
					educationOptionsUi={educationOptionsUi}
					customModalButtonText={customModalButtonText}
					sexOptionsUi={sexOptionsUi}
					setShowModal={setShowModal}
					toastRef={toastRef}
					setSelectedTherapist={setSelectedTherapist}
					therapistInfo={therapistInfo}
					fromProfile={false}
				/>
			);
		}
		if (therapistAction === "USERS") {
			return <UsersTable />;
		}
		if (therapistAction === "USER") {
			return (
				<>
					<Button
						label="Regresar a usuarios"
						icon="pi pi-arrow-left"
						className="p-button p-mt-2 p-mb-2"
						type="button"
						onClick={(e) => setTherapistAction("USERS")}
					/>
					<Tabs defaultActiveKey="details" id="userTabs">
						<Tab eventKey="details" title="Información Básica">
							<UserForm
								userAction="DETAILS"
								usingUser={usingUser}
								selectedUser={selectedUser}
								educationOptionsUi={educationOptionsUi}
								customModalButtonText="Guardar"
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
								customModalButtonText="Guardar"
								userAction="UPDATE"
								setSelectedUser={setSelectedUser}
								toastRef={toastRef}
								therapistId={selectedTherapist.therapistId}
								setSelectedTherapist={setSelectedTherapist}
								fromScreen="therapists"
							/>
						</Tab>
					</Tabs>
				</>
			);
		}
	};

	return (
		<>
			<Header />
			<Toast ref={toastRef} position="top-right" baseZIndex={10000} />
			<main className="py-4">
				<Container>
					<h1 style={{ color: "white" }}>Administración de Terapeutas</h1>
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
										label: "Invitar",
										icon: "pi pi-plus",
										command: () => {
											setCustomModalButtonText("Invitar");
											setTherapistAction("CREATE");
											setShowCreateModal(true);
										}
									},
									{
										label: "Editar",
										icon: "pi pi-pencil",
										command: () => {
											setCustomModalTitle("Editar Terapeuta");
											setCustomModalButtonText("Guardar");
											setTherapistAction("UPDATE");
											setUsingTherapist(selectedTherapist);
											setShowModal(true);
										},
										disabled:
											selectedTherapist == null ||
											checkSelfOrAdmin() ||
											selectedTherapist.accountState === "Pendiente"
									},
									{
										label: "Detalles",
										icon: "pi pi-eye",
										command: () => {
											setCustomModalTitle("Detalles de Terapeuta");
											setCustomModalButtonText("");
											setTherapistAction("DETAILS");
											setUsingTherapist(selectedTherapist);
											setShowModal(true);
										},
										disabled: selectedTherapist == null
									},
									{
										label: "Usuarios",
										icon: "pi pi-users",
										command: () => {
											if (
												selectedTherapist.therapistId ===
												therapistInfo.therapistId
											) {
												document.location.href = "/users";
											} else {
												if (selectedTherapist.users.length === 0) {
													setLoadingUsers(true);
													dispatch(
														getUsersListFor(
															selectedTherapist.therapistId,
															toastRef,
															setLoadingUsers,
															setSelectedTherapist
														)
													);
												}
												setCustomModalTitle("Usuarios de Terapeuta");
												setTherapistAction("USERS");
												setShowModal(true);
											}
										},
										disabled:
											selectedTherapist == null ||
											selectedTherapist.accountState === "Pendiente"
									},
									{
										label: "Eliminar",
										icon: "pi pi-trash",
										command: () => {
											setLoadingDeleteTherapist(true);
											createDeleteTherapistsList();
											if (selectedTherapist.accountState === "Pendiente") {
												setDeleteTherapistContinue(true);
											} else {
												setDeleteTherapistContinue(false);
											}
											setShowDeleteConfirm(true);
										},
										disabled:
											selectedTherapist == null || selectedTherapist.isAdmin
									},
									{
										label: "Recargar",
										icon: "pi pi-replay",
										command: () => {
											setSelectedTherapist(null);
											dispatch(getTherapistsList(toastRef));
										},
										disabled: loadingTherapists
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
								ref={therapistsDataTable}
								value={therapists}
								className="p-datatable-customers"
								dataKey="therapistId"
								rowHover
								globalFilter={globalFilter}
								selection={selectedTherapist}
								onSelectionChange={(e) => setSelectedTherapist(e.value)}
								onRowDoubleClick={(e) => handleRowDoubleClick(e)}
								paginator
								rows={10}
								emptyMessage="Sin terapeutas"
								currentPageReportTemplate="Mostrando terapeutas de {first} a {last} de un total de {totalRecords}"
								paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
								rowsPerPageOptions={[10, 25, 50]}
								loading={loadingTherapists}
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
									field={email.name}
									header={email.label}
									body={(rowData) =>
										bodyTemplateFor(rowData, email.label, email.name, false)
									}
									sortable
									style={{ width: "250px", wordWrap: "break-word" }}
								/>
								<Column
									field={lastSession.name}
									header={lastSession.label}
									body={(rowData) =>
										bodyTemplateFor(
											rowData,
											lastSession.label,
											lastSession.name,
											false
										)
									}
									sortable
									sortFunction={lastSessionSort}
								/>
								<Column
									field={isAdmin.name}
									header={isAdmin.label}
									body={(rowData) => bodyTemplateIsAdmin(rowData)}
									sortable
								/>
								<Column
									field={accountState.name}
									header={accountState.label}
									body={(rowData) =>
										bodyTemplateFor(
											rowData,
											accountState.label,
											accountState.name,
											false
										)
									}
									sortable
								/>
							</DataTable>
						</div>
					</Row>
				</Container>
				<SKModal
					title={
						customModalTitle +
						(therapistAction === "UPDATE"
							? " con ID: " + (selectedTherapist && selectedTherapist.therapistId)
							: "")
					}
					showModalState={showModal}
					closeButtonFunction={() => {
						if (therapistAction === "USERS" || therapistAction === "USER") {
							setTimeout(() => {
								setSelectedUser(null);
								setUsingUser(null);
							}, 1000);
						}
						setShowModal(false);
					}}
				>
					<ModalContent />
				</SKModal>
				<Dialog
					header={
						"Eliminar Terapeuta con ID: " +
						(selectedTherapist ? selectedTherapist.therapistId : 0)
					}
					visible={showDeleteConfirm}
					modal
					style={{ width: "50vw", textAlign: "left" }}
					onHide={() => {
						setDeleteTherapistContinue(false);
						setShowDeleteConfirm(false);
						setTimeout(() => {
							setSelectedDeleteTherapist(null);
							setDeleteTherapistsList([]);
						}, 1000);
					}}
				>
					{!deleteTherapistContinue && (
						<>
							<span>
								Antes de eliminar a{" "}
								{selectedTherapist && selectedTherapist.fullName}, favor de
								seleccionar a otro Terapeuta para asignar sus usuarios:
							</span>
							<br />
							<DataTable
								ref={deleteTherapistDataTable}
								value={deleteTherapistsList}
								className="p-datatable-customers"
								dataKey="therapistId"
								rowHover
								globalFilter={deleteTherapistGlobalFilter}
								selection={selectedDeleteTherapist}
								onSelectionChange={(e) => setSelectedDeleteTherapist(e.value)}
								onRowDoubleClick={(e) => handleDeleteTherapistRowDoubleClick(e)}
								paginator
								rows={10}
								emptyMessage="Sin terapeutas"
								currentPageReportTemplate="Mostrando terapeutas de {first} a {last} de un total de {totalRecords}"
								paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
								rowsPerPageOptions={[10, 25, 50]}
								loading={loadingDeleteTherapist}
								loadingIcon="pi pi-spinner"
								style={{ width: "100%", minWidth: "100%" }}
							>
								<Column selectionMode="single" style={{ width: "3em" }} />

								<Column
									field={fullName.name}
									header={fullName.label}
									body={(rowData) =>
										bodyTemplateForSingleColumn(
											rowData,
											fullName.label,
											fullName.name,
											true
										)
									}
									sortable
								/>
							</DataTable>
							<div
								className="p-fluid p-formgrid p-grid"
								style={{ width: "100%", maxWidth: "100%" }}
							>
								<div className="p-col-12 p-mt-3 p-mb-3">
									<Button
										label="Continuar"
										icon="pi pi-arrow-right"
										className="p-button" //p-mb-3 p-mt-3
										type="button"
										onClick={(e) => setDeleteTherapistContinue(true)}
										disabled={selectedDeleteTherapist == null}
									/>
								</div>
							</div>
						</>
					)}
					{deleteTherapistContinue && (
						<>
							<div className="confirmation-content">
								<i
									className="pi pi-exclamation-triangle p-mr-3"
									style={{ fontSize: "2rem" }}
								/>
								{selectedTherapist && (
									<>
										{selectedTherapist.accountState === "Pendiente" && (
											<span>
												¿Está seguro que quiere eliminar a{" "}
												{selectedTherapist && selectedTherapist.fullName}?
											</span>
										)}
										{selectedTherapist.accountState !== "Pendiente" && (
											<span>
												¿Está seguro que quiere eliminar a{" "}
												{selectedTherapist && selectedTherapist.fullName},
												sus registros y asignar sus usuarios a{" "}
												{selectedDeleteTherapist &&
													selectedDeleteTherapist.fullName}
												?
											</span>
										)}
									</>
								)}
							</div>
							<div
								className="p-fluid p-formgrid p-grid"
								style={{ width: "100%", maxWidth: "100%" }}
							>
								<div className="p-col-6 p-mt-3 p-mb-3">
									{selectedTherapist && (
										<>
											{selectedTherapist.accountState !== "Pendiente" && (
												<Button
													label="Regresar"
													icon="pi pi-arrow-left"
													className="p-button"
													type="button"
													onClick={(e) =>
														setDeleteTherapistContinue(false)
													}
													disabled={deleteLoading}
												/>
											)}
											{selectedTherapist.accountState === "Pendiente" && (
												<Button
													label="Cancelar"
													icon="pi pi-times"
													className="p-button p-button-danger"
													type="button"
													onClick={(e) => {
														setShowDeleteConfirm(false);
														setSelectedDeleteTherapist(null);
														setDeleteTherapistsList([]);
													}}
												/>
											)}
										</>
									)}
								</div>
								<div className="p-col-6 p-mt-3 p-mb-3">
									<Button
										label="Aceptar"
										icon="pi pi-check"
										className="p-button p-button-success"
										type="button"
										onClick={handleTherapistDelete}
										disabled={deleteLoading}
									/>
								</div>
								{deleteLoading && (
									<div className="p-col-12 p-mt-1 p-mb-1">
										<ProgressBar
											mode="indeterminate"
											style={{ height: "6px" }}
										></ProgressBar>
									</div>
								)}
							</div>
						</>
					)}
				</Dialog>
				<Dialog
					header="Invitar nuevos Terapeutas"
					visible={showCreateModal}
					modal
					style={{ width: "50vw", textAlign: "left" }}
					onHide={() => setShowCreateModal(false)}
				>
					<span>
						Favor de ingresar las direcciones de correos electrónico de Terapeutas
						(separados por coma) que desee formen parte de la plataforma:
					</span>
					<Formik
						initialValues={{
							[emails.name]: emails.default,
							[password.name]: password.default
						}}
						validationSchema={yup.object().shape({
							[emails.name]: emails.validation,
							[password.name]: password.validation
						})}
						onSubmit={handleCreateTherapistSubmit}
					>
						{(formik) => {
							const {
								values,
								isSubmitting,
								isValid,
								setFieldValue,
								touched,
								errors,
								setFieldTouched
							} = formik;
							return (
								<Form>
									<div
										className="p-fluid p-formgrid p-grid"
										style={{ width: "100%", maxWidth: "100%" }}
									>
										<div className="p-col-12 p-field p-mt-2">
											<Messages ref={createMessageRef} />
											<label
												id={emails.name + "-label"}
												htmlFor={emails.name}
											>
												{emails.label}
											</label>
											{createDisable && (
												<ul>
													{values[emails.name].map((email) => (
														<li key={email}>{email}</li>
													))}
												</ul>
											)}
											{!createDisable && (
												<>
													<Chips
														id={emails.name}
														value={values[emails.name]}
														onChange={(e) => {
															setFieldValue(emails.name, e.value);
														}}
														separator=","
														placeholder={emails.placeholder}
														max={10} //aqui despues
														ariaLabelledBy={emails.name + "-helper"}
														allowDuplicate={false}
														onBlur={(e) => {
															setFieldTouched(emails.name, true);
														}}
														disabled={createDisable}
													/>
													<small id={emails.name + "-helper"}>
														Máximo: 10 direcciones. Ej. john@doe.com,
														carmen@hotmail.com, etc.
													</small>
													<br />
													<small
														id={emails.name + "-error"}
														className="p-invalid"
													>
														{touched[emails.name] &&
															errors[emails.name] &&
															errors[emails.name]}
													</small>
												</>
											)}
										</div>
										<div className="p-col-12">
											<FormInput
												inputName={password.name}
												labelText={password.label}
												placeholder={password.placeholder}
												type="password"
												disabled={createDisable}
											/>
										</div>
										<div className="p-col-6 p-mt-3 p-mb-3">
											<Button
												label={createDisable ? "Regresar" : "Cancelar"}
												icon={
													createDisable
														? "pi pi-arrow-left"
														: "pi pi-times"
												}
												className={
													"p-button " +
													(createDisable ? "" : "p-button-danger")
												}
												onClick={(e) => {
													if (createDisable) {
														setCreateDisable(false);
														createMessageRef.current.clear();
													} else {
														setShowCreateModal(false);
													}
												}}
												disabled={isSubmitting || createLoading}
												type="button"
											/>
										</div>
										<div className="p-col-6 p-mt-3 p-mb-3">
											{createDisable && (
												<Button
													label={customModalButtonText}
													icon="pi pi-check"
													className="p-button p-button-success"
													type="submit"
													disabled={
														!isValid || isSubmitting || createLoading
													}
												/>
											)}
											{!createDisable && (
												<Button
													label="Continuar"
													icon="pi pi-arrow-right"
													className="p-button"
													disabled={!isValid}
													onClick={(e) => {
														setCreateDisable(true);
														createMessageRef.current.clear();
														createMessageRef.current.show([
															{
																severity: "warn",
																summary: "",
																detail:
																	"Al introducir su contraseña y presionar “Invitar”, está seguro de que las direcciones de correo electrónico introducidas son las correctas.",
																sticky: true
															}
														]);
													}}
												/>
											)}
										</div>
										{createLoading && (
											<div className="p-col-12 p-mt-1 p-mb-1">
												<ProgressBar
													mode="indeterminate"
													style={{ height: "6px" }}
												></ProgressBar>
											</div>
										)}
									</div>
								</Form>
							);
						}}
					</Formik>
				</Dialog>
			</main>
			<Footer screenName={screenName} />
		</>
	);
};

export default Therapists;
