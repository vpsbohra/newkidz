import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ index, message, togglePlayPause }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  };
  const getToKnowpara = "Get to know your child:Explore your child's responses to gain deeper insights into their thoughts and perspectives.";
  const hasRespondedpara = "Your child has responded! Listen to their question and send them your response here!";
  const getToKnow = '/getToKnow.wav';
  const hasResponded = '/hasResponded.wav';
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
    <div className="audio-player" id={`audio${index}`}>
      <div className="play-pause-btn" onClick={() => togglePlayPause(`audio${index}`)}></div>
      <div className="progress-bar">
        <input type="range" min="0" max="100" value={progressRange} step="1" readOnly />
        <div className="time-display2">
          <span className="current-time">0:00 / {formatTime(message.total_second)}</span> <span className="total-time"> </span>
        </div>
      </div>
      <audio className={`audio${index}`} preload controls style={{ display: 'none' }}>
        {message.question_voice_answer === hasRespondedpara ? (
          <source src={hasResponded} type="audio/wav" />
        ) : message.question_voice_answer === getToKnowpara ? (
          <source src={getToKnow} type="audio/wav" />
        ) : (
          <source src={`data:audio/wav;base64,${message.voice_answer?message.voice_answer:message.audio_path}`} />
        )}
      </audio>
    </div>
  );
};

export default AudioPlayer;
