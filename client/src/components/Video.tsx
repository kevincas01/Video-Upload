import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLocalStorageData } from '../utils/localstorage';

import axios, { AxiosError, isAxiosError } from 'axios';

import '../styles/video.css';
import { getItem } from 'localforage';
import { getTimeDifference } from '../utils/date';

const Video = () => {
  // Get the videoId parameter from the URL
  const { videoId } = useParams();
  
  const [videoInformation, setVideoInformation]=React.useState(null)

  const fetchVideoInformation= async () => {
    
      const local:string=await getLocalStorageData("token") as string

      const response = await  axios.get(`http://localhost:3005/feed/${videoId}`, {headers: {"jwt_token": local}});
      


      setVideoInformation(response.data.result)
  };

  useEffect(()=>{
    fetchVideoInformation()
  },[])
  
  
  


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
