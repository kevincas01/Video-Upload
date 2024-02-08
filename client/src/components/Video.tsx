import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getLocalStorageData } from '../utils/localstorage';

import axios, { AxiosError, isAxiosError } from 'axios';

const Video = () => {
  // Get the videoId parameter from the URL
  const { videoId } = useParams();
  
  const [videoInformation, setVideoInformation]=React.useState("")

  const fetchVideoInformation= async () => {
    
      const local:string=await getLocalStorageData("token") as string

      const response = await axios.get('http://localhost:3005/feed/', {headers: {"jwt_token": local }});
      
      console.log("response from server for feed-",response.data.result)

    
  };

  return (
    <div>
      {/* Video content */}
      <h2>Video ID: {videoId}</h2>
    </div>
  );
};

export default Video;
