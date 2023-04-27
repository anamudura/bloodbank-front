import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams, Link } from 'react-router-dom';
function TodayAppoint()
{
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState();
    const [appointments, setAppoint] = useState([])
    useEffect(() => { 
        loadTodayApp();
    });
const date = new Date();   
let currentDay= String(date.getDate()).padStart(2, '0');

let currentMonth = String(date.getMonth()+1).padStart(2,"0");

let currentYear = date.getFullYear();

let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    const loadTodayApp = async () => {
        const result = await axios.get(`http://localhost:8080/getapp/${currentDate}/${id}`);
        setAppoint(result.data);

    }
    return (
        <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
                        <tr>
                <th scope = "col">ID</th>
                <th scope = "col">Bloodtype</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{app.bloodtype}</td>
                  <td>{app.prog}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        
    );
}
export default TodayAppoint;