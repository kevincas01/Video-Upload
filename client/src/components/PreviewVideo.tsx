import React from 'react'

interface PreviewVideoProps {
    user: string;
    title: string;
  }

  const PreviewVideo: React.FC<PreviewVideoProps> = ({ user, title }) => {
    //   Preview of video will contain  the following order of information:
    //   Video Thumbnail
    //  Video title
    //   User picture and name
    //    Video # of views and date of submission

    return (
    <div className='preview-video-container preview-video-container-mobile'>
        <img src='/images/test.jpeg' alt='Video thumbnail' className='thumbnail mobile-thumbnail' height="50%"></img>
        <div className='preview-video-details'>
            <div className='details-picture'>
                <img id='details-userPic' src='/images/test.jpeg' alt='Video thumbnail' height="50px" ></img>
            </div>
            <div className='details-text'>
                <h2>{title}</h2>
                <p>{user}</p>
                <p> 565k views</p>
            </div>

        </div>
    </div>
  )
}

export default PreviewVideo