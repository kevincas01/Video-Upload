import React from 'react'
import { getTimeDifference } from '../utils/date';

interface PreviewVideoProps {
    videoid:number;
    user: string;
    title: string;
    thumbnailSrc:string;
    likes:number;
    date: Date;
  }

  const PreviewVideo: React.FC<PreviewVideoProps> = ({ videoid,thumbnailSrc, user, title,likes,date }) => {
    //   Preview of video will contain  the following order of information:
    //   Video Thumbnail
    //  Video title
    //   User picture and name
    //    Video # of views and date of submission



    const [datePast,setDatePast]=React.useState<string>('')

    React.useEffect(() => {
        // Get the current date
        const timeLabel=getTimeDifference(date)
        // Update the datePast state with the time label
        setDatePast(timeLabel);
    }, []);

    
    return (
    <div className='preview-video-container preview-video-container-mobile'>
        <img  src={thumbnailSrc} alt='Video thumbnail' className='thumbnail mobile-thumbnail' height="50%"></img>
        <div className='preview-video-details'>
            <div className='details-picture'>
                <img id='details-userPic' src='/images/test.jpeg' alt='Video thumbnail' height="50px" ></img>
            </div>
            <div className='details-text'>
                <h2>{title}</h2>
                <p>{user}</p>
                <p>{likes} likes~<span>{datePast}</span></p>
                
            </div>

        </div>
    </div>
  )
}

export default PreviewVideo