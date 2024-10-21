import React from "react";
import * as Yup from "yup";
import CommonForm from "../Form/CommonForm";
import { useAppDispatch } from "../../redux/hooks";
import { closeModal } from "../../redux/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faSave } from "@fortawesome/free-solid-svg-icons"; // Import the save icon

interface InventoryFormProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  fields?: any[];
}

const InventoryForm: React.FC<InventoryFormProps> = ({
  initialValues,
  onSubmit,
  fields,
}) => {
  const dispatch = useAppDispatch();

  // Define form fields
  const defaultFields = [
    {
      name: "Kit_name",
      label: "Kit Name",
      type: "text",
      placeholder: "Enter Kit Name",
      required: true,
      validations: Yup.string()
        .required("Kit Name is required.")
        .max(20, "Kit Name length must not exceed 20 characters.")
        .matches(
          /^[A-Za-z]+$/,
          "Kit Name can only contain letters without spaces or special characters."
        ),
    },
    {
      name: "kit_type",
      label: "Kit Type",
      type: "select", 
      placeholder: "Select Kit Type",
      required: true,
      options: [
        { label: "Blood", value: "blood" },
        { label: "Saliva", value: "saliva" },
      ],
      validations: Yup.string().required("Kit Type is required."),
    },
    {
      name: "quantity",
      label: "Quantity (Number of Kits)",
      type: "text", // Use text type for number input
      placeholder: "Enter Quantity",
      required: true,
      validations: Yup.string()
        .required("Quantity is required.")
        .matches(/^\d+$/, "Quantity must be a valid number."),
    },
    {
      name: "barcode",
      label: "Barcode",
      type: "text",
      placeholder: "Enter Barcode",
      required: true,
      validations: Yup.string()
        .required("Barcode is required.")
        .max(20, "Barcode must not exceed 20 characters."),
    },
    {
      name: "supplier_name",
      label: "Supplier Name",
      type: "text",
      placeholder: "Enter Supplier Name",
      required: true,
      validations: Yup.string()
        .required("Supplier Name is required.")
        .max(30, "Supplier Name must not exceed 30 characters."),
    },
    {
        name: "contact_number",
        label: "Contact Number",
        type: "text",
        placeholder: "Enter Contact Number",
        required: true,
        validations: Yup.string()
          .required("Contact Number is required.")
          .matches(
            /^\d{10}$/,
            "Contact Number must be exactly 10 digits."
          ),
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter Address",
        required: true,
        validations: Yup.string()
          .required("Address is required.")
          .max(100, "Address must not exceed 100 characters."),
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

export default InventoryForm;
