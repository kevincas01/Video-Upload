
import useSWR from 'swr'; // Import useSWR from SWR library
import { VideoComments } from '../types/comment';
import { VideoInformation } from '../types/video';
import { VideoPreviewInformation } from "../types/videoPreview";
import fetcher from './fetcher';



export function useVideoPreviews(){

    return useSWR<VideoPreviewInformation[]>("/feed", fetcher
        );

}

export function useVideoInformation(id:number){

    return useSWR<VideoInformation>("/feed/"+id, fetcher
        );

}

export function useVideoComments(videoId:number){

    return useSWR<VideoComments[]>("/video/"+videoId, fetcher
        );

}