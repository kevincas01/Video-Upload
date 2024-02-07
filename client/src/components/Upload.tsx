import axios from 'axios';
import React, { useState , ChangeEvent, DragEvent,useCallback } from 'react'
import { getLocalStorageData } from '../utils/localstorage';
import TagInput from './TagInput';

import {useDropzone} from 'react-dropzone'

const Upload = () => {
    const [title,setTitle]=useState<string>("");
    const [titleCount, setTitleCount]=useState<number>(0);
    const [description,setDescription]=useState<string>("");
    const [descriptionCount,setDescriptionCount]=useState<number>(0);
    const [selectedFile, setSelectedFile] = useState<File>();
    const [thumbnailFile, setThumbNailFile] = useState<File>();
    const [tags,setTags]=useState<string[]>([]);
    const [newTag, setNewTag] = useState<string>('');

    const [progress,setProgress]=useState<number>(0);

    const [errorMessage,setErrorMessage]=useState("")
    
    // const local:string=await getLocalStorageData("token") as string

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    };
  
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      setSelectedFile(files?.[0]);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const selectedFiles = files as FileList;
        setSelectedFile(selectedFiles?.[0]);
        
      };

    const handleTagsChange = (newTags: string[]) => {
      setTags(newTags);
    };

    const handleThumbnailChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
      const { files } = event.target;
        const selectedFiles = files as FileList;
        setThumbNailFile(selectedFiles?.[0]);
    }

    const onDrop = useCallback((acceptedFiles:Array<File>) => {
      
      setSelectedFile(acceptedFiles?.[0]);
  }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({accept: { 'video/*': [] }, onDrop});

    const handleUpload = async () => {
        setProgress(0);
        // Handle file upload logic (you can send the file to the server here)
        
        if (selectedFile) {
        
            try {
                const formData = new FormData();
                formData.append('video', selectedFile);
                if(thumbnailFile){

                  formData.append('thumbnail', thumbnailFile);
                }
                formData.append('title', title);
                formData.append('description', description);
                const tagsString = tags.join(','); // Convert the array of strings to a single comma-separated string
                formData.append('tags', tagsString);


            console.log(title,description,tags)
            console.log('Form data entries:');
          formData.forEach((value, key) => {
              console.log(key, value);
            });
          
                // You can add more fields as needed
                // formData.append('otherField', otherFieldValue);
                const local:string=await getLocalStorageData("token") as string
                const response = await axios.post('http://localhost:3005/feed/post', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    "jwt_token": local
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


    const handleTitleChange = (e:any) => {
      const newContent = e.target.innerText;
      setTitle(newContent);
      setTitleCount(newContent.length);
    };

    const handleDescriptionChange = (e:any) => {
      const newContent = e.target.innerText;
      setDescription(newContent);
      setDescriptionCount(newContent.length);
    };

  return (
    <div className='upload-container'>

      <div className="file-selection-container">

        <div className='file-select'>

          <div {...getRootProps()}>
            <input {...getInputProps()} />

            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
          </div>
          
        


        </div>
        

          {selectedFile && (
            <div className="selected-file">
              <h2>{selectedFile.name}</h2>
              <video width="320" height="240" controls>
                <source src={URL.createObjectURL(selectedFile)} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div>
                <label htmlFor="thumbnail">Selected File for Thumbnail</label>
                <input type='file' accept="image/*" name="thumbnail" onChange={handleThumbnailChange}></input>
              </div>

              {thumbnailFile && (
                <img src={URL.createObjectURL(thumbnailFile)} alt="Thumbnail" width="320" height="240" />
                )}
            </div>

      )}
      </div>
      

     <div className="input-container">

      <h1>Details</h1>

      <div className="title-container">
          <div className="label">
            Title (required)
          </div>
          <div className="title">
          
            <div contentEditable={true} placeholder='Description' id='title-input' onInput={handleTitleChange}>

            </div>
          </div>
          <div className="count"> {titleCount}/100</div>
      </div>

      <div className="description-container">
          <div className="label">
              Description
          </div>

        <div className="description">
          <div contentEditable={true} id='description-input' onInput={handleDescriptionChange}>

          </div>
        </div>
        <div className="count">
          {descriptionCount}/5000
        </div>
      </div>

      <div className="tags-container">
          <div className="label">
              Tags
          </div>

{/* TODO:FIX THE DIFFERENCE IN FONT OF THE TAGS FROM THE OTHER INPUTS */}
        <div className="tags">
          <TagInput onTagsChange={handleTagsChange}></TagInput>
        </div>
        
      </div>
        
        <button onClick={handleUpload}>Upload</button>
     
     
     </div >


        {/* <progress value={progress} max={100}></progress>
    
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
             */}
    </div>
  )
}

export default Upload