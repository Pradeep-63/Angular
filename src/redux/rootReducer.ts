// File: src/redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loader";
import authReducer from "./slices/auth";
import themeReducer from "./slices/theme";
import manageStaffReducer from "./slices/manage-staff";
import modalReducer from "./slices/modal";

const rootReducer = combineReducers({
  loader: loaderReducer,
  auth: authReducer,
  theme: themeReducer,
  manageStaff: manageStaffReducer,
  modal: modalReducer,
});

export default rootReducer;
