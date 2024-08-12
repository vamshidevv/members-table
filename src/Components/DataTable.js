import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useState, useEffect } from "react";
import axios from "axios";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "Status", minWidth: 100 },
  {
    id: "population",
    label: "Role",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Email address",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Teams",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function ColumnGroupingTable() {
  const [row, setRow] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/members");
        console.log("Json Response", response.data);
        setRow(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  id="tab-heading"
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((member) => (
              <TableRow
                key={member.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <h4>{member.name}</h4>
                  <p>{"@" + member.userName}</p>
                </TableCell>
                <TableCell id="table-data">
                  <div
                    style={{
                      backgroundColor: "#ECFDF3",
                      height: "22px",
                      width: "84px",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      //   gap:"6px",
                      justifyContent: "space-around",
                    }}
                  >
                    <div
                      style={{
                        height: "6px",
                        width: "6px",
                        backgroundColor: "#12B76A",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <p
                      style={{
                        color: "#027A48",
                        fontSize: "12px",
                        gap: "15px",
                      }}
                    >
                      {member.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </TableCell>
                <TableCell id="table-data">{member.role}</TableCell>
                <TableCell id="table-data">{member.email}</TableCell>
                <TableCell id="table-data">
                  {member.teams ? member.teams.join(", ") : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
