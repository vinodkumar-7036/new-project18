import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserData = ({ onSubmit, onEdit, editingData }) => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editingData) {
      setFirstName(editingData.firstName || "");
      setLastName(editingData.lastName || "");
      setPhone(editingData.phone || "");
    }
  }, [editingData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { firstName, lastName, phone };
    if (editingData) {
      onEdit(formData);
    } else {
      onSubmit(formData);
    }
    navigate("/table-component");

    setFirstName("");
    setLastName("");
    setPhone("");
  };

  return (
    <div className="data-form">
      <h1>Registration Form</h1>
      <div className="form-group">
        <div>
          <label>FirstName:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>LastName:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>PhoneNo:</label>
          <input
            type="tel"
            value={phone}
            autoComplete="off"
            pattern="[0-9]*"
            maxLength="10"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>
            {editingData ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserData;
