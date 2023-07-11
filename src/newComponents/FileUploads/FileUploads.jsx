import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';

import './FileUploads.css';

function FileUploads() {
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [imageList, setImageList] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [expandedItems, setExpandedItems] = useState([]);

  const onFileChange = (event) => {
    const fileToUpload = event.target.files[0];
    setFileName(encodeURIComponent(fileToUpload.name));
    setFileType(encodeURIComponent(fileToUpload.type));
    setSelectedFile(fileToUpload);
  };

  const sendFileToServer = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (fileType.startsWith('image')) {
      formData.append('image', selectedFile);
    } else if (fileType.startsWith('audio')) {
      formData.append('audio', selectedFile);
    } else if (fileType.startsWith('video')) {
      formData.append('video', selectedFile);
    }

    let postUrl = '';
    if (fileType.startsWith('image')) {
      postUrl = `/api/images?imageName=${encodeURIComponent(fileName)}&imageType=${encodeURIComponent(fileType)}`;
    } else if (fileType.startsWith('audio')) {
      postUrl = `/api/audio?audioName=${encodeURIComponent(fileName)}&audioType=${fileType}`; // Remove URL encoding for audioType
    } else if (fileType.startsWith('video')) {
      postUrl = `/api/video?videoName=${encodeURIComponent(fileName)}&videoType=${encodeURIComponent(fileType)}`;
    }

    // Add the 'author', 'title', and 'category' as separate parameters in the request URL
    postUrl += `&author=${encodeURIComponent(author)}&title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}`;

    // Log the contents of formData
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    axios
      .post(postUrl, formData)
      .then((response) => {
        console.log('Success!');
        clearForm();
        getFiles();
      })
      .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
      });
  };

  const deleteFile = (fileId, fileType) => {
    axios
      .delete(`/api/${fileType}/${fileId}`)
      .then((response) => {
        console.log('Success!');
        getFiles();
      })
      .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
      });
  };

  const clearForm = () => {
    setFileName('');
    setFileType('');
    setSelectedFile(undefined);
    setAuthor('');
    setTitle('');
    setCategory('');
  };

  const toggleExpand = (itemId) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(itemId)) {
        return prevExpandedItems.filter((id) => id !== itemId);
      } else {
        return [...prevExpandedItems, itemId];
      }
    });
  };

  const getFiles = () => {
    axios
      .get('/api/images')
      .then((response) => {
        setImageList(response.data);
      })
      .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
      });

    axios
      .get('/api/audio')
      .then((response) => {
        setAudioList(response.data);
      })
      .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
      });

    axios
      .get('/api/video')
      .then((response) => {
        setVideoList(response.data);
      })
      .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
      });
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
  <Box className="file-uploads" sx={{ mb: 10 }}>
    <form onSubmit={sendFileToServer}>
      <label className="custom-file-upload">
        <input type="file" accept="image/*,audio/*,video/*" onChange={onFileChange} />
        Choose File
      </label>
      <br />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      <br />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <br />
      <div>
        <label>
          <input
            type="radio"
            value="health"
            checked={category === 'health'}
            onChange={(e) => setCategory(e.target.value)}
          />
          Health
        </label>
        <label>
          <input
            type="radio"
            value="wealth"
            checked={category === 'wealth'}
            onChange={(e) => setCategory(e.target.value)}
          />
          Wealth
        </label>
      </div>
      <br />
      <button type="submit">Submit</button>
    </form>

    <div className="file-section">
      <h2
        className={`file-section-header ${expandedItems.includes('images') ? 'expanded' : 'minimized'}`}
        onClick={() => toggleExpand('images')}
      >
        Images {expandedItems.includes('images') ? <span>-</span> : <span>+</span>}
      </h2>
      {expandedItems.includes('images') && (
        <div className="file-list">
          {imageList.map((image) => (
            <div key={image.id} className="file-item">
              <div>{image.name}</div>
              <div>{image.type}</div>
              <img className="file-preview" src={`/api/images/${image.name}`} alt={image.name} />
              <button onClick={() => deleteFile(image.id, 'images')}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="file-section">
      <h2
        className={`file-section-header ${expandedItems.includes('audio') ? 'expanded' : 'minimized'}`}
        onClick={() => toggleExpand('audio')}
      >
        Audio {expandedItems.includes('audio') ? <span>-</span> : <span>+</span>}
      </h2>
      {expandedItems.includes('audio') && (
        <div className="file-list">
          {audioList.map((audio) => (
            <div key={audio.id} className="file-item">
              <div>{audio.name}</div>
              <div>{audio.type}</div>
              <audio className="file-preview" controls>
                <source src={`/api/audio/${encodeURIComponent(audio.name)}`} type={audio.type} />
              </audio>
              <button onClick={() => deleteFile(audio.id, 'audio')}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>

    <div className="file-section">
      <h2
        className={`file-section-header ${expandedItems.includes('videos') ? 'expanded' : 'minimized'}`}
        onClick={() => toggleExpand('videos')}
      >
        Videos {expandedItems.includes('videos') ? <span>-</span> : <span>+</span>}
      </h2>
      {expandedItems.includes('videos') && (
        <div className="file-list">
          {videoList.map((video) => (
            <div key={video.id} className="file-item">
              <div>{video.name}</div>
              <div>{video.type}</div>
              <video className="file-preview" controls>
                <source src={`/api/video/${encodeURIComponent(video.name)}`} type={video.type} />
              </video>
              <button onClick={() => deleteFile(video.id, 'video')}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  </Box>
);

  
}  

  export default FileUploads;
