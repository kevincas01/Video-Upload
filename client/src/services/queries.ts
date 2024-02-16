
import useSWR  from 'swr'; // Import useSWR from SWR 
import useSWRInfinite from 'swr/infinite'

import { VideoComments } from '../types/comment';
import { VideoInformation } from '../types/video';
import { VideoPreviewInformation } from "../types/videoPreview";
import fetcher from './fetcher';


export function useVideoPreviews(){
    const getKey=(pageIndex:number,previousPageData:VideoPreviewInformation[])=>{

        if(previousPageData && !previousPageData.length) return null
        return `/feed?page=${pageIndex}&limit=1` 
    }

    return useSWRInfinite<VideoPreviewInformation[]>(getKey,fetcher)
}



export function useVideoInformation(id:number){

    return useSWR<VideoInformation>("/feed/"+id, fetcher
        );

}

export function useVideoComments(videoId:number){

    return useSWR<VideoComments[]>("/video/"+videoId, fetcher
        );

}