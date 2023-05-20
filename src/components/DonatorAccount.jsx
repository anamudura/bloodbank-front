import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function DonatorAccount() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const id = location.state?.id;
  const { id } = useParams();
  const [user, setUser] = useState({
    //id: 0,
    email: "",
    location: "",
    nume: "",
    password: "",
  });
  const { nume, username, email, location, password } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const loadDonator = async () => {
    console.log("Id din Account" + id);
    const result = await axios.get(`http://localhost:8080/donator/don/${id}`);
    setUser(result.data);

  }
  useEffect(() => {
    loadDonator();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">This is your account</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b>
                  {user.nume}
                </li>
                <li className="list-group-item">
                  <b>Location:</b>
                  {user.location}
                </li>
                <li className="list-group-item">
                  <b>Email:</b>
                  {user.email}
                </li>
                <li className="list-group-item">
                  <b>Password:</b>
                  {user.password}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={`/`}>
            Back to Home
          </Link>
          <Link
            className="btn btn-outline-primary mx-2"
            to={`/edit-acc/${id}`}
          >
            Edit
          </Link>
          <Link
            className="btn btn-outline-primary mx-2"
            to={`/delete-acc/${id}`}
          >
            Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
}
export default DonatorAccount;