import React,{ FormEvent } from 'react'
import { useVideoComments } from '../services/queries';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosError, isAxiosError } from 'axios';
import { useCreateComment } from '../services/mutations';
import { VideoComments } from '../types/comment';
const Comments = ({videoId}:{videoId:number}) => {

    const navigate=useNavigate()

    const [commentText,setCommentText]=React.useState<string>("")

    const {data:comments,isLoading,mutate,error}=useVideoComments(videoId)
    
    React.useEffect(() => {
        if (!comments) mutate()
      }, [comments, mutate]);
    const {trigger}=useCreateComment(videoId)

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
    

    const cancelComment = (e: FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        // Add additional logic if needed
        setCommentText("")
    };
    const submitComment = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        trigger({comment:commentText})
        setCommentText("")
    };
  return (
    <>
        <h2>Comments</h2>

        <form onSubmit={submitComment}>
            <input type="text" placeholder="Comment" onChange={(e)=>{setCommentText(e.target.value)}} value={commentText}></input>
            <div className='comment-input-buttons'>
                <button onClick={cancelComment}>Cancel</button>
                <button id='comment-button' type="submit">Comment</button>
            </div>
        </form>

        {isLoading?(
        <div>Loading...</div>
        ):(
            <>
            {comments && comments.length>0? (
                comments.map((comment: VideoComments) => (
                    <div key={comment.commentId}>{comment.text}</div>
                ))
            ) : (
                <div>There are no comments currently. Be the first one to comment!</div>
            )}
        </>
        
        )}
    </>
  )
}

export default Comments