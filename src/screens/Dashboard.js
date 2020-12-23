import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Dashboard as screenName } from "../helpers/AppProps";

const Dashboard = () => {
	const apps = [
		{
			id: 1,
			title: "Usuarios",
			path: "/users",
			img: "https://placehold.jp/286x180.png",
			subText: false
		},
		{
			id: 2,
			title: "Administración de Terapeutas",
			path: "/administracion",
			img: "https://placehold.jp/286x180.png",
			subText: false
		},
		{
			id: 3,
			title: "Registros",
			path: "/logs",
			img: "https://placehold.jp/286x180.png",
			subText: false
		}
	];

	return (
		<>
			<Header />
			<main className="py-4">
				<Container>
					<h1 style={{ color: "white" }}>Dashboard</h1>
					<Row>
						{apps.map((app) => (
							<Col xs={6} sm={6} md={6} lg={3} xl={3} id={app.id} className="d-flex">
								<Card className="my-3 p-3 rounded flex-fill">
									<Card.Img src={app.img} variant="top" />
									<Card.Body>
										<Card.Title>{app.title}</Card.Title>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
			</main>
			<Footer screenName={screenName} />
		</>
	);
};

export default Dashboard;
