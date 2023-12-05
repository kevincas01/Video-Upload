
import axios, { AxiosError, isAxiosError } from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { clearLocalStorageData, getLocalStorageData } from '../utils/localstorage';
import Upload from './Upload';


interface User{

    id:string,
    name:string,
    email:string,
    password:string
}
const Feed = () => {
    const navigate=useNavigate()
    const [users,setUsers]=useState([])

    const [searchInput,setSearchInput]=useState<string>("");
    const [selectedTag, setSelectedTag]=useState<string>("All");
    
    
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

    const handleSearch = ()=>{
      if(!searchInput){
        return
      }

      //Otherwise fetch the videos with the search bar
      //route you to the appropriate page via url that has the search query of the search input 

      console.log("searching")
    }
     //pagination idea request
     // when the user scrolls past the next the last video that is 
     //in view we send a request to get the next page of 10videos (can be any number of videos)
     // 

     //when switching from regular search to maybe a search with keywords, or one wiht a certain tag, 
     // keep track of the mode that we are in and if the mode is different than the previous one, then we 
     // switch the page back to the front, so it would only be the first 1-10 videos 

     //since we might only do this for the tags, we can just keep track of the current tag that is selected which initially will be ALl
     // no need for another state. when a tag is clicked on then we can automatically set the page to 0 since we know that we are requesting
     // different videos





  return (
    <div>

      <div>
        <form onSubmit={handleSearch}>

        <input type='text' placeholder='Search'></input>
        <button> {'->'} </button>
        </form>
      </div>
        
        
        <div>TEST RESULTS:users for now 
            {users.map((user:User)=> (
            <div key={user.id}>{user.name} {user.email} </div>
            ))}
        </div>

        <Upload></Upload>

        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Feed