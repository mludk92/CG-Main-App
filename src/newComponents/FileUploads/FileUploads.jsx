import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FileUploads() {
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [imageList, setImageList] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [videoList, setVideoList] = useState([]);

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
      postUrl = `/api/images?imageName=${fileName}&imageType=${fileType}`;
    } else if (fileType.startsWith('audio')) {
      postUrl = `/api/audio?audioName=${fileName}&audioType=${fileType}`;
    } else if (fileType.startsWith('video')) {
      postUrl = `/api/video?videoName=${fileName}&videoType=${fileType}`;
    }

    axios
      .post(postUrl, formData)
      .then((response) => {
        console.log('Success!');
        alert('Success!');
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
        alert('File deleted successfully!');
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
    <div>
      <form onSubmit={sendFileToServer}>
        <input type="file" accept="image/*,audio/*,video/*" onChange={onFileChange} />
        <br />
        <button type="submit">Submit</button>
      </form>

      <h2>Images</h2>
      {imageList.map((image) => (
        <div key={image.id}>
          <div>{image.name}</div>
          <div>{image.type}</div>
          <img style={{ maxHeight: '200px' }} src={`/api/images/${image.name}`} alt={image.name} />
          <button onClick={() => deleteFile(image.id, 'images')}>Delete</button>
        </div>
      ))}

      <h2>Audio</h2>
      {audioList.map((audio) => (
        <div key={audio.id}>
          <div>{audio.name}</div>
          <div>{audio.type}</div>
          <audio controls>
            <source src={`/api/audio/${encodeURIComponent(audio.name)}`} type={audio.type} />
          </audio>
          <button onClick={() => deleteFile(audio.id, 'audio')}>Delete</button>
        </div>
      ))}

      <h2>Videos</h2>
      {videoList.map((video) => (
        <div key={video.id}>
          <div>{video.name}</div>
          <div>{video.type}</div>
          <video controls>
            <source src={`/api/video/${encodeURIComponent(video.name)}`} type={video.type} />
          </video>
          <button onClick={() => deleteFile(video.id, 'video')}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default FileUploads;
