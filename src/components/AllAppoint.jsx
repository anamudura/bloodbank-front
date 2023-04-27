import axios from "axios";
import { useEffect, useState } from "react";
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
  const [pageSize, setPageSize] = useState(2);
    useEffect(() => { 
        loadTodayApp();
    });

    const loadTodayApp = async () => {
        const result = await axios.get(
            "http://localhost:8080/allapp",
            {
              params: {
                id : id,
                page: currentPage,
                size: pageSize
              }
            }
          );
        setAppoint(result.data);

    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
  const start = currentPage * pageSize;
  const end = (currentPage + 1) * pageSize;
      
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