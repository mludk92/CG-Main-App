import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './ContentDetailsPage.css'

import Typography from '@mui/material/Typography';

function ContentDetails() {

    const [content, setContent] = useState('')

    let { id } = useParams();

    useEffect(() => {
        axios.get(`/api/audio/details/${id}`)
            .then(response => {
                setContent(response.data);
            })
            .catch(error => {
                console.log('Error retrieving audio files:', error);
            })
    }, []);

    return (
        content === ''
            ? <h3>Loading</h3>
            :
            <div style={{ overflow: 'hidden' }}>
                <Typography variant='h5' className="title" sx={{ mt: 1.5 }}>
                    {content[0].title}
                </Typography >
                <Typography style={{ textAlign: 'center', padding: 10 }}>
                    By {content[0].author}
                </Typography>
                <div className="content">
                    <img
                        src="images/rocks.png"
                        alt="Content Image"
                        style={{ border: '1px solid black' }}
                    />

                    <div className="audio-player">
                        <AudioPlayer
                            // CHANGE THE SRC TO WORK PROPERLY
                            src={`/api/audio/${content[0].name}`}
                            style={{ marginBottom: '60px' }}
                        />
                    </div>
                </div>
            </div>
    );
}

export default ContentDetails;