import React, { useEffect } from "react";
import UserData from "./Container/UserData";
import TableComponent from "./Container/TableData";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Container/Lognin";
import Signup from "./Container/Signup";
import {
  addFormData,
  updateFormData,
  editFormData,
  setUserData,
} from "./Container/Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";

function App() {
  const formData = useSelector((state) => state.formData);
  console.log("app formData", formData);
  const editingIndex = useSelector((state) => state.editingIndex);

  const dispatch = useDispatch();
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("UserData"));
    dispatch(setUserData(storedUserData));
  }, []);

  const handleEdit = (index, newData) => {
    if (index !== null) {
      dispatch(updateFormData(index, newData));
    } else {
      dispatch(editFormData(newData));
    }
  };

  const handleFormSubmit = (data) => {
    dispatch(addFormData(data));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="sign-up/:code" element={<Signup mode="edit" />} />

          <Route
            path="/user-data"
            element={
              <UserData
                onEdit={(newData) => handleEdit(editingIndex, newData)}
                editingData={formData[editingIndex]}
                onSubmit={handleFormSubmit}
              />
            }
          />
          <Route
            path="/table-component"
            element={<TableComponent formData={formData} />}
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
