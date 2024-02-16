import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLocalStorageData } from '../utils/localstorage';

import axios, { AxiosError, isAxiosError } from 'axios';

import '../styles/video.css';
import { getItem } from 'localforage';
import { getTimeDifference } from '../utils/date';


import useSWR from 'swr'; // Import useSWR from SWR library
import { useVideoInformation } from '../services/queries';
import Comments from '../components/Comments';

const Video = () => {
    const navigate=useNavigate()
  // Get the videoId parameter from the URL
  const { videoId } = useParams();
  
  
  const newvideoId=Number(videoId)
  const {data:videoInformation,mutate,error}=useVideoInformation(newvideoId)

  React.useEffect(() => {
    if (!videoInformation) mutate()
  }, [videoInformation, mutate]);

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
                <source src={videoInformation.videoLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            
            <h2>{videoInformation["title"]}</h2>

            <div className='user-info'>
                <div className='user-info-picture'>
                    <img id='details-userPic' src='/images/test.jpeg' alt='Video thumbnail' height="50px" ></img>
                </div>
                
                    <div className='user-text-info'>

                  <h3>{videoInformation.user.name}</h3>  
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



        <div className='video-comments'>
          <Comments videoId={newvideoId}/>

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
