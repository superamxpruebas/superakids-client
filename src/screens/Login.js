import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
	/* aqui en cuanto entre si hay email guardado poner*/

	const [rememberEmail, setRememberEmail] = useState(false);

	return (
		<div className="outer">
			<div className="inner">
				<Form>
					<img
						alt="Logo"
						src="https://superakids-bucket.s3.us-east-2.amazonaws.com/logos/SuperaKidsLogo.png"
						style={{
							width: "50%",
							marginRight: "auto",
							marginLeft: "auto",
							display: "block",
							padding: "20px"
						}}
					></img>
					<h3>Iniciar Sesión</h3>
					<Form.Group controlId="email">
						<Form.Label>Correo Electrónico</Form.Label>
						<Form.Control
							type="email"
							placeholder="Correo Electrónico"
						/>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Contraseña</Form.Label>
						<Form.Control
							type="password"
							placeholder="Contraseña"
						/>
					</Form.Group>
					<Form.Group controlId="remember_me">
						<Form.Check type="checkbox" label="Recordarme" />
					</Form.Group>
					<Button
						className="btn btn-lg btn-block"
						variant="primary"
						type="submit"
					>
						Entrar
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default Login;
