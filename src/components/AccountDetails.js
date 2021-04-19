import React, { useState, useRef } from "react";
import { Image, Tabs, Tab } from "react-bootstrap";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ScrollPanel } from "primereact/scrollpanel";
import SKModal from "./SKModal";
import TherapistForm from "../forms/TherapistForm";
import {
	stringArrayToPRSelectObjects,
	parseDateTime,
	dateTimeToString
} from "../helpers/Functions";
import { defaultImageWhenEmpty } from "../helpers/Functions";
import { useDispatch } from "react-redux";
import { logout } from "../actions/therapistActions";
import { Toast } from "primereact/toast";

const AccountDetails = ({ therapistInfo }) => {
	const sexOptionsUi = useRef(stringArrayToPRSelectObjects(["Hombre", "Mujer"])); //aqui despues
	const toastRef = useRef(null);

	const dispatch = useDispatch();
	const loggedTherapist = therapistInfo;

	//ui state
	const [showModal, setShowModal] = useState(false);
	const [selectedRole, setSelectedRole] = useState(null);
	const [roleDetails, setRoleDetails] = useState("Seleccione un rol para ver sus detalles.");
	const [disabledSignOutButton, setDisabledSignOutButton] = useState(false);

	// methods

	const closeModal = () => {
		setShowModal(false);
	};

	const signOut = () => {
		dispatch(logout());
		setDisabledSignOutButton(true);
	};

	return (
		<div id="AccountDetailsDiv">
			<Toast ref={toastRef} position="top-right" baseZIndex={10000} />
			<div style={{ marginBottom: "5vh" }}>
				<h1>Cuenta</h1>
				<Image
					src={defaultImageWhenEmpty(loggedTherapist.imageUrl)}
					style={{ marginBottom: "25px" }}
					className="p-shadow-2 rounded-image rounded-image-big"
				/>
				<h4 style={{ marginBottom: "10px" }}>{loggedTherapist.fullName}</h4>
				<h5 style={{ marginBottom: "10px", fontStyle: "italic" }}>
					Terapeuta (ID: {loggedTherapist.therapistId})
				</h5>
				<p style={{ marginBottom: "10px" }}>{loggedTherapist.email}</p>
				<p style={{ marginBottom: "10px" }}>
					Fecha de afilicación: <br /*aqui despues - importar desde Fields*/ />
					{dateTimeToString(parseDateTime(loggedTherapist.addedDate))}
				</p>
				<p style={{ marginBottom: "10px" }}>
					Fecha de creación de cuenta: <br />
					{dateTimeToString(parseDateTime(loggedTherapist.createdDate))}
				</p>
			</div>
			<Button
				label="Modificar Cuenta y Roles"
				icon="pi pi-id-card"
				className="p-button-raised p-button-info"
				style={{ marginBottom: "10px", width: "100%" }}
				onClick={() => {
					setShowModal(true);
				}}
			/>
			<Button
				label="Cerrar Sesión"
				icon="pi pi-sign-out"
				className="p-button-raised p-button-danger"
				style={{ width: "100%" }}
				onClick={signOut}
				disabled={disabledSignOutButton}
			/>
			<SKModal
				title="Modificar Cuenta y Roles"
				showModalState={showModal}
				closeButtonFunction={() => {
					closeModal();
				}}
			>
				<Tabs defaultActiveKey="update" id="therapistModalTabs">
					<Tab eventKey="update" title="Modificar" className="scrollable-tab">
						<TherapistForm
							therapistAction="UPDATE"
							usingTherapist={loggedTherapist}
							selectedTherapist={loggedTherapist}
							customModalButtonText="Guardar Cambios"
							setShowModal={setShowModal}
							toastRef={toastRef}
							therapistInfo={loggedTherapist}
							fromProfile
							sexOptionsUi={sexOptionsUi}
						/>
					</Tab>
					<Tab
						eventKey="roles"
						title="Roles"
						className="scrollable-tab"
						style={{ overflowX: "hidden" }}
					>
						<div className="p-fluid p-formgrid p-grid">
							<div className="p-col-12 p-md-8 p-lg-8">
								<DataTable
									value={loggedTherapist.roleDtos}
									selectionMode="single"
									selection={selectedRole}
									onSelectionChange={(e) => setSelectedRole(e.value)}
									dataKey="therapistRoleId"
									onRowSelect={(e) => {
										setRoleDetails(e.data.description);
									}}
									scrollable
									scrollHeight="50vh"
								>
									<Column field="name" header="Nombre"></Column>
									<Column field="timestamp" header="Fecha de Asignación"></Column>
								</DataTable>
							</div>
							<div className="p-col-12 p-md-4 p-lg-4 no-padding">
								<DataTable>
									<Column field="n" header="Detalles de Rol"></Column>
								</DataTable>
								<ScrollPanel style={{ width: "96%", height: "50vh" }}>
									{roleDetails}
								</ScrollPanel>
							</div>
						</div>
					</Tab>
				</Tabs>
			</SKModal>
		</div>
	);
};

export default AccountDetails;
