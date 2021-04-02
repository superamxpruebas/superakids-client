import React, { useRef } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { Dashboard as screenName } from "../helpers/AppProps";
import { useSelector } from "react-redux";

const Dashboard = ({ history }) => {
	const therapistLogin = useSelector((state) => state.therapistLogin);
	const { therapistInfo } = therapistLogin;

	if (!therapistInfo) {
		history.push("/login");
	}

	const apps = [
		{
			id: 1,
			title: "Usuarios",
			path: "/users",
			img: "https://placehold.jp/286x180.png",
			subText: false,
			adminOnly: false
		},
		{
			id: 2,
			title: "Administración de Terapeutas",
			path: "/administracion",
			img: "https://placehold.jp/286x180.png",
			subText: false,
			adminOnly: true
		} /*, aqui despues
		{
			id: 3,
			title: "Registros",
			path: "/logs",
			img: "https://placehold.jp/286x180.png",
			subText: false,
			adminOnly: true
		}*/
	];

	//methods

	return (
		<>
			<Header />
			<main className="py-4">
				<Container>
					<h1 style={{ color: "white" }}>Dashboard</h1>
					<Row>
						{apps.map((app, i) => {
							let card = (
								<Col
									xs={6}
									sm={6}
									md={6}
									lg={3}
									xl={3}
									id={app.id}
									className="d-flex"
									key={i}
								>
									<Card className="my-3 p-3 rounded flex-fill">
										<Link to={app.path}>
											<Card.Img src={app.img} variant="top" />
										</Link>
										<Card.Body>
											<Link to={app.path}>
												<Card.Title>{app.title}</Card.Title>
											</Link>
										</Card.Body>
									</Card>
								</Col>
							);

							if (!app.adminOnly) {
								return card;
							} else {
								if (therapistInfo.isAdmin) return card;
							}
							return <></>;
						})}
					</Row>
				</Container>
			</main>
			<Footer screenName={screenName} />
		</>
	);
};

export default Dashboard;
