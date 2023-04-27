import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register";
import AdminPage from "./components/AdminPage";
import DoctorPage from "./components/DoctorPage";
import DonatorPage from "./components/DonatorPage";
import DonatorAction from "./components/DoctorAction";
import EditDoctor from "./components/EditDoctor";
import AddDoctor from "./components/AddDoctor";
import ViewDoctor from "./components/ViewDoctor";
import DonatorAccount from "./components/DonatorAccount";
import EditDonator from "./components/EditDonator";
import DeleteDonator from "./components/DeleteDonator";
import ShowLocations from "./components/ShowLocations";
import Appointment from "./components/Appointment";
import TodayAppoint from "./components/TodayAppoint";
import AllAppoint from "./components/AllAppoint";




function App() {
  return (
    <div>

      <BrowserRouter>
            <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/donator" element={<DonatorPage />} />
          <Route path="/users" element={<DonatorAction />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/locations" element={<ShowLocations />} />
          <Route path="/account/:id" element={<DonatorAccount />} />
          <Route path="/viewuser/:id" element={<ViewDoctor />} />
          <Route path="/edituser/:id" element={<EditDoctor />} />
          <Route path="/edit-acc/:id" element={<EditDonator />} />
          <Route path="/appoint/:id" element={<TodayAppoint />} />
          <Route path="/allapp/:id" element={<AllAppoint />} />
          <Route path="/delete-acc/:id" element={<DeleteDonator />} />
          <Route path = "/registerdoc" element = {<AddDoctor/>}></Route>
            </Routes>
        </BrowserRouter>
      
    </div>
  );
}

export default App;