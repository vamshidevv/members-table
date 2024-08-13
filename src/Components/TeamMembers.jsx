import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import axios from "axios";

const TeamMembers = () => {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState([]);

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "status", label: "Status", minWidth: 100 },
    {
      id: "role",
      label: "Role",
      minWidth: 170,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "email",
      label: "Email address",
      minWidth: 170,
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "teams",
      label: "Teams",
      minWidth: 170,
      format: (value) => value.toFixed(2),
    },
  ];

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
    setHeader(columns);
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
            <button
              className="btn-delete-all "
              onClick={() => {
                console.log("delete all btn is clicked");
              }}
            >
              Delete Selected
            </button>
          </div>
        </div>
        <div className="table-container">
          {/*passed the header and table data with the help of props*/}
          <DataTable header={header} data={data} />
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;
