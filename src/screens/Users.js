import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Usuarios as screenName } from "../helpers/AppProps";

const Users = () => {
	return (
		<>
			<Header />
			<main className="py-4">
				<Container>
					<h1 style={{ color: "white" }}>Usuarios</h1>
					<Row></Row>
				</Container>
			</main>
			<Footer screenName={screenName} />
		</>
	);
};

export default Users;
