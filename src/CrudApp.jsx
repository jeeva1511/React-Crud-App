import React from "react";
import { useState } from "react";
import "./App.css";

export const CrudApp = () => {
  const [inputData, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });
  const [savedData, setSavedData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = () => {
    // Validation: Ensure all fields are filled
    if (
      !inputData.fname ||
      !inputData.lname ||
      !inputData.email ||
      !inputData.phone
    ) {
      setError("All fields are required!");
      return;
    }
    setError(""); // Clear the error if all fields are filled.

    // for editing : edited value have to send it to it's original so we use this method.
    if (isEditing) {
      const tempArr = savedData.map((data, index) =>
        index === editIndex ? inputData : data
      );
      setSavedData(tempArr);
      setIsEditing(false);
      setEditIndex();
    } else {
      setSavedData([...savedData, inputData]);
    }

    // Reset form after submission
    setInputData({
      fname: "",
      lname: "",
      email: "",
      phone: "",
    });
  };
  // For Edit Function if we initiate the function then it pass the value to the inputField
  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setInputData(savedData[index]);
  };
  // DELETE FUNCTION
  const handleDelete = (index) => {
    const tempArr = [...savedData];
    tempArr.splice(index, 1);
    setSavedData(tempArr);
  };

  return (
    <>
      {/* For Form Fields */}
      <section>
        <div className="container mt-3">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      {/* First Name */}
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="form-control"
                          name="fname"
                          onChange={handleChange}
                          value={inputData.fname}
                        />
                      </div>
                    </div>
                    {/* Last Name */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="form-control"
                          name="lname"
                          onChange={handleChange}
                          value={inputData.lname}
                        />
                      </div>
                    </div>
                    {/* Email */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          name="email"
                          onChange={handleChange}
                          value={inputData.email}
                        />
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="number"
                          placeholder="Phone"
                          className="form-control"
                          name="phone"
                          onChange={handleChange}
                          value={inputData.phone}
                        />
                      </div>
                    </div>
                    {/* Error Message */}
                    {error && (
                      <div className="col-md-12">
                        <p className="text-danger text-center">{error}</p>
                      </div>
                    )}
                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Table */}
      <section>
        <div className="container">
          <div className="row mt-5">
            <div className="col">
              <div className="card tableCard">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-responsive align-middle">
                      <thead className="thead">
                        <tr>
                          <th className="col">S.No</th>
                          <th className="col">First Name</th>
                          <th className="col">Last Name</th>
                          <th className="col">Email</th>
                          <th className="col">Phone</th>
                          <th className="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {savedData.map((savedData, index) => (
                          <tr key={index} className="tbodyrow">
                            <th>{index + 1}</th>
                            <td>{savedData.fname}</td>
                            <td>{savedData.lname}</td>
                            <td>{savedData.email}</td>
                            <td>{savedData.phone}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <button
                                  type="submit"
                                  className="btn btn-info mb-1"
                                  onClick={() => handleEdit(index)}
                                >
                                  Edit
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-danger ms-2"
                                  onClick={() => handleDelete(index)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
