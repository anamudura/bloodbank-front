import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams, Link} from 'react-router-dom';
function DoctorPage()
{
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();
    const id = location.state.id;
    const [locations, setLocations] = useState([])
    const [appointments, setAppoint] = useState([])
 


    useEffect(() => { 
       
    });
    const navigateToAppoint = () => {
        navigate('/appoint');
      };
   
    return (
        <div>
            <h1>Doctor page</h1>
            <p>Welcome back Doctor </p>
            <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/appoint/${id}`}
                    >
                     Get Todays Appointments
            </Link>
            <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/allapp/${id}`}
                    >
                     Get All Appointments
            </Link>
        </div>
    );
}
export default DoctorPage;