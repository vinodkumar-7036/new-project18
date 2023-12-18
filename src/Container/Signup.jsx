import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateFormData } from "./Redux/Actions";
import "../Container/LogIn/SignUp.css";

const Signup = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { code } = useParams();
  const formData = useSelector((state) => state.formData);
  const editingIndex = useSelector((state) => state.editingIndex);

  const [isSignedUp, setIsSignedUp] = useState(false);

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reenterpassword: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reenterpassword: "",
  });

  useEffect(() => {
    if (mode === "edit" && code && formData[code]) {
      const editedData = formData[code];
      setFormValues({ ...editedData });
    } else {
      setFormValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        reenterpassword: "",
      });
    }
  }, [mode, code, formData]);

  const clearForm = () => {
    setFormValues({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reenterpassword: "",
    });
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reenterpassword: "",
    });
  };
  const handleSignUp = () => {
    const { firstName, lastName, email, password, reenterpassword } =
      formValues;

    const newErrors = {
      firstName: !firstName ? "First Name is required." : "",
      lastName: !lastName ? "Last Name is required." : "",
      email: !email ? "Email is required." : "",
      password: !password ? "Password is required." : "",
      reenterpassword: !reenterpassword ? "Re-enter Password is required." : "",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    const existingUserData = JSON.parse(localStorage.getItem("UserData")) ?? [];
    if (mode === "edit" && editingIndex !== undefined) {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      dispatch(updateFormData(editingIndex, newUser));
      existingUserData[editingIndex] = newUser;
    }
    const isUserExist = existingUserData.some((user) => user.email === email);
    if (isUserExist && mode !== "edit") {
      alert(
        "User with this email already exists. Please use a different email."
      );
    } else {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      if (mode !== "edit") {
        existingUserData.push(newUser);
      }
      localStorage.setItem("UserData", JSON.stringify(existingUserData));
      clearForm();
      setIsSignedUp(true);
      alert("Details Submitted Successfully");
      navigate("/");
    }
  };

  return (
    <>
      <div className="signup-container">
        <h1>SignUp Form</h1>
        <div className="input-container">
          <label>firstName:</label>
          <input
            type="text"
            value={formValues.firstName}
            autoComplete="on"
            onChange={(e) =>
              setFormValues({ ...formValues, firstName: e.target.value })
            }
          />
          <p className="input-error">{errors.firstName}</p>
          <label>LastName:</label>
          <input
            type="text"
            value={formValues.lastName}
            autoComplete="on"
            onChange={(e) =>
              setFormValues({ ...formValues, lastName: e.target.value })
            }
          />
          <p className="input-error">{errors.lastName}</p>

          <label>Email:</label>
          <input
            type="email"
            value={formValues.email}
            autoComplete="on"
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
          <p className="input-error">{errors.email}</p>

          <label>Password:</label>
          <input
            type="password"
            value={formValues.password}
            autoComplete="on"
            onChange={(e) =>
              setFormValues({ ...formValues, password: e.target.value })
            }
          />
          <p className="input-error">{errors.password}</p>

          <label>Re-Enter-Password:</label>
          <input
            type="password"
            value={formValues.reenterpassword}
            autoComplete="on"
            onChange={(e) =>
              setFormValues({
                ...formValues,
                reenterpassword: e.target.value,
              })
            }
          />
          <p className="input-error">{errors.reenterpassword}</p>

          <div style={{ marginTop: "20px" }} className="button-container">
            {mode !== "edit" && (
              <button
                style={{
                  marginRight: "10px",
                  backgroundColor: "rgb(16 141 150)",
                }}
                onClick={clearForm}
              >
                Clear
              </button>
            )}
            <button onClick={handleSignUp}>{mode ? "Update" : "SignUp"}</button>
          </div>
        </div>
        {isSignedUp && <p style={{ color: "green" }}>Signup successfull</p>}
      </div>
    </>
  );
};

export default Signup;
