import React from "react";
import DataTable from "./DataTable";

const TeamMembers = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="header">
          <div className="header-left-section">
            <h2>Team Members</h2>
            <h4>100 users</h4>
          </div>

          <div className="header-rigth-section">
            <button className="btn-delete-all">Delete Selected</button>
          </div>
        </div>
        <div className="table-container">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
