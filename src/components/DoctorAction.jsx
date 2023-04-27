import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function DoctorAction()
{
  const navigate = useNavigate();  
  const [doctors, setDoctors] = useState([])
    useEffect(() => { 
        loadDoctors();
    });
    
    const loadDoctors = async() =>
        {
        const result = await axios.get("http://localhost:8080/users");
        setDoctors(result.data);

    }
    const deleteUser = async (id) => {
        await axios.post(`http://localhost:8080/users/${id}`);
        loadDoctors();
      };
      const navigateToRegisterDoc = () => {
        // 👇️ navigate to /contacts
        navigate('/registerdoc');
      };
    return (
        <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
                        <tr>
                <th scope = "col">ID</th>
                <th scope="col">Email</th>
                <th scope="col">Location</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((user, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{user.email}</td>
                  <td>{user.location}</td>
                  <td>{user.nume}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/viewuser/${user.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/edituser/${user.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={navigateToRegisterDoc}>Add New Doctor</button>
        </div>
      </div>
    );
}
export default DoctorAction;