import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function ContentDetails() {

    return (
        <div className="container">
            
            <center>
                <h3>Content Details</h3>
                <img src="images/rocks.png" style={{border: '1px solid black'}} />
                <br /><br />
                <AudioPlayer src="audio/Financial-wellbeing-meditation.m4a"/>
            </center>

        </div>
    );
}

export default ContentDetails;