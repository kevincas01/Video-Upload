import React, { useState, ChangeEvent, DragEvent } from 'react';

const VideoUploader: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = event.target.files;
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (files.length > 0) {
      const file = files[0];

      // Check if the file is a video
      if (file.type.startsWith('video/')) {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (e.target?.result) {
            const result = e.target.result as string;
            setVideoSrc(result);
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: '100%',
          height: '200px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <div>
          <label htmlFor="file-input" style={{ fontSize: '18px', marginBottom: '10px' }}>
            Drag & Drop or Click to Select Video
          </label>
          <input type="file" id="file-input" accept="video/*" onChange={handleFileSelect} style={{ display: 'none' }} />
        </div>
      </div>

      {videoSrc && (
        <div style={{ marginTop: '20px' }}>
          <video controls src={videoSrc} style={{ width: '100%', maxHeight: '300px', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
