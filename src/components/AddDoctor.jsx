import {  useState } from "react";

import axios from "axios";

function AddDoctor() {
  
    
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [nume, setNume] = useState("");
  const [password, setPassword] = useState("");

 
    


    async function save(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/admin/registerdoc", {
          email: email,
          location: location,
          nume: nume,
          password: password,
          });
          alert("Doctor Registation Successfully");

        } catch (err) {
          alert(err);
        }
      }
  
    return (
    <div>
    <div class="container mt-4" >
    <div class="card">
            <h1>Admin Page - Doctor Registration</h1>
    
    <form>
        <div class="form-group">
          <label>Email</label>
          <input type="text"  class="form-control" id="email" placeholder="Enter Email"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          />

        </div>

        <div class="form-group">
          <label>Location</label>
          <input type="text"  class="form-control" id="location" placeholder="Enter Location"
          
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          
          />
 
        </div>

        <div class="form-group">
            <label>Nume</label>
            <input type="text"  class="form-control" id="nume" placeholder="Enter name"
            
            value={nume}
            onChange={(event) => {
              setNume(event.target.value);
            }}
            
            />
              </div>
              <div class="form-group">
            <label>Password</label>
            <input type="password"  class="form-control" id="password" placeholder="Enter password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>

        <button type="submit" class="btn btn-primary mt-4" onClick={save} >Register</button>
       
      </form>
    </div>
    </div>
     </div>
    );
  }
  
  export default AddDoctor;