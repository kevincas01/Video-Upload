import { useVideoComments } from "./queries";

import useSWRMutation from 'swr/mutation'
import { createComment } from "./api";
export function useCreateComment(videoId:number){
    const {mutate}=useVideoComments(videoId);

    return useSWRMutation('/video/comment/'+videoId,
    createComment,
    {
        onSuccess:()=>{
            mutate();
        },
        
    }
    );
}