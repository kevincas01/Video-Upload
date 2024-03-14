import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios, { AxiosError, isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { getLocalStorageData, setLocalStorageData } from '../utils/localstorage';

import '../styles/login.css'

const Login = () => {
  const navigate = useNavigate();

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errorMessage,setErrorMessage]=useState("")

    const handleLogin = async () => {
      console.log("Logging in")
      
      try {
        
      
        const response = await axios.post("http://localhost:3005/authenticate/login", {
          email:email,
          password:password,
        });
        if (response.data){
          setLocalStorageData("token",response.data.result.token)

          navigate("/feed")

        }
      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response?.status === 403) {
            setErrorMessage(error.response?.data.message,)

            setTimeout(()=>{
              setErrorMessage("")
            },5000)
          }
          
        } else {
          console.log('Unexpected error', error);
        }
      }
    };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-form">
        {/* <form action="{{url_for('login_page')}}" method="GET"> */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            name="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Login{" "}
        </button>
        {/* </form> */}

        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

        <span>Or</span>
        <div>
          <button> Google</button>
        </div>

        <div>
          <span>
            Don't have an account? <Link to={"/register"}>Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login