import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    email: "",
    location: "",
    nume: "",
    password: "",
  });

  const { nume, username, email,location,password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8080/admin/edituser/${id}`, user);
    navigate("/users");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/admin/edituser/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Doctor</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new email"
                name="email"
                value={user.email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Location" className="form-label">
                Location
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new location"
                name="location"
                value={user.location}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Nume" className="form-label">
                Nume
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new name"
                name="nume"
                value={user.nume}
                onChange={(e) => onInputChange(e)}
              />
                      </div>
                      <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new password"
                name="password"
                value={user.password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/users">
              Cancel
                      </Link>
          </form>
        </div>
      </div>
    </div>
  );
}