import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function ShowLocations()
{
  const navigate = useNavigate();  
  const [locations, setLocations] = useState([])
  const { id } = useParams();
    useEffect(() => { 
        loadLocations();
    });
    
    const loadLocations = async () => {
        const result = await axios.get("http://localhost:8080/locations");
        setLocations(result.data);

    }
    return (
        <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
                        <tr>
                <th scope = "col">ID</th>
                <th scope="col">Nume</th>
                <th scope="col">Inceput</th>
                <th scope="col">Final</th>
                <th scope="col">Adresa</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((user, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{user.name}</td>
                  <td>{user.inceput}</td>
                  <td>{user.sfarsit}</td>
                  <td>{user.adresa}</td>
                  <td>
                  <Link
                      className="btn btn-primary mx-2"
                      to={`/appointment/${id}/${index+1}`}
                    >
                      Make appointment here
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/stats/${index+1}`}
                    >
                      Download stats for this clinic
            </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
export default ShowLocations;