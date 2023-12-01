import React, { useState } from 'react'
import axios from 'axios';
const Register = () => {
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [password2,setPassword2]=useState("")


  const handleRegister = async () => {
    console.log("Registering")
    console.log("registering",name)
    if (!name || !email|| !password||!password2){
        console.log("Field misssing")
    }
    else if (password!=password2){
        console.log("passwords dont match")
    }
    else{
        try {
            const response = await axios.post("http://localhost:3005/authenticate/register", {
              name:name, 
              email:email,
              password:password,
            });
      
            console.log(response.data); // Handle successful login response
          } catch (error) {
            console.log("Axios error:", error);
          }
        
    }
    
  };
  return (
    <div>

      <h1>Register</h1>
      {/* <form action={handleRegister}> */}

      <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Name" name="name" required onChange={(e)=>{
                      setName(e.target.value)
                  }} />
          
      </div>

      <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Email" name="email" required onChange={(e)=>{
                      setEmail(e.target.value)
                  }}/>
          <div  className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Password" name="password" required onChange={(e)=>{
                      setPassword(e.target.value)
                  }}/>
          
      </div>
      <div  className="input-group mb-3">
          <input type="password" className="form-control" placeholder="Confirm Password" name="password2"required onChange={(e)=>{
                      setPassword2(e.target.value)
                  }}/>
          
      </div>
      </div>

      <button onClick={handleRegister} value="Register"  >Register</button>


      {/* </form> */}

      <span>Or</span>
      <div>
          <button> Google</button>
      </div>

    </div>
  )
}

export default Register