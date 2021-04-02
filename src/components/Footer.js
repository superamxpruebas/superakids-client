import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { Formik, Form } from "formik";
import * as yup from "yup";
import FormInput from "../forms/FormInput";
import { title, view, description } from "../forms/Fields";
import SKModal from "./SKModal";
import FormTextAreaInput from "../forms/FormTextAreaInput";
import { AppVersion } from "../helpers/AppProps";
import { problem } from "../actions/problemActions";
import { useSelector, useDispatch } from "react-redux";

const Footer = (props) => {
	const { screenName } = props;
	const [showModal, setShowModal] = useState(false);
	const toastRef = useRef(null);

	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.problem);
	const { therapistInfo } = useSelector((state) => state.therapistLogin);

	//methods
	const handleOnSubmit = (form, onSubmitProps) => {
		onSubmitProps.setSubmitting(true);
		dispatch(problem(form, closeModal, toastRef));
		onSubmitProps.setSubmitting(false);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<footer>
			<Toast ref={toastRef} position="top-right" baseZIndex={10000} />
			<Container>
				<Row>
					<Col></Col>
					<Col className="p-text-center">
						<p style={{ marginTop: "13px" }}>
							© SuperaKids 2020 (Versión {AppVersion})
						</p>
					</Col>
					<Col className="text-right p-p-2">
						<Button
							label="Reportar un Problema"
							className="p-button-link p-mx-auto"
							onClick={(e) => {
								setShowModal(true);
							}}
							icon="pi pi-exclamation-circle"
							iconPos="right"
							style={{ color: "white" }}
							tooltip={"Reporte un problema en la pantalla actual: " + screenName}
							tooltipOptions={{ position: "top" }}
						/>
					</Col>
				</Row>
			</Container>
			<SKModal
				title="Reportar un Problema"
				showModalState={showModal}
				closeButtonFunction={() => {
					setShowModal(false);
				}}
			>
				<Formik
					initialValues={{
						therapistId: therapistInfo.therapistId,
						[title.name]: title.default,
						[view.name]: screenName,
						[description.name]: description.default
					}}
					validationSchema={yup.object().shape({
						[title.name]: title.validation,
						[view.name]: view.validation,
						[description.name]: description.validation
					})}
					onSubmit={handleOnSubmit}
					isInitialValid={false}
				>
					{(formik) => {
						const { isSubmitting, isValid } = formik;
						return (
							<Form>
								<div
									className="p-fluid p-formgrid p-grid"
									style={{ width: "100%", maxWidth: "100%", margin: "0px" }}
								>
									<div className="p-col-12">
										<h6>A continuación agregue los detalles del problema:</h6>
									</div>
									<div className="p-col-12">
										<FormInput
											inputName={title.name}
											labelText={title.label}
											placeholder={title.placeholder}
										/>
									</div>
									<div className="p-col-12">
										<FormInput
											inputName={view.name}
											labelText={view.label}
											placeholder={view.placeholder}
											helperText="Este campo es agregado automáticamente"
											disabled
										/>
									</div>
									<div className="p-col-12">
										<FormTextAreaInput
											inputName={description.name}
											labelText={description.label}
											placeholder={description.placeholder}
										/>
									</div>
									<div className="p-col-6 p-mt-3 p-mb-3">
										<Button
											label="Restaurar Valores"
											icon="pi pi-replay"
											className="p-button p-button-secondary"
											type="reset"
										/>
									</div>
									<div className="p-col-6 p-mt-3 p-mb-3">
										<Button
											label="Enviar"
											icon="pi pi-check"
											className="p-button"
											type="submit"
											disabled={!isValid || isSubmitting || loading}
										/>
									</div>
									<div className="p-col-12 p-mt-1 p-mb-1">
										{loading && (
											<ProgressBar
												mode="indeterminate"
												style={{ height: "6px" }}
											></ProgressBar>
										)}
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</SKModal>
		</footer>
	);
};

export default Footer;
