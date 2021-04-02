import React, { useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ScrollPanel } from "primereact/scrollpanel";
import { Dialog } from "primereact/dialog";
import { updateRolesBool, roleIds } from "./Fields";

//inner components

const Inside = (props) => {
	const {
		therapistAction,
		usingTherapist,
		selectedRole,
		setSelectedRole,
		setRoleDetails,
		roleDetails,
		setFieldValue,
		isSelf,
		showAdminDialog,
		setShowAdminDialog,
		selectedTherapist,
		adminMessageRef,
		disabled
	} = props;

	//methods

	const handleAddAdminRole = (e) => {
		setFieldValue(updateRolesBool.name, "true");
		setFieldValue(roleIds.name, [1, 2]);
		adminMessageRef.current.replace({
			//aqui checar que funcione
			severity: "info",
			summary: "",
			detail: "Se agregará rol de Administrador al guardar Terapeuta.",
			closable: true,
			sticky: true
		});
	};

	const renderAdminConfirmFooter = (e) => {
		return (
			<div>
				<Button
					label="No"
					icon="pi pi-times"
					onClick={(e) => setShowAdminDialog(false)}
					className="p-button-text"
				/>
				<Button label="Sí" icon="pi pi-check" onClick={handleAddAdminRole} />
			</div>
		);
	};

	return (
		<>
			<Dialog
				header={
					"Rol de Administrador a Terapeuta con ID: " +
					(selectedTherapist ? selectedTherapist.therapistId : 0)
				}
				visible={showAdminDialog}
				modal
				style={{ width: "350px" }}
				footer={renderAdminConfirmFooter()}
				onHide={() => setShowAdminDialog(false)}
			>
				<div className="confirmation-content">
					<i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: "2rem" }} />
					<span>
						¿Está seguro que quiere agregar el rol de Administrador a{" "}
						{selectedTherapist && selectedTherapist.fullName}?
					</span>
					<span>
						Permisos: dar de alta y modificar terapeutas y puede ver la información de
						los mismos y sus usuarios, sin poder modificar los últimos.
					</span>
					<span>
						<strong>Notas importantes:</strong> este rol no puede ser eliminado por otro
						administrador, solo agregado.
					</span>
				</div>
			</Dialog>
			{therapistAction === "DETAILS" ||
				(therapistAction === "UPDATE" && (
					<div className="p-col-12">
						<hr />
						<h6>Roles</h6>
					</div>
				))}
			<div className="p-col-12 p-md-8 p-lg-8">
				<DataTable
					value={usingTherapist.roleDtos}
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
				<ScrollPanel style={{ width: "96%", height: "50vh" }}>{roleDetails}</ScrollPanel>
			</div>
			{therapistAction === "UPDATE" && !isSelf && !selectedTherapist.isAdmin && !disabled && (
				<>
					<div className="p-col-12 p-mt-3 p-mb-3">
						<Button
							label="Agregar rol de Administrador"
							type="button"
							icon="pi pi-users"
							className="p-button p-button-warning"
							onClick={(e) => setShowAdminDialog(true)}
						/>
					</div>
				</>
			)}
		</>
	);
};

const TherapistRoles = (props) => {
	const [showAdminDialog, setShowAdminDialog] = useState(false);
	const [selectedRole, setSelectedRole] = useState(null);
	const [roleDetails, setRoleDetails] = useState("Seleccione un rol para ver sus detalles.");

	return (
		<Inside
			{...props}
			showAdminDialog={showAdminDialog}
			setShowAdminDialog={setShowAdminDialog}
			selectedRole={selectedRole}
			setSelectedRole={setSelectedRole}
			roleDetails={roleDetails}
			setRoleDetails={setRoleDetails}
		/>
	);
};

TherapistRoles.defaultProps = {
	isSelf: false
};

export default TherapistRoles;
