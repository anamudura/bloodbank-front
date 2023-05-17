import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Pagination } from "react-bootstrap";
function AllAppoint() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [appointments, setAppoint] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    loadTodayApp();
  });

  const loadTodayApp = async () => {
    const result = await axios.get(
      "http://localhost:8080/allapp",
      {
        params: {
          id: id,
          page: currentPage,
          size: pageSize
        }
      }
    );
    const appointmentsWithConfirmation = result.data.map((app) => ({
      ...app,
      confirmed: false,
    }));

    setAppoint(appointmentsWithConfirmation);
  };

  useEffect(() => {
    loadTodayApp();
  }, []); // Empty dependency array to run only once when the component mounts


  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  const start = currentPage * pageSize;
  const end = (currentPage + 1) * pageSize;
  const confirmApp = async (event, id) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8080/allapp/${id}`, {});
      alert("Appointment Confirmed Successfully");
    } catch (err) {
      alert(err);
    }
  };
  const pagesCount = Math.ceil(appointments.length / pageSize);
  const pages = [...Array(pagesCount).keys()];
  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Bloodtype</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice(start, end).map((app, index) => (
              <tr key={app.id}>
                <th scope="row">{app.id}</th>
                <td>{app.bloodtype}</td>
                <td>{app.prog}</td>
                <button onClick={(event) => confirmApp(event, app.id)}>Confirm</button>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <Pagination count={10} />
        </div>
      </div>
    </div>

  );
}
export default AllAppoint;