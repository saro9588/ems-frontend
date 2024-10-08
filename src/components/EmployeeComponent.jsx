import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmplyee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { id } = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);
      if (id) {
        updateEmplyee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error("There was an error creating the employee!", error);
          });
      }
    }
  }
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    errorsCopy.firstName = firstName.trim() ? "" : "First name required";
    errorsCopy.lastName = lastName.trim() ? "" : "Last name required";
    errorsCopy.email = email.trim() ? "" : "Email required";
    valid = !errorsCopy.firstName && !errorsCopy.lastName && !errorsCopy.email;
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Emplyee</h2>;
    } else {
      return <h2 className="text-center">Add Emplyee</h2>;
    }
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter employee first name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  } `}
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter employee last name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  } `}
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="Enter employee email"
                  name="email"
                  value={email}
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  } `}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
