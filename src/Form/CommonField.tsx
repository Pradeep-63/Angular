// CommonField.tsx
import React from "react";
import { Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "antd";
import { FieldProps } from "../../constants/types";

export const CommonField: React.FC<FieldProps> = ({
  name,
  type,
  label,
  placeholder,
  icon,
  maxLength,
  required = true,
  passwordTooltipShow,
  onKeyDown,
  options,
  showPassword,
  onTogglePassword,
  className = "",
}) => {
  const isPasswordField = type === "password";
  const isSelectField = type === "select";
  const isTextAreaField = type === "textarea";

  const renderInput = () => {
    if (isSelectField) {
      return (
        <Field
          as="select"
          name={name}
          className={`w-full p-2 border rounded-md ${className}`}
          onKeyDown={onKeyDown}
        >
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      );
    }

    if (isTextAreaField) {
      return (
        <Field
          as="textarea"
          name={name}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-md ${className}`}
          onKeyDown={onKeyDown}
        />
      );
    }

    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <img src={icon} alt={`${name}_icon`} className="w-5 h-5" />
          </div>
        )}
        <Field
          type={isPasswordField && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-md ${
            icon ? "pl-10" : ""
          } ${className}`}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
        />
        {isPasswordField && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button
              type="button"
              onClick={onTogglePassword}
              className="focus:outline-none"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="text-gray-500 hover:text-gray-700"
              />
            </button>
            {passwordTooltipShow && (
              <Tooltip title="Password must be 8-20 characters long, contain uppercase and lowercase letters, a number, and a special character.">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-gray-500 hover:text-gray-700"
                />
              </Tooltip>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 mt-1 text-sm"
      />
    </div>
  );
};
