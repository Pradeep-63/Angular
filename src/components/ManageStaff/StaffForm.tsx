// StaffForm.tsx
import React from "react";
import * as Yup from "yup";
import CommonForm from "../Form/CommonForm";
import { useAppDispatch } from "../../redux/hooks";
import { closeModal } from "../../redux/action";
import emailImage from "../../assets/images/email.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faSave } from "@fortawesome/free-solid-svg-icons"; // Import the save icon

interface StaffFormProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  fields?: any[];
}

const StaffForm: React.FC<StaffFormProps> = ({
  initialValues,
  onSubmit,
  fields,
}) => {
  const dispatch = useAppDispatch();

  const defaultFields = [
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      placeholder: "Enter First Name",
      required: true,
      validations: Yup.string()
        .required("First Name is required.")
        .max(20, "First Name length must not exceed 20 characters.")
        .matches(
          /^[A-Za-z]+$/,
          "First Name can only contain letters without spaces or special characters."
        ),
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      placeholder: "Enter Last Name",
      required: false,
      validations: Yup.string()
        .max(20, "Last Name length must not exceed 20 characters.")
        .matches(
          /^[A-Za-z]*$/,
          "Last Name can only contain letters without spaces or special characters."
        ),
    },
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "Enter email address",
      required: true,
      icon: emailImage,
      validations: Yup.string()
        .required("Email is required.")
        .max(100, "Email length must not exceed 100 characters.")
        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          "Please enter a valid email address."
        ),
    },
  ];

  const formFields = fields || defaultFields;

  return (
    <CommonForm
      fields={formFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      buttons={[
        {
          text: "Cancel",
          type: "button",
          className: "btn btn-secondary",
          icon: <FontAwesomeIcon icon={faKey} />,
          onClick: () => {
            dispatch(closeModal());
          },
        },
        {
          text: Object.keys(initialValues).length > 0 ? "Update" : "Submit", // Conditional text
          type: "submit",
          className: "btn btn-primary",
          icon: <FontAwesomeIcon icon={faSave} />, // Updated icon for submit button
        },
      ]}
    />
  );
};

export default StaffForm;
