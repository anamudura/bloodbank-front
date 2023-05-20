
import { useEffect,useState } from "react";
import {useParams } from 'react-router-dom';

import axios from "axios";

function Appointment() {


  const [bloodtype, setBloodType] = useState("");
  const [prog, setProg] = useState("");
  const [donator, setDon] = useState("");
  const [location, setLoc] = useState("");
  const { id,index } = useParams();
  async function save(event) {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:8080/donator/appointment/${id}/${index}`, {
        bloodtype: bloodtype,
        prog: prog,
      });
      alert("Appointment Made Successfully");

    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    loadUser();
    loadLoc();
  }, []);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/donator/edituser/${id}`);
    setDon(result.data);
  };

  const loadLoc = async () => {
    const result = await axios.get(`http://localhost:8080/donator/getloc/${index}`);
    console.log(result.data)
    setLoc(result.data);
  };
  
  return (
    <div>
      <div class="container mt-4" >
        <div class="card">
          <h1>Make an appointment</h1>

          <form>
            <div class="form-group">
              <label>BloodType</label>
              <input type="text" class="form-control" id="bloodtype" placeholder="Enter your bloodtype"

                value={bloodtype}
                onChange={(event) => {
                  setBloodType(event.target.value);
                }}
              />

            </div>
            <div class="form-group">
              <label>Select a date</label>
              <input type="date" class="form-control" id="prog" placeholder="Select a date"

                value={prog}
                onChange={(event) => {
                  setProg(event.target.value);
                }}
              />

            </div>
            <li className="list-group-item">
                  <b>Name for the appointment:</b>
                  {donator.nume}
            </li>
            <li className="list-group-item">
                  <b>Location of the appointment:</b>
                  {location.name}
                </li>

            <button type="submit" class="btn btn-primary mt-4" onClick={save} >Save</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Appointment;