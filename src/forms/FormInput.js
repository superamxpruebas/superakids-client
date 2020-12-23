import React from "react";
import { Field } from "formik";
import { InputText } from "primereact/inputtext";

//default values below function

const FormInput = (props) => {
	const { inputName, labelText, helperText, optionalField, disabled, type, ...rest } = props;
	return (
		<Field name={inputName}>
			{(innerProps) => {
				const { field, form } = innerProps;
				return (
					<div className="p-field">
						<label htmlFor={inputName}>
							{labelText}
							<small>{optionalField && " (opcional)"}</small>
						</label>
						<InputText
							id={inputName}
							className={
								"p-mr-2 p-d-inline " +
								(form.touched[inputName] && form.errors[inputName] && "p-invalid")
							}
							{...field}
							{...rest}
							disabled={disabled}
							type={type}
							aria-describedby={inputName + "-helper"}
						/>
						<small id={inputName + "-helper"}>{helperText}</small>
						<small id={inputName + "-error"} className="p-invalid">
							{form.touched[inputName] &&
								form.errors[inputName] &&
								form.errors[inputName]}
						</small>
					</div>
				);
			}}
		</Field>
	);
};

FormInput.defaultProps = {
	optionalField: false,
	disabled: false,
	helperText: "",
	type: "text"
};

export default FormInput;
