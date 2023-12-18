import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../App.css";

import { editFormData, deleteFormData, updateFormData } from "./Redux/Actions";

const TableComponent = () => {
  const formData = useSelector((state) => state.formData);

  const editingIndex = useSelector((state) => state.editingIndex);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = formData.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(formData.length / recordsPerPage);

  const editData = (index, _data) => {
    navigate(`/sign-up/${index}`);
    dispatch(editFormData(index));
  };
  const deleteData = (index) => {
    console.log("delete", index);
    dispatch(deleteFormData(index));
  };

  const updateData = (index, newData) => {
    dispatch(updateFormData(indexOfFirstRecord + index, newData));
    dispatch(editFormData(null));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <h1> User SignUp Data </h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((data, index) => (
            <tr key={index}>
              <td>{data?.firstName}</td>
              <td>{data?.lastName}</td>
              <td>{data?.email}</td>
              <td className="actions-data">
                {editingIndex !== index ? (
                  <>
                    <EditIcon
                      className="edit-icon"
                      onClick={() => editData(index, data)}
                    />
                    <DeleteIcon
                      className="delete-icon"
                      onClick={() => deleteData(index)}
                    />
                  </>
                ) : (
                  <button onClick={() => updateData(index, data)}>
                    Update
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {/* <Stack> */}
        <Pagination
          className="pagination-container"
          count={totalPages}
          page={currentPage}
          onChange={(_e, page) => handlePageChange(page)}
          color="primary"
        />
        {/* </Stack> */}
      </div>
    </>
  );
};

export default TableComponent;
