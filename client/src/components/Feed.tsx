
import axios, { AxiosError, isAxiosError } from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { clearLocalStorageData, getLocalStorageData } from '../utils/localstorage';


interface User{

    id:string,
    name:string,
    email:string,
    password:string
}
const Feed = () => {
    const navigate=useNavigate()
    const [users,setUsers]=useState([])
    
    const fetchUsers = async () => {
    
      try {
        const local:string=await getLocalStorageData("token") as string

        const response = await axios.get('http://localhost:3005/feed', {headers: {"jwt_token": local }});
        
        console.log("response from server for feed-",response.data.result)

        setUsers(response.data.result);
        

      } catch (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response?.status === 403) {
            navigate("/")
          }
          
        } else {
          console.log('Unexpected error', error);
        }
      }
    };

    useEffect(() => {
      fetchUsers(); // Call the async function immediately
    }, []);


    const logout=()=>{
      clearLocalStorageData()
      navigate('/')

    }
  return (
    <div>
        Users: 
        
        <div>Hellooo 
            {users.map((user:User)=> (
            <div key={user.id}>{user.name} {user.email} Password-{user.password}</div>
            ))}
        </div>

        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Feed