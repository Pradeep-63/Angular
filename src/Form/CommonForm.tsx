import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CommonFormProps, FieldConfig } from "../../constants/types";
import { Col, Row } from "react-bootstrap";

const CommonForm: React.FC<CommonFormProps> = ({
  fields,
  initialValues,
  onSubmit,
  buttons,
  auxiliaryContent,
  formikInstance,
  onFormChange,
}) => {
  const [showPassword, setShowPassword] = React.useState<{
    [key: string]: boolean;
  }>({});
  const loading = useSelector((state: RootState) => state.loader.loader);

  const toggleShowPassword = (fieldName: string) => {
    setShowPassword((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  const validationSchema = Yup.object().shape(
    fields.reduce(
      (schema, field) => ({ ...schema, [field.name]: field.validations }),
      {}
    )
  );

  const renderField = (field: FieldConfig) => {
    const {
      name,
      type,
      label,
      placeholder,
      options,
      icon,
      maxLength,
      colProps,
      required,
      passwordTooltipShow,
      onKeyDown,
    } = field;
    const isPasswordField = type === "password";
    const isSelectField = type === "select";
    const isTextAreaField = type === "textarea";
    const isRequired = required !== undefined ? required : true;
    const colAttributes = colProps || { xs: 12 };

    return (
      <Col key={name} {...colAttributes}>
        <div className="mb-3">
          <label htmlFor={name} className="form-label required-field">
            {label}
            {isRequired && <span className="text-danger ms-1">*</span>}
          </label>

          {isSelectField ? (
            <Field
              as="select"
              name={name}
              placeholder={placeholder}
              className="form-control"
            >
              <option value="">{placeholder}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
          ) : isTextAreaField ? (
            <Field
              as="textarea"
              name={name}
              placeholder={placeholder}
             className="form-control restricted-textarea"
              onKeyDown={onKeyDown}
            />
          ) : (
            <div
              className={`input-group ${isPasswordField ? "password-box" : ""}`}
            >
              {icon && (
                <span className="input-group-text">
                  <img src={icon} alt={`${name}_icon`} />
                </span>
              )}
              <Field
                type={isPasswordField && showPassword[name] ? "text" : type}
                name={name}
                placeholder={placeholder}
                className="form-control"
                maxLength={maxLength}
                onKeyDown={onKeyDown}
              />
              {isPasswordField && (
                <span className="toggle-password">
                  <FontAwesomeIcon
                    icon={showPassword[name] ? faEye : faEyeSlash}
                    className="field_icon toggle-password fa-fw"
                    onClick={() => toggleShowPassword(name)}
                  />
                  {passwordTooltipShow && (
                    <Tooltip title="Password must be 8-20 characters long, contain uppercase and lowercase letters, a number, and a special character.">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="field_icon toggle-password fa-fw"
                      />
                    </Tooltip>
                  )}
                </span>
              )}
            </div>
          )}
          <ErrorMessage name={name} component="div" className="text-danger" />
        </div>
      </Col>
    );
  };

  return (
    <Formik
      innerRef={formikInstance}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {(formik) => {
        onFormChange?.(formik.values);
        return (
          <Form>
            <Row>{fields.map(renderField)}</Row>

            {auxiliaryContent && <div className="mb-3">{auxiliaryContent}</div>}

            <div className="d-flex justify-content-end">
              {buttons.map((button, index) => (
                <button
                  key={index}
                  type={button.type}
                  className={`${button.className} ${index > 0 ? "ms-2" : ""}`}
                  onClick={button.onClick}
                  disabled={
                    button.type === "submit" &&
                    (loading || !(formik.isValid && formik.dirty))
                  }
                >
                  {loading && button.type === "submit" ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                  ) : (
                    <>
                      {button.icon && (
                        <span className="me-2">{button.icon}</span>
                      )}
                      {button.text}
                    </>
                  )}
                </button>
              ))}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CommonForm;
