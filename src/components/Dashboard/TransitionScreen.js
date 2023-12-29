import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import RecordRTC from 'recordrtc';
import AuthUser from '../AuthUser';
import ParentalSwitch from '../../images/Home.png';
import Transitionblob from '../../images/Transitionblob.png';
import StanyCheering from '../../images/stany cheering.png';
import Union from '../../images/Union.png';
import filoo from '../../images/filoo.png';
import ZeeZombie from '../../images/ZeeZombie.png';
import sun_effect_IMG from '../../images/sun_effect.png';
import Vector from '../../images/money.png';
import Record from '../../images/Record button.png';
import WaveSendAudioImage from '../../images/Ongoing Recording.png';
import WaveSendAudioImage1 from '../../images/Paused Recording.png';


const TransitionScreen = () => {
    const navigate = useNavigate();
    const { token } = AuthUser();
  const { http } = AuthUser();
  const setChildID = sessionStorage.getItem('setChildID');
    const [question, setQuestion] = useState(false);
    const randomImages = [StanyCheering, filoo, ZeeZombie];
    const randomImageIndex = Math.floor(Math.random() * randomImages.length);
    const randomImage = randomImages[randomImageIndex];
  const [show, setShow] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recorder, setRecorder] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [sendAudio, setSendAudio] = useState(null);
  const [currentaudio, setAudio] = useState();
  const [isPlaying, setIsPlaying] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState('');
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    // start();
    //  fetchData();
    let timer;

    if (recorder) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [recorder]);





  const { user } = AuthUser();

  const startRecording = async () => {
    setShow(null);
    setRecordedAudio(null);
    setRecorder(null);
    setSendAudio(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new RecordRTC(stream, {
        type: 'audio',
      });
      mediaRecorder.startRecording();
      setRecorder(mediaRecorder);
    } catch (error) {
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        console.error('Microphone permission denied. Please allow microphone access.');
      } else {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  const pauseRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
        setRecorder(null);
      });
    }
  };


  const sendAudioMessage = () => {

    setElapsedTime(0);
    const username = user.name.split(' ')[0];
    const senderId = setChildID;
    const receiverId = user.id;
    const spouse = user.spouse;

    if (recordedAudio) {
      const audioFile = new File([recordedAudio], 'audio.wav', { type: 'audio/wav' });
      const reader = new FileReader();

      reader.readAsDataURL(audioFile);
      reader.onloadend = function () {
        const base64Audio = reader.result.split(',')[1];
        const formData = new FormData();
        formData.append('audio', base64Audio);
        formData.append('question', questions[currentQuestionIndex]);


        http.post('https://mykidz.online/api/audio-messages-question', {
          username,
          senderId,
          receiverId,
          spouse,
          base64Audio,
          question_voice_answer: "Please send your family or loved ones a question about today’s topic!",
          total_second: elapsedTime,
        })
          .then((data) => {
            console.log('si message sent:', data.message);
            console.log('Audio message data:', data.data);
          })
          .catch((error) => {
            console.error('Error sending audio message:', error);
          });

        setRecordedAudio(null);
        setRecorder(null);
        setSendAudio(base64Audio);
      };
    }
  };


  const seekTo = (playerId) => {
    console.log("seek");
    const player = document.getElementById(playerId);
    const audio = player.querySelector('audio');
    const progressRange = player.querySelector('input[type="range"]');
    const seekTime = (progressRange.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    updateCurrentTime(player, audio);
  };



  const togglePlayPause = (playerId) => {
    const audioPlayer = document.getElementById(playerId);
    const audio = audioPlayer.querySelector('audio');
    const addclass = audioPlayer.querySelector('.play-pause-btn');

    // Use audio.paused to check if audio is currently playing
    if (audio.paused) {
      audio.play();
      addclass.classList.remove('pause');
      addclass.classList.add('play');

    } else {
      addclass.classList.remove('play');
      addclass.classList.add('pause');
      audio.pause();
    }

    // Update isPlaying based on the current state of the audio
    setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [playerId]: !audio.paused }));
    updatePlayPauseButton(playerId);
  };


  const updatePlayPauseButton = (playerId) => {
    const playPauseBtn = document.getElementById(playerId).querySelector('.play-pause-btn');
    // playPauseBtn.innerHTML = isPlaying[playerId] ? '&#9616;&#9616;' : '&#9654;';
  };


  const updateCurrentTime = (player, audio) => {
    const currentTimeDisplay = player.querySelector('.current-time');
    const totalTimeDisplay = player.querySelector('.total-time');

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    currentTimeDisplay.textContent = formattedTime;
    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    const formattedTotalTime = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    totalTimeDisplay.textContent = formattedTotalTime;
  };
    const handleNext = () => {
        setQuestion(true);

    }

    const handleNextQuestion=()=>{
       
        navigate("/all-activity");
    }

    return (
        <>
            <div className='chosen-story-section all_activity_sr'>
                <div className='all_activity_navSR'>
                    <div className='left_activity_btns' >
                        <Link className="nav-link" to="/Kids-view"><img loading="lazy" src={ParentalSwitch} alt='' /></Link>
                    </div>
                    <div className='right_activity_btns' >
                        <a class="nav-link toggle-profile" href=""> <span><img loading="lazy" src={Vector} /></span>3,500</a>
                        {/* <span><img loading="lazy" src={sun_effect_IMG} alt='' /></span> */}
                    </div>
                </div>
                <div className='all_activity_sr_inner'>
                    <div className='feedback-container-story'>
                        {question ? (
                            <>
                                <h2>Please send your family or loved ones a question about today’s topic!</h2>

                                <p>Press play and record your response</p>
                                <div className='record-section'>
                                    <div className="chat_form_input_btncnrlRight">
                                        {show && (
                                            <button className='no-background' onClick={startRecording}>
                                                <img loading="lazy" src={Record} alt="protected" />
                                            </button>
                                        )}
                                        {recorder && (
                                            <>
                                                <div className='RecordedAnswer_recorder'>
                                                    <p className='timing_recoder'>{`0:${elapsedTime.toString().padStart(2, '0')}`}</p>
                                                    <button className='stop_reco_btn no-background' onClick={pauseRecording}>
                                                        <img loading="lazy" src={WaveSendAudioImage} alt="protected" />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                        {recordedAudio && (
                                            <>
                                                <div className='RecordedAnswer_recorder'>
                                                    <p className='timing_recoder'>{`0:${elapsedTime.toString().padStart(2, '0')}`}</p>
                                                    <button className='stop_reco_btn no-background' onClick={startRecording}>
                                                        <img loading="lazy" src={WaveSendAudioImage1} alt="protected" />
                                                    </button>
                                                    <button className='sendAudio_btn no-background' onClick={sendAudioMessage}>
                                                        Send Response
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                        {sendAudio && (
                                            <>
                                                <div className='RecordedAnswer_recorder'>
                                                    <div className="audio-player" id="audio">
                                                        <div className="play-pause-btn" onClick={() => togglePlayPause()}></div>
                                                        <div className="progress-bar">
                                                            <input type="range" min="0" max="100" value="0" step="1" onChange={() => seekTo()} />
                                                            <div className="time-display">
                                                                <span className="current-time">0:00</span> / <span className="total-time">0:00</span>
                                                            </div>
                                                        </div>
                                                        <audio className="audio" preload controls style={{ display: 'none' }}>
                                                            <source src={`data:audio/wav;base64,${sendAudio}`} />
                                                        </audio>
                                                    </div>
                                                    <button className='stop_reco_btn no-background' onClick={startRecording}>
                                                        <img loading="lazy" src={Record} alt="protected" />
                                                    </button>
                                                    <button className='next_question sendAudio_btn no-background' onClick={handleNextQuestion}>
                                                        Next
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                            </>
                        ) : (

                            <> 
                            <div className='transition_inner_outerSr'>
                              <div className='transition_inner_left'>
                                  <img className='bg_transitionLeft' src={Transitionblob} alt='blob' />
                                  <img className='transition_vector' src={randomImage} alt='Stany cheering' />
                              </div>
                                  <div className='transition_inner_right'>
                                    <div className='transition_inner_right_TestImg'>
                                      <img className='transition_rightImg' src={Union} alt='Union' />
                                      <p className='transition_rightImg_p'>Want to send a question about today’s topic? Click Next!</p>
                                    </div>
                                      <button className='transition_rightBTn' onClick={handleNext}>Next</button>
                                  </div>
                                </div>
                                </>
                        )}

                    </div>
                </div>
            </div>
        </>
    );

};

export default TransitionScreen;