import axios from "axios";
import React,{ useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Pagination } from "react-bootstrap";
function AllAppoint()
{
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
  const handleConfirmationChange = async (index) => {
    const updatedAppointments = [...appointments];
    updatedAppointments[index].confirmed = !updatedAppointments[index].confirmed;
    
    setAppoint(updatedAppointments);
  
    // Make API call to update the confirmation status
    const appointmentId = updatedAppointments[index].id;
    const response = await axios.post(
      `http://localhost:8080/allapp/${appointmentId}/confirmed`,
      {
        confirmed: updatedAppointments[index].confirmed, 
      }
    );
  
    // Handle success or error response from the server if needed
    if (response.status === 200) {
      console.log("Confirmation status updated successfully.");
    } else {
      console.error("Error updating confirmation status.");
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
                <th scope = "col">ID</th>
                <th scope = "col">Bloodtype</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(start,end).map((app, index) => (
                  <tr key={app.id}>
                  <th scope="row">{app.id}</th>
                  <td>{app.bloodtype}</td>
                  <td>{app.prog}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={app.confirmed}
                      onChange={() => handleConfirmationChange(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
                </table>
                <div className="pagination">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page + 1}
          </button>
        ))}
                    <Pagination count={10} />
                </div>
        </div>
      </div>
        
    );
}
export default AllAppoint;