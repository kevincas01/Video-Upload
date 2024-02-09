import React from 'react'

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
        const currentDate = new Date();
        
        console.log(currentDate)
        // Calculate the time difference in milliseconds
    const timeDifference = currentDate.getTime() - new Date(date).getTime();

    // Calculate the time difference in minutes, hours, and days
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Determine the time label based on the time difference
    let timeLabel = "";
    if (daysAgo >= 2) {
        timeLabel = `${daysAgo} days ago`;
    } else if (daysAgo === 1) {
        timeLabel = "1 day ago";
    } else if (hoursAgo >= 2) {
        timeLabel = `${hoursAgo} hours ago`;
    } else if (hoursAgo === 1) {
        timeLabel = "1 hour ago";
    } else if (minutesAgo >= 2) {
        timeLabel = `${minutesAgo} minutes ago`;
    } else if (minutesAgo === 1) {
        timeLabel = "1 minute ago";
    } else {
        timeLabel = "Just now";
    }

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