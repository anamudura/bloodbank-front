import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login() {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState();

    const navigateToRegister = () => {
      // 👇️ navigate to /contacts
      navigate('/register');
    };
  
    const navigateHome = () => {
      // 👇️ navigate to /
      navigate('/');
    };
    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("http://localhost:8080/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
              console.log(res.data);
              const currentUser = res.data;
              setUser(res.data);
             
             if (res.data.message == "Email not exits") 
             {
               alert("Email not exits");
             } 
             else if(res.data.message == "Login Success")
             { 
                
                navigate('/home');
             } 
              else if(currentUser.roles[0].name == "ROLE_ADMIN")
                { 
                 navigate("/admin");
                 
                }
                else if(currentUser.roles[0].name == "ROLE_DOCTOR")
                { 
                    navigate("/doctor", {state:{id: currentUser.id}});
                    
             }
               
                else if(currentUser.roles[0].name == "ROLE_DONATOR")
             { 
              // const { id } = currentUser.id;
               navigate('/donator', {state:{id : currentUser.id}})
                }
          }, fail => {
           console.error(fail); // Error!
  });
        }

 
         catch (err) {
          alert(err);
        }
      
      }
   
   
   
   
   
   
    return (
       <div>
            <div class="container">
            <div class="row">
                <h2>BLOOD BANK LOGIN</h2>
             <hr/>
             </div>

             <div class="row">
             <div class="col-sm-6">
 
            <form>
        <div class="form-group">
          <label>Email</label>
          <input type="email"  class="form-control" id="email" placeholder="Enter username"
          
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          />

        </div>

        <div class="form-group">
            <label>password</label>
            <input type="password"  class="form-control" id="password" placeholder="Enter Password"
            
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            
            />
          </div>
                            <button type="submit" class="btn btn-primary" onClick={login} >Login</button>
                            <button type="submit" class="btn btn-primary" onClick={navigateToRegister} >Register</button>
                            
              </form>

            </div>
            </div>
            </div>

     </div>
    );
  }
  
  export default Login;