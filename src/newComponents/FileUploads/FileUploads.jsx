import { useState, useEffect } from 'react';
import { readAndCompressImage } from 'browser-image-resizer';

import axios from 'axios';

function FileUploads() {
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [imageList, setImageList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [audioList, setAudioList] = useState([]);

  const onFileChange = async (event) => {
    const fileToUpload = event.target.files[0];
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    const acceptedVideoTypes = ['video/mp4', 'video/mov', 'video/avi'];
    const acceptedAudioTypes = ['audio/mp3', 'audio/wav'];

    if (acceptedImageTypes.includes(fileToUpload.type)) {
      const copyFile = new Blob([fileToUpload], { type: fileToUpload.type, name: fileToUpload.name });
      const resizedFile = await readAndCompressImage(copyFile, {
        quality: 1.0,
        maxHeight: 1000,
      });

      setFileName(encodeURIComponent(fileToUpload.name));
      setFileType(encodeURIComponent(fileToUpload.type));
      setSelectedFile(resizedFile);
      setImagePreview(URL.createObjectURL(resizedFile));
    } else if (acceptedVideoTypes.includes(fileToUpload.type)) {
      setFileType(encodeURIComponent(fileToUpload.type));
      setSelectedFile(fileToUpload);
      setFileName(encodeURIComponent(fileToUpload.name));
      setImagePreview(undefined);
    } else if (acceptedAudioTypes.includes(fileToUpload.type)) {
      setFileType(encodeURIComponent(fileToUpload.type));
      setSelectedFile(fileToUpload);
      setFileName(encodeURIComponent(fileToUpload.name));
      setImagePreview(undefined);
    } else {
      alert('Please select an image, video, or audio file');
    }
  };

  const sendFileToServer = (fileType, fileName, fileData) => {
    const formData = new FormData();
    formData.append('file', fileData);
    let postUrl = '';

    if (fileType.startsWith('image/')) {
      postUrl = `/api/images?imageName=${fileName}&imageType=${fileType}`;
    } else if (fileType.startsWith('video/')) {
      postUrl = `/api/videos?videoName=${fileName}&videoType=${fileType}`;
    } else if (fileType.startsWith('audio/')) {
      postUrl = `/api/audio?audioName=${fileName}&audioType=${fileType}`;
    }

    return axios.post(postUrl, formData);
  };

  const sendPhotoToServer = (event) => {
    event.preventDefault();
    
    sendFileToServer(fileType, fileName, selectedFile)
      .then(response => {
        console.log('Success!');
        alert('Success!');
        clearForm();
        getImages();
      })
      .catch(error => {
        console.log('error', error);
        alert('Something went wrong');
      });
  };

  const clearForm = () => {
    setFileName('');
    setFileType('');
    setSelectedFile(undefined);
    setImagePreview(undefined);
  };

  const getImages = () => {
    axios.get('/api/images')
      .then(response => {
        setImageList(response.data);
      })
      .catch(error => {
        console.log('error', error);
        alert('Something went wrong');
      });
  };

  const getVideos = () => {
    axios.get('/api/videos')
      .then(response => {
        setVideoList(response.data);
      })
      .catch(error => {
        console.log('error', error);
        alert('Something went wrong');
      });
  };

  const getAudio = () => {
    axios.get('/api/audio')
      .then(response => {
        setAudioList(response.data);
      })
      .catch(error => {
        console.log('error', error);
        alert('Something went wrong');
      });
  };

  useEffect(() => {
    getImages();
    getVideos();
    getAudio();
  }, []);

  return (
    <div>
      <form onSubmit={sendPhotoToServer}>
        <input
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={onFileChange}
        />
        {imagePreview && (
          <>
            <br />
            <br />
            <p>Preview</p>
            <img style={{ maxHeight: '100px' }} src={imagePreview} alt="Preview" />
          </>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>

      <h2>Images</h2>
      {imageList.map(image => (
        <div key={image.id}>
          <div>{image.name}</div>
          <div>{image.type}</div>
          <img style={{ maxHeight: '200px' }} src={`api/images/${image.name}`} alt={image.name} />
        </div>
      ))}

      <h2>Videos</h2>
      {videoList.map(video => (
        <div key={video.id}>
          <div>{video.name}</div>
          <div>{video.type}</div>
          <video style={{ maxHeight: '200px' }} controls>
            <source src={`api/videos/${video.name}`} type={video.type} />
          </video>
        </div>
      ))}

      <h2>Audio</h2>
      {audioList.map(audio => (
        <div key={audio.id}>
          <div>{audio.name}</div>
          <div>{audio.type}</div>
          <audio controls>
            <source src={`api/audio/${audio.name}`} type={audio.type} />
          </audio>
        </div>
      ))}
    </div>
  );
}

export default FileUploads;
