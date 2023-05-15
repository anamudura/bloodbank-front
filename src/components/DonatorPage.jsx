import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation, useParams, Link} from 'react-router-dom';
function DonatorPage()
{
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState();
    const id = location.state.id;
    //const id = location.state.id;
    const getUser = async() => {
        // 👇️ navigate to /
        console.log("Din DonatorPage " + id);
        const res = await axios.get(`http://localhost:8080/donator/${id}`);
        setUser(res.data);
        //console.log("Dupa fetch " + res.data.id);
       // const user = res.data;
        //navigate('/account', {state : {id: user.id}});
    };
    const navigateToLocations = () =>
        {
        navigate("/locations");
        }
    useEffect(() => { 
        getUser();
    });
      
    return (
        <div>
            <h1>Donator Page</h1>
            <p>Welcome back Donator!</p>
            <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/account/${id}`}
                    >
                      Edit your account
            </Link>
            {/* <button type="submit" class="btn btn-primary" onClick={navigateToLocations}>See the locations of all blood banks</button> */}
            <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/locations/${id}`}
                    >
                      See the locations of all blood banks
            </Link>
            
            
        </div>
    );
}
export default DonatorPage;