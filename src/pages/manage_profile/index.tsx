import PersonalDetails from "../../components/ManageProfile/personalDetails.compoent";
import ResetPassword from "../../components/ManageProfile/resetPassword.component";

const ManageProfile = () => {
  return (
    <>
      <div className="main">
        <div className="row">
          <div className="col-lg-12">
            <div
              className="main-head mb-4 py-4 px-3 rounded-3"
              style={{ backgroundColor: "var(--bs-body-bg)" }}
            >
              <h3 className="m-0">Manage Profile</h3>
            </div>
          </div>
        </div>
        <PersonalDetails />
        <ResetPassword />
      </div>
    </>
  );
};

export default ManageProfile;
