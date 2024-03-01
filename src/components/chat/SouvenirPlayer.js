import React, { useState } from 'react';
import image2 from '../../images/profile2.png';
import TenBack from '../../images/TenBack.png';
import TenForward from '../../images/Tenforward.png';

const SouvenirPlayer = ({name,audioText,audio,seconds}) => {
    const [childname,setchildName]=useState(name);
    const [currentQuestion,setCurrentQuestion]=useState(audioText);
    const [currentAudio,setCurrentAudio]=useState(audio);
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    return (
        <>
            <div className="audio_fullcon audio_fullcon-cstm souvenir_audiofull">
                <div className='audio_fullcon_image'>
                    <img src={image2} />
                    <h4>{childname[0]}</h4>
                </div>
                <div className='audio_fullcon_content'><div className="sliding-text-container">
                    <p>{currentQuestion[0]}</p>
                </div>
                    <div className="audio-player" id="audio">
                        <div className="audio-player_inner">
                            <img loading="lazy" src={TenBack} />
                            <div className="play-pause-btn" ></div>
                            <img loading="lazy" src={TenForward} />
                        </div>
                        <div className="progress-bar">
                            <input type="range" min="0" max="100" step="1" readOnly />
                            <div className="time-display">
                                <span>0:00/{formatTime(seconds)}</span>
                            </div>
                        </div>
                        <audio className="audio"  src={`data:audio/wav;base64,${currentAudio[0]}`} controls style={{ display: 'none' }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SouvenirPlayer