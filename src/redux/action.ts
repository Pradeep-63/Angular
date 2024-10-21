export { setLoader } from "./slices/loader";

export {
  LoginUser,
  ForgetPasswordApiCall,
  setAuthUser,
  ResetPasswordApiCall,
  UpdateUserDetailsApiCall,
  GetUserDetailsApiCall,
} from "./slices/auth";

export {
  GetAdminUserListSlice,
  CreatedAdminUserSlice,
  UpdateAdminUserSlice,
  DeleteAdminUserSlice,
} from "./slices/manage-staff";

export { openModal, closeModal } from "./slices/modal";

export { setTheme } from "./slices/theme";
