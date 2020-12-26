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
import { Usuarios as screenName } from "../helpers/AppProps";
import { defaultImageWhenEmpty } from "../helpers/Functions";
import {
	fullName,
	sex,
	yearsOld,
	birthday,
	nextFollowup,
	nextEvaluationReport,
	education
} from "../forms/Fields";

const Users = () => {
	const usersDataTable = useRef(null);
	//aqui falta - se obtiene de session, tal vez usar spread operator para hacer copia y que se quede guardado
	const educationOptions = useRef([
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
	//aqui falta - se obtiene de session, tal vez usar spread operator para hacer copia y que se quede guardado
	const sexOptions = useRef(["Hombre", "Mujer"]);

	//aqui falta, se obtiene de redux o algo
	let users = [
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
			imageUrl: "https://s3.us-east-2.amazonaws.com/superakids-bucket/user/img/user-2.gif",
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
		}
	];

	//ui state
	const [globalFilter, setGlobalFilter] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [selectedEducation, setSelectedEducation] = useState(null);
	const [selectedSex, setSelectedSex] = useState(null);

	//methods

	//table components
	const tableHeader = () => {
		return (
			<div className="table-header">
				List of Customers
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText
						//aqui no he cambiado nada
						type="search"
						onInput={(e) => setGlobalFilter(e.target.value)}
						placeholder="Global Search"
					/>
				</span>
			</div>
		);
	};

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

	const actionBodyTemplate = () => {
		return <Button type="button" icon="pi pi-cog" className="p-button-secondary"></Button>;
	};

	//filters

	const educationFilter = () => {
		return (
			<Dropdown
				value={selectedEducation}
				options={educationOptions.current}
				onChange={onEducationFilterChange}
				showClear
				placeholder={education.placeholder}
				className="p-column-filter"
			/>
		);
	};
	const onEducationFilterChange = (e) => {
		usersDataTable.current.filter(e.value, education.name, "equals");
		setSelectedEducation(e.value);
	};

	const sexFilter = () => {
		return (
			<Dropdown
				value={selectedSex}
				options={sexOptions.current}
				onChange={onSexFilterChange}
				showClear
				placeholder={sex.placeholder}
				className="p-column-filter"
			/>
		);
	};
	const onSexFilterChange = (e) => {
		usersDataTable.current.filter(e.value, sex.name, "equals");
		setSelectedSex(e.value);
	};

	return (
		<>
			<Header />
			<main className="py-4">
				<Container>
					<h1 style={{ color: "white" }}>Usuarios</h1>
					<Row>
						<div className="datatable-doc-demo">
							<DataTable
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
									filter
									filterPlaceholder={fullName.placeholder}
								/>

								<Column
									field={sex.name}
									header={sex.label}
									body={(rowData) =>
										bodyTemplateFor(rowData, sex.label, sex.name, false)
									}
									filter
									filterElement={sexFilter()}
								/>

								<Column
									field={birthday.name}
									header={birthday.label}
									body={(rowData) =>
										bodyTemplateFor(
											rowData,
											birthday.label,
											birthday.name,
											false
										)
									}
									sortable
									filter
									//filterElement={sexFilter()} aqui falta
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
									filter
									//filterElement={sexFilter()} aqui falta
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
									filter
									filterElement={educationFilter()}
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
									filter
									//filterElement={sexFilter()} aqui falta
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
									filter
									//filterElement={sexFilter()} aqui falta
								/>
							</DataTable>
						</div>
					</Row>
				</Container>
			</main>
			<Footer screenName={screenName} />
		</>
	);
};

export default Users;
