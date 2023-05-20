import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Pagination } from "react-bootstrap";

function AllAppoint() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [appointments, setAppoint] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    loadTodayApp();
  }, [currentPage]); // Load data whenever currentPage changes

  const loadTodayApp = async () => {
    const result = await axios.get(
      "http://localhost:8080/doctor/allapp",
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

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pagesCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    navigate(`/allapp/${id}?page=${currentPage + 1}`);
  }, [currentPage, navigate, id]); // Trigger navigation when currentPage changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const start = currentPage * pageSize;
  const end = (currentPage + 1) * pageSize;

  const confirmApp = async (event, id) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8080/doctor/allapp/${id}`, {});
      alert("Appointment Confirmed Successfully");
    } catch (err) {
      alert(err);
    }
    loadTodayApp();
  };

  const denyapp = async (event, id) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8080/doctor/allappd/${id}`, {});
      alert("Appointment Denied Successfully");
    } catch (err) {
      alert(err);
    }
    loadTodayApp();
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
              <th scope="col">Confirmed</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice(start, end).map((app, index) => (
              <tr key={app.id}>
                <th scope="row">{app.id}</th>
                <td>{app.bloodtype}</td>
                <td>{app.prog}</td>
                <td>{app.confirmed ? "Yes" : "No"}</td>
                <button onClick={(event) => confirmApp(event, app.id)}>Confirm</button>
                <button onClick={(event) => denyapp(event, app.id)}>Decline</button>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <Pagination>
            <Pagination.Prev onClick={goToPreviousPage} disabled={currentPage === 0} />
            {pages.map((page) => (
              <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={goToNextPage} disabled={currentPage === pagesCount - 1} />
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default AllAppoint;
