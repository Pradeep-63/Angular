import { FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";

// Manage Staff interface start here

export interface FetchStaffDetailsParams {
  currentPage: number;
  sort: string;
  sortColumn: string;
  searchText: string;
  status: string;
  perPage: number;
}

export interface StaffListTableProps {
  fetchAllStaffDetails: (params: FetchStaffDetailsParams) => void;
}

export interface ManageStaffFormValues {
  first_name: string;
  last_name: string;
  email: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  active_status: boolean;
  created_at: string;
}

export interface Column {
  key: string;
  label: string;
  sortable: boolean;
  render?: (value: any, item: User) => React.ReactNode;
}

export interface FetchStaffDetailsParams {
  currentPage: number;
  sort: string;
  sortColumn: string;
  searchText: string;
  status: string;
  perPage: number;
}
// Manage Staff interface ends here

// Manage Inventory interface start here
export interface FetchKitDetailsParams {
  currentPage: number;
  sort: string;
  sortColumn: string;
  searchText: string;
  type: string;
  perPage: number;
}
export interface InventoryFormProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  fields?: any[];
}

export interface FetchInventoryDetailsParams {
  currentPage: number;
  sort: string;
  sortColumn: string;
  searchText: string;
  type: string;
  perPage: number;
}

export interface InventoryListTableProps {
  fetchAllKitDetails: (params: FetchInventoryDetailsParams) => void;
}

export interface InventoryFormValues {
  type: string;
  quantity: string;
  supplier_name: string;
  supplier_contact_number: string;
  supplier_address: string;
}

export interface Kit {
  id: string;
  quantity: number;
  type: string;
  supplier_name: string;
  supplier_contact_number: string;
  created_at: string;
  created_by: string;
}

// Manage Inventory interface ends here

// Common form interface start here
export interface Option {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon?: string;
  validations?: any;
  maxLength?: number;
  minLength?: number;
  options?: Option[];
  required?: boolean; // Make it optional
  passwordTooltipShow?: boolean; // Make it optional
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  colProps?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export interface FieldProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  icon?: string;
  maxLength?: number;
  required?: boolean;
  passwordTooltipShow?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: Array<{ value: string | number; label: string }>;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  className?: string;
  validations?: any;
  colProps?: { [key: string]: number };
}


export interface ButtonConfig {
  text: string;
  type: "submit" | "button" | "reset";
  className: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface CommonFormProps {
  fields: FieldConfig[];
  initialValues: { [key: string]: any };
  onSubmit: (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => void | Promise<any>;
  buttons: ButtonConfig[];
  auxiliaryContent?: React.ReactNode;
  formikInstance?: React.RefObject<FormikProps<any>>;
  onFormChange?: (values: any) => void;
}

// Common form inter face ends here

// Product Details interface start here
export interface ProductState {
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
}

export interface BillingDetails {
  quantity: any;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country: string;
  street_address: string;
  town_city: string;
  region: string;
  postcode: string;
  total_price?: number;
}

export interface OrderSummary extends BillingDetails {
  product_name: string;
  product_description: string;
  product_image: string;
  product_price: number;
  product_gst_price: number;
  total_price?: number;
}
// Product Details inter face ends here

// Common Image interface start here
// Common image inter face ends here

// Common Image interface start here
// Common image inter face ends here

// Common Image interface start here
// Common image inter face ends here

// Common Image interface start here
// Common image inter face ends here

// Common Image interface start here
// Common image inter face ends here

// Common Image interface start here
// Common image inter face ends here

// Common Image interface start here
// Common image inter face ends here

// Common Image interface start here
// Common image inter face ends here

// Common Image interface start here
// Common image inter face ends here

// Common Image interface start here
// Common image inter face ends here
