import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { getLocalStorageData } from '../utils/localstorage';
import TagInput from './TagInput';

const Upload = () => {
    const [title,setTitle]=useState<string>("");
    const [description,setDescription]=useState<string>("")
    const [selectedFile, setSelectedFile] = useState<File>();
    const [tags,setTags]=useState<string[]>([]);
    const [newTag, setNewTag] = useState<string>('');

    const [progress,setProgress]=useState<number>(0);

    const [errorMessage,setErrorMessage]=useState("")
    
    // const local:string=await getLocalStorageData("token") as string


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setSelectedFile(selectedFiles?.[0]);
        
      };

    const handleTagsChange = (newTags: string[]) => {
    setTags(newTags);
    };

    const handleUpload = async () => {
        setProgress(0);
        // Handle file upload logic (you can send the file to the server here)
        
        if (selectedFile) {
            console.log('Uploading file:', selectedFile);
        
            try {
                const formData = new FormData();
                formData.append('video', selectedFile);
                formData.append('title', title);
                formData.append('description',description);

          
                // You can add more fields as needed
                // formData.append('otherField', otherFieldValue);
          
                const response = await axios.post('http://localhost:3000/feed', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                  onUploadProgress: (progressEvent) => {
                    if (progressEvent.total !== null && progressEvent.total !== undefined) {
                        // Calculate and update the progress percentage
                        const progressPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(progressPercentage);
                      }
                  },
                });
          
                console.log('Server response:', response.data);
              } catch (error) {
                console.error('Error uploading file:', error);
              }
            
        }
        else{
            setErrorMessage("No File Selected. Select a file to upload")

            setTimeout(()=>{
              setErrorMessage("")
            },5000)
        }
        
      };
  return (
    <div className='upload-container'>

        <input type="text" name="title" placeholder='Video Title' onChange={(e)=>{
            setTitle(e.target.value)
        }}></input>
        <textarea placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}></textarea>
        <TagInput onTagsChange={handleTagsChange}></TagInput>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        {selectedFile && (
        <div>
          <video width="320" height="240" controls>
            <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
        </div>
      )}
        <button onClick={handleUpload}>Upload</button>
        <progress value={progress} max={100}></progress>
    
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            
    </div>
  )
}

export default Upload