import { DESIGN_SYSTEM } from "designSystem";
import React from "react";
import { Alert, Input, Label } from "reactstrap";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  placeholder,
}) => {
  return (
    <>
      <Label>{label}</Label>
      <span className="text-danger"> *</span>
      <div className="mb-3">
        <Input {...input} placeholder={placeholder} type={type} />
        {touched && error && (
          <Alert
            className="mt-2"
            color="danger"
            style={DESIGN_SYSTEM.setFontSize("1rem")}
          >
            {error}
          </Alert>
        )}
      </div>
    </>
  );
};

export default renderField;
