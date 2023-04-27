import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AdminPage()
{
    const navigate = useNavigate();
    const navigateToDoc = () =>
    {
        navigate("/users");
    }
    
    return (
        <div>
            <h1>Admin Page</h1>
            <p>Restricted area! Only users with the admin role are authorized.</p>
            <p>Manage doctors in the bank</p>
            <button onClick={navigateToDoc}>Manage</button>
        </div>
        

    );
}
export default AdminPage;