import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const Overview = () => {
  const { authState, fetchUserProfile } = useContext(AuthContext);
  const { profile: user, loading, error } = authState;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userID;
      fetchUserProfile(userId);
    }
  }, [fetchUserProfile]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error.message}</p>;
  if (!user) return <p>No user data found.</p>;

  return (
    <div
      className="tab-pane fade show active"
      id="overview-tab-pane"
      role="tabpanel"
      aria-labelledby="overview-tab"
      tabIndex={0}
    >
      <h5 className="mb-3">About</h5>
      <p className="lead mb-3">
        {user.firstName} {user.lastName} is a valued member with a role of {user.role}.
        They are currently enrolled in the {user.trainingPackageName} and their status is {user.status}.
      </p>
      <h5 className="mb-3">Profile</h5>
      <div className="row g-0">
        <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
          <div className="p-2">First Name</div>
        </div>
        <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
          <div className="p-2">{user.firstName}</div>
        </div>
        <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
          <div className="p-2">Last Name</div>
        </div>
        <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
          <div className="p-2">{user.lastName}</div>
        </div>
        <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
          <div className="p-2">Email</div>
        </div>
        <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
          <div className="p-2">{user.email}</div>
        </div>
        <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
          <div className="p-2">Role</div>
        </div>
        <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
          <div className="p-2">{user.role}</div>
        </div>
        <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
          <div className="p-2">Training Package</div>
        </div>
        <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
          <div className="p-2">{user.trainingPackageName}</div>
        </div>
        <div className="col-5 col-md-3 bg-light border-bottom border-white border-3">
          <div className="p-2">Status</div>
        </div>
        <div className="col-7 col-md-9 bg-light border-start border-bottom border-white border-3">
          <div className="p-2">{user.status}</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
