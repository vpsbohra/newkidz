import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ index, message, togglePlayPause }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressRange, setProgressRange] = useState(0);

  useEffect(() => {
    const audioPlayer = document.getElementById(`audio${index}`);
    const audio = audioPlayer.querySelector('audio');

    audio.addEventListener('timeupdate', () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgressRange(percent);
    });

    return () => {
      audio.removeEventListener('timeupdate', () => {
        // Cleanup logic if needed
      });
    };
  }, [index]);

  return (
    <div className="chat-audio">
      <div className="audio-player" id={`audio${index}`}>
        <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
        <div className="progress-bar">
          <input type="range" min="0" max="100" value={progressRange} step="1" readOnly />
          <div className="time-display2">
            <span className="current-time">0:00</span> <span className="total-time"> </span>
          </div>
        </div>
        <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
          <source src={`data:audio/wav;base64,${message.voice_answer}`} />
        </audio>
      </div>
    </div>
  );
};

export default AudioPlayer;
