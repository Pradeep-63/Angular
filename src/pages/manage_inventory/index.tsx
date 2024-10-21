import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { GetAdminUserListSlice, setLoader } from "../../redux/action";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import StaffList from "../../components/ManageStaff/StaffList";
import KitList from "../../components/ManageInventory/KitList";
interface FetchKitDetailsParams {
  currentPage: number;
  sort: string;
  sortColumn: string;
  searchText: string;
  status: string;
}
const ManageInventory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { perPage, records } = useSelector(
    (state: RootState) => state.manageStaff
  );

  const fetchAllStaffDetails = async ({
    currentPage,
    sort,
    sortColumn,
    searchText,
    status,
  }: FetchKitDetailsParams) => {
    try {
      await dispatch(setLoader(true));
      await dispatch(
        GetAdminUserListSlice({
          page: currentPage,
          per_page: perPage,
          sort,
          sort_column: sortColumn,
          search_text: searchText,
          status,
        })
      );
    } catch (err) {
      console.error("Error getting user details:", err);
    } finally {
      await dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    if (records && records.length === 0) {
      fetchAllStaffDetails({
        currentPage: 1,
        sort: "desc",
        sortColumn: "created_at",
        searchText: "",
        status: "all",
      }); // eslint-disable-next-line
    }
  }, []);

  return (
    <div className="main">
      <div className="row">
        <div className="col-lg-12">
          <div
            className="main-head mb-4 py-4 px-3 rounded-3"
            style={{ backgroundColor: "var(--bs-body-bg)" }}
          >
            <h3 className="m-0">Manage Inventory</h3>
          </div>
        </div>
      </div>
      <KitList fetchAllKitDetails={fetchAllStaffDetails} />
    </div>
  );
};

export default ManageInventory;
