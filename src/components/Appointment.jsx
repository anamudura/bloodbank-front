
import { useState } from "react";

import axios from "axios";

function Appointment() {


  const [bloodtype, setBloodType] = useState("");
  const [prog, setProg] = useState("");
  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/appointment", {
        bloodtype: bloodtype,
        prog: prog,
      });
      alert("Appointment Made Successfully");

    } catch (err) {
      alert(err);
    }
  }

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

            <button type="submit" class="btn btn-primary mt-4" onClick={save} >Save</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Appointment;