import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// import TablePagination from "@mui/material/TablePagination";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const columns = [
//   { id: "name", label: "Name", minWidth: 170 },
//   { id: "code", label: "Status", minWidth: 100 },
//   {
//     id: "population",
//     label: "Role",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "size",
//     label: "Email address",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toLocaleString("en-US"),
//   },
//   {
//     id: "density",
//     label: "Teams",
//     minWidth: 170,
//     align: "right",
//     format: (value) => value.toFixed(2),
//   },
// ];

// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

export default function DataTable({ header, data }) {
  // header and table data retreived with the the help of props
  //   const [row, setRow] = useState({data});

  //   useEffect(() => {
  //     const fetchMembers = async () => {
  //       try {
  //         const response = await axios.get("http://localhost:3000/members");
  //         console.log("Json Response", response.data);
  //         setRow(response.data);
  //       } catch (error) {
  //         console.error("Error fetching members:", error);
  //       }
  //     };

  //     fetchMembers();
  //   }, []);

  //   const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {header.map((column) => (
                <TableCell
                  id="tab-heading"
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth }}

                  //   sx={{
                  //     border: "1px solid green",
                  //     textAlign: "left",
                  //     color: "#667085",
                  //     fontSize: "12px",
                  //     fontWeight: 500,
                  //   }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((member) => (
              <TableRow
                key={member.id}
                // sx={{ "&:last-child td, &:last-child th": { border: 0  , } }}
              >
                <TableCell id="table-data">
                  <div id="user-details-container">
                    <input type="checkbox" />
                    <img src={member.avatar} alt="testimg" id="profile-img" />
                    <div id="user-name-container">
                      <h4 id="name">{member.name}</h4>
                      <p id="username">{"@" + member.userName}</p>
                    </div>
                  </div>
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
                  <div id="teams-container">
                    <div id="teams-first">{member.teams[0]}</div>
                    <div id="teams-second">{member.teams[1]}</div>
                    <div id="teams-third">{member.teams[2]}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={row.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
