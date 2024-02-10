
import axios, { AxiosError, isAxiosError } from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { clearLocalStorageData, getLocalStorageData } from '../utils/localstorage';
import PreviewVideo from './PreviewVideo';
import Upload from './Upload';


import useSWR from 'swr'; // Import useSWR from SWR library

interface VideoPreview {
  videoid: number;
  title: string;
  totalLikes: number;
  thumbnailLink: string;
  datePosted: Date;
  tag: string[];
  user: { name: string };
}


const Feed = () => {
    const navigate=useNavigate()
    // Define fetcher function to fetch videos
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
    

    // Use useSWR to fetch videos
    const { data:videos,mutate, error } = useSWR('http://localhost:3005/feed', fetcher, {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false
    }
  );

  React.useEffect(() => {
    if (!videos) mutate()
  }, [videos, mutate]);

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
      return <div>Error fetching videos</div>;}
    if (!videos) return <div>Loading...</div>;

    const logout=()=>{
      clearLocalStorageData()
      navigate('/')

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



     const handleVideoPreviewClick=(videoId:number)=>{

      //handle navigating to the Video component that shows everything that has to do with the videoId given
      // feed/videoId-----sending through url the videoId

      navigate(`/feed/${videoId}`);
      console.log(videoId)
    }


  return (
    <div>

    
        
        <h1>YOUTUBE VIDEOSS</h1>
        <div className='feed-container'>
            {videos.map((video:VideoPreview)=> (

            <div key={video.videoid} onClick={()=>{handleVideoPreviewClick(video.videoid)}}>
              
              <PreviewVideo  videoid={video.videoid} thumbnailSrc={video.thumbnailLink} user={video.user.name} title={video.title} likes={video.totalLikes} date={video.datePosted}></PreviewVideo> </div>
            ))}
        </div>

        
        <button className="logout" onClick={logout}>Logout</button>
    </div>
  )
}

export default Feed