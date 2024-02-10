import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLocalStorageData } from '../utils/localstorage';

import axios, { AxiosError, isAxiosError } from 'axios';

import '../styles/video.css';
import { getItem } from 'localforage';
import { getTimeDifference } from '../utils/date';


import useSWR from 'swr'; // Import useSWR from SWR library

const Video = () => {
    const navigate=useNavigate()
  // Get the videoId parameter from the URL
  const { videoId } = useParams();
  
  const fetcher = async (url: string) => {
    try {
      const token = await getLocalStorageData('token') as string;
      const response = await axios.get(url, { headers: { 'jwt_token': token } });
      console.log(response);
      return response.data.result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  
  const { data:videoInformation, error } = useSWR('http://localhost:3005/feed/'+videoId, fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    })

    if (error) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError;
  
          console.log("not logged in")
          if (axiosError.response?.status === 403) {
            navigate("/")
          }
          
        } else {
          console.log('Unexpected error', error);
        }
        return <div>Error fetching video information</div>;}
    if (!videoInformation) return <div>Loading...</div>;
    

  return (
    <div className="video-page" >
      {/* Video content */}

      {videoInformation===null?(
      <div>No such video exists</div>
      ):(
        <>
        <div className="video-information-container">
            
        <div className='video-container'>
            
            <video autoPlay controls>
                <source src={videoInformation["videoLink"]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            
            <h2>{videoInformation["title"]}</h2>

            <div className='user-info'>
                <div className='user-info-picture'>
                    <img id='details-userPic' src='/images/test.jpeg' alt='Video thumbnail' height="50px" ></img>
                </div>
                
                    <div className='user-text-info'>

                  <h3>{videoInformation["user"]["name"]}</h3>  
                  <p>02</p>
                    </div>


               
                
            </div>
            <div className='video-information'>
                <h4>11 views {getTimeDifference(videoInformation["datePosted"])}
                </h4>
                <p>
                    {videoInformation["description"]}
                </p>

            </div>
            
        </div>

        </div>
        <div className='other-videos-previews'>


        </div>
</>
      )}

      

    </div>
  );
};

export default Video;
