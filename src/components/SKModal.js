import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "primereact/button";

const SKModal = (props) => {
	const { title, showModalState, closeButtonFunction, children } = props;

	return (
		<Modal centered size="lg" show={showModalState} aria-labelledby="SKModal" backdrop="static">
			<Modal.Header>
				<Modal.Title id="SKModal">{title}</Modal.Title>
				<Button
					icon="pi pi-times"
					className="p-button-rounded p-button-plain p-button-text "
					style={{ margin: "0px 0px 0px auto" }}
					onClick={(e) => closeButtonFunction()}
				/>
			</Modal.Header>
			<Modal.Body id="SKModalBody">{children}</Modal.Body>
		</Modal>
	);
};

export default SKModal;
