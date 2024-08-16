import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import successIcon from "../assets/images/Featured icon.png"

// Delete User Modal
const DeleteUserModal = ({ onDelete, onCancel }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-content-details">
          <p>Are you sure you want to delete this user?</p>
          <div className="modal-buttons">
            <button className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button className="confirm-btn" onClick={onDelete}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Success Modal
const SuccessModal = ({ onClose }) => {
  return (
    <div className="modal-container">
      <div className="successfull-content">
        <div className="success-icon">
          <img src={successIcon} alt="successIcon" />
          <p>Users successfully deleted!</p>
          
        </div>
      </div>
    </div>
  );
};

// Edit User Modal
// EditUserModal Example
const EditUserModal = ({ user, onConfirm, onClose }) => {
  // Validation to ensure user is not an object being directly rendered
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setRole(user?.role || "");
  }, [user]);

  return (
    <div className="modal-container">
      <div className="edit-modal-content">
        <h3>Edit User</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="" disabled>
            Select Role
          </option>
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="confirm-btn"
            onClick={() => onConfirm({ ...user, name, email, role })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// DataTable Component
export default function DataTable({ header, data }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setValue(data);
  }, [data]);

  useEffect(() => {
    let timer;
    if (isSuccessModalOpen) {
      timer = setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isSuccessModalOpen]);

  const handleDelete = () => {
    const newData = [...value];
    newData.splice(currentIndex, 1);
    setValue(newData);

    setIsDeleteModalOpen(false);
    setIsSuccessModalOpen(true);
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const openDeleteModal = (index) => {
    setCurrentIndex(index);
    setIsDeleteModalOpen(true);
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditConfirm = (updatedUser) => {
    const updatedData = value.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setValue(updatedData);
    setIsEditModalOpen(false);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {header.map((column) => (
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
            {value.map((member, index) => (
              <TableRow key={member.id}>
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
                  <div id={member.isActive ? "active" : "inactive"}>
                    <div
                      id={member.isActive ? "active-bullet" : "inactive-bullet"}
                    ></div>
                    <p>{member.isActive ? "Active" : "Inactive"}</p>
                  </div>
                </TableCell>
                <TableCell id="table-data">{member.role}</TableCell>
                <TableCell id="table-data">{member.email}</TableCell>
                <TableCell id="table-data">
                  <div id="teams-container">
                    {member.teams[0] && (
                      <div id="teams-first">{member.teams[0]}</div>
                    )}
                    {member.teams[1] && (
                      <div id="teams-second">{member.teams[1]}</div>
                    )}
                    {member.teams[2] && (
                      <div id="teams-third">{member.teams[2]}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell style={{ display: "flex" }}>
                  <div>
                    <button onClick={() => openDeleteModal(index)} id="del-btn">
                      <DeleteOutlineIcon id="del-icon" />
                    </button>

                    {isDeleteModalOpen && (
                      <DeleteUserModal
                        onDelete={handleDelete}
                        onCancel={handleCancel}
                      />
                    )}

                    {isSuccessModalOpen && (
                      <SuccessModal onClose={handleCloseSuccessModal} />
                    )}
                  </div>

                  <button id="edit-btn" onClick={() => openEditModal(member)}>
                    <ModeEditOutlineOutlinedIcon id="edit-icon" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isEditModalOpen && (
        <EditUserModal
          user={currentUser}
          onConfirm={handleEditConfirm}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </Paper>
  );
}
