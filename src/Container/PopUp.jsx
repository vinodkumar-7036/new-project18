import React from "react";
// import CloseIcon from "@mui/icons-material/Close";
const PopUp = ({ message, onClose }) => {
  return (
    <div>
      <div className="popup-content">
        <p style={{ color: "red" }}>{message}</p>
        <span onClick={onClose}>{/* <CloseIcon /> */}</span>
      </div>
    </div>
  );
};

export default PopUp;
