import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axios from "axios";

const TeamMembers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/members");
        console.log("Json Response", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  console.log("Team members Data : ", data);

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
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
