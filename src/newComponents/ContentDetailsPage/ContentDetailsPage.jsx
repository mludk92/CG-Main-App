import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './ContentDetailsPage.css'

function ContentDetails() {

    return (
        <div>
            <h3 className="title">Content Details</h3>
            <div className="content">
                <img 
                    src="images/rocks.png" 
                    alt="Content Image" 
                    style={{ border: '1px solid black' }}
                />

                <div className="audio-player">
                    <AudioPlayer src="audio/Financial-wellbeing-meditation.m4a" />
                </div>
            </div>
        </div>
    );
}

export default ContentDetails;