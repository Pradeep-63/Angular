import * as Yup from "yup";

interface ValidationConfig {
  required?: boolean;
  label?: string;
  min?: number;
  max?: number;
  customMessage?: string;
}

interface NumberValidationConfig extends ValidationConfig {
  allowDecimals?: boolean;
  minValue?: number;
  maxValue?: number;
}

interface NameValidationConfig extends ValidationConfig {
  allowSpace?: boolean;
  allowSpecialChars?: boolean;
}

interface PasswordValidationConfig extends ValidationConfig {
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSpecialChar?: boolean;
  excludeOldPassword?: boolean;
  confirmPasswordMatch?: boolean;
  oldPassword?: string;

}

interface AddressValidationConfig extends ValidationConfig {
  allowSpecialChars?: boolean;
  allowNumbers?: boolean;
}

export class ValidationUtils {
 // Password validation with additional checks
 static createPasswordValidation({
  label = "Password",
  min = 8,
  max = 20,
  requireUppercase = true,
  requireLowercase = true,
  requireNumber = true,
  requireSpecialChar = true,
  required = true,
  excludeOldPassword = false,  // for old password vs new password check
  confirmPasswordMatch = false, // for new vs confirm password check
  oldPassword = "", // old password for comparison
}: PasswordValidationConfig = {}) {
  let validation = Yup.string();

  if (required) {
    validation = validation.required(`${label} is required.`);
  }

  validation = validation
    .min(min, `${label} must be at least ${min} characters long.`)
    .max(max, `${label} length must not exceed ${max} characters.`);

  if (requireUppercase) {
    validation = validation.matches(
      /[A-Z]/,
      `${label} must contain at least one uppercase letter.`
    );
  }

  if (requireLowercase) {
    validation = validation.matches(
      /[a-z]/,
      `${label} must contain at least one lowercase letter.`
    );
  }

  if (requireNumber) {
    validation = validation.matches(
      /\d/,
      `${label} must contain at least one number.`
    );
  }

  if (requireSpecialChar) {
    validation = validation.matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      `${label} must contain at least one special character.`
    );
  }

  // Ensure the old password and new password are not the same
  if (excludeOldPassword && oldPassword) {
    validation = validation.test(
      "password-not-same",
      `${label} cannot be the same as the old password.`,
      (value) => value !== oldPassword
    );
  }

  // Ensure new password and confirm password are the same
  if (confirmPasswordMatch) {
    validation = validation.test(
      "confirm-password-match",
      "New password and confirm password must match.",
      (value, context) => {
        const confirmPassword = context.parent?.confirm_password;
        return value === confirmPassword;
      }
    );
  }

  return validation;
}

  static createEmailValidation({
    label = "Email",
    max = 100,
    required = true,
    customMessage,
  }: ValidationConfig = {}) {
    let validation = Yup.string();

    if (required) {
      validation = validation.required(`${label} is required.`);
    }

    return validation
      .max(max, `${label} length must not exceed ${max} characters.`)
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        customMessage || `Please enter a valid ${label.toLowerCase()} address.`
      );
  }

  static createQuantityValidation({
    label = "Quantity",
    minValue = 1,
    maxValue = 99999,
    required = true,
    customMessage,
  }: NumberValidationConfig = {}) {
    let validation = Yup.string();

    if (required) {
      validation = validation.required(`${label} is required.`);
    }

    return validation
      .matches(/^\d+$/, `${label} must be a number`)
      .test(
        "range",
        customMessage || `${label} must be between ${minValue} and ${maxValue}`,
        (value) => {
          if (!value) return !required;
          const number = Number(value);
          return number >= minValue && number <= maxValue;
        }
      );
  }

  static createNameValidation({
    label = "Name",
    min = 3,
    max = 50,
    required = true,
    allowSpace = true,
    allowSpecialChars = false,
  }: NameValidationConfig = {}) {
    let validation = Yup.string();

    if (required) {
      validation = validation.required(`${label} is required.`);
    }

    validation = validation
      .min(min, `${label} must be at least ${min} characters.`)
      .max(max, `${label} must not exceed ${max} characters.`);

    const pattern = allowSpace
      ? allowSpecialChars
        ? /^[A-Za-z\s'-]+$/
        : /^[A-Za-z]+(?: [A-Za-z]+)*$/
      : /^[A-Za-z]+$/;

    return validation.matches(
      pattern,
      `${label} can only contain ${
        allowSpace ? "letters and one space between words" : "letters"
      }${allowSpecialChars ? " and basic punctuation" : ""}.`
    );
  }

  static createContactNumberValidation({
    label = "Contact Number",
    min = 10,
    max = 15,
    required = false,
  }: ValidationConfig = {}) {
    let validation = Yup.string();

    if (required) {
      validation = validation.required(`${label} is required.`);
    }

    return validation
      .matches(/^\d+$/, `${label} must contain only digits.`)
      .matches(
        new RegExp(`^\\d{${min},${max}}$`),
        `${label} must be between ${min} to ${max} digits.`
      )
      .nullable();
  }

  static createAddressValidation({
    label = "Address",
    min = 5,
    max = 100,
    required = false,
    allowSpecialChars = true,
    allowNumbers = true,
  }: AddressValidationConfig = {}) {
    let validation = Yup.string();

    if (required) {
      validation = validation.required(`${label} is required.`);
    }

    validation = validation
      .min(min, `${label} must be at least ${min} characters.`)
      .max(max, `${label} must not exceed ${max} characters.`);

    if (!allowSpecialChars && !allowNumbers) {
      validation = validation.matches(
        /^[A-Za-z\s]+$/,
        `${label} can only contain letters and spaces.`
      );
    } else if (!allowSpecialChars) {
      validation = validation.matches(
        /^[A-Za-z0-9\s]+$/,
        `${label} can only contain letters, numbers, and spaces.`
      );
    }

    return validation.nullable();
  }
}


// Create the validation schema for the password change form
export const passwordChangeSchema = Yup.object().shape({
  old_password: ValidationUtils.createPasswordValidation({
    label: "Old password",
    min: 8,
    max: 20,
    required: true,
  }),
  new_password: ValidationUtils.createPasswordValidation({
    label: "New password",
    min: 8,
    max: 20,
    required: true,
  })
  .test(
    "not-same-as-old",
    "New password must be different from the old password",
    function(value) {
      const oldPassword = this.parent.old_password;
      return value !== oldPassword;
    }
  ),
  confirm_password: ValidationUtils.createPasswordValidation({
    label: "Confirm password",
    min: 8,
    max: 20,
    required: true,
  })
  .test(
    "passwords-match",
    "Confirm passwords must match with new password",
    function(value) {
      const newPassword = this.parent.new_password;
      return value === newPassword;
    }
  )
});