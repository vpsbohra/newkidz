import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import RecordRTC from 'recordrtc';
import AuthUser from '../AuthUser';
import ParentalSwitch from '../../images/Home.png';
import DarkBlue_Home from '../../images/DarkBlue_Home.png';
import blueTheme_Home from '../../images/blueTheme_Home.png';
import orangeTheme_Home from '../../images/orangeTheme_Home.png';
import pinkTheme_Home from '../../images/pinkTheme_Home.png';
import purpleTheme_Home from '../../images/purpleTheme_Home.png';

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
import hasResponded from '../Audio/hasResponded.wav';


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
  const [activeAudioPlayer, setActiveAudioPlayer] = useState(null);
  const [progressRange, setProgressRange] = useState(0);
  const [T, setT] = useState(true);



  const [currentQuestionIndex, setCurrentQuestionIndex] = useState('');
  const [questions, setQuestions] = useState([]);
  const randomQuestions = ["Your child has responded! Listen to their question and send them your response here!", "Your child has a question for you, listen to it and give them your full attention!"];
  const randomQuestionIndex = 0;
  // Math.floor(Math.random() * randomQuestions.length);
  const randomQuestion =
    randomQuestions[randomQuestionIndex];

  console.log("randomQuestion", randomQuestion);
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




  const sendRandomQuestion = () => {


    if (recordedAudio) {
      const audioFile = new File([recordedAudio], 'audio.wav', { type: 'audio/wav' });
      const reader = new FileReader();

      reader.readAsDataURL(audioFile);
      reader.onloadend = function () {

        const audioFile = new File(randomQuestionIndex === 0 ? [hasResponded] : [], 'audio.wav', { type: 'audio/wav' });

        const reader = new FileReader();
        reader.readAsDataURL(audioFile);
        reader.onloadend = function () {
          const base64Audio = reader.result.split(',')[1];
          setElapsedTime(0);
          const username = user.name.split(' ')[0];
          const senderId = setChildID;
          const receiverId = user.id;
          const spouse = user.spouse;
          const question_voice = base64Audio;
          http.post('https://mykidz.online/api/audio-messages-question', {
            username,
            senderId,
            receiverId,
            spouse,
            question_voice_answer: randomQuestion,
            total_second: elapsedTime,
            question_voice: question_voice,
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
          sendAudioMessage();
        };
      }
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

  useEffect(() => {
    const audioPlayers = document.querySelectorAll('.audio-player');

    for (const player of audioPlayers) {
      const audio = player.querySelector('audio');
      setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: false }));
      updateCurrentTime(player, audio);
    }
  }, []);



  const togglePlayPause = (playerId) => {
    const audioPlayer = document.getElementById(playerId);
    const audio = audioPlayer.querySelector('audio');
    const addclass = audioPlayer.querySelector('.play-pause-btn');

    if (activeAudioPlayer && activeAudioPlayer !== playerId) {
      const activeAudio = document.getElementById(activeAudioPlayer).querySelector('audio');
      activeAudio.pause();
    }

    if (audio.paused) {
      audio.play();
      addclass.classList.remove('pause');
      addclass.classList.add('play');
      setActiveAudioPlayer(playerId);
    } else {
      setT(false);
      addclass.classList.remove('play');
      addclass.classList.add('pause');
      audio.pause();
      setActiveAudioPlayer(null);

    }
    audio.addEventListener('timeupdate', () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      console.log(percent);
      setProgressRange(percent);
    });

    setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [playerId]: !audio.paused }));
  };



  const resetBackgroundColor = (playerId) => {
    const player = document.getElementById(playerId);
    const progressRange = player.querySelector('input[type="range"]');
    progressRange.style.backgroundColor = '#ccc';
  };
  useEffect(() => {
    const audioPlayers = document.querySelectorAll('.audio-player');

    for (const player of audioPlayers) {
      const audio = player.querySelector('audio');
      setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: audio.paused }));

      // Listen for the 'loadedmetadata' event to ensure audio duration is available
      audio.addEventListener('loadedmetadata', () => {
        updateCurrentTime(player, audio);
      });

      // Listen for play and pause events to update isPlaying state
      audio.addEventListener('play', () => {
        setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: true }));
      });

      audio.addEventListener('pause', () => {
        setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: false }));
      });
    }
    return () => {
      // Cleanup: Remove event listeners
      for (const player of audioPlayers) {
        const audio = player.querySelector('audio');
        const progressRange = player.querySelector('input[type="range"]');
        const playerId = player.id;
        audio.removeEventListener('timeupdate', () => updateProgressBar(playerId));
        audio.removeEventListener('ended', () => resetBackgroundColor(playerId));
        // progressRange.removeEventListener('input', () => seekTo(playerId));
      }
    };

  }, []);


  const updateProgressBar = (playerId) => {
    const player = document.getElementById(playerId);
    const audio = player.querySelector('audio');
    const progressRange = player.querySelector('input[type="range"]');
    const percent = (audio.currentTime / audio.duration) * 100;
    progressRange.value = percent;
    console.log(percent);
    updateCurrentTime(player, audio);
  };

  const updatePlayPauseButton = (playerId) => {
    const playPauseBtn = document.getElementById(playerId).querySelector('.play-pause-btn');
    // playPauseBtn.innerHTML = isPlaying[playerId] ? '&#9616;&#9616;' : '&#9654;';
  };


  const updateCurrentTime = (player, audio) => {
    const currentTimeDisplay = player.querySelector('.current-time');
    const totalTimeDisplay = player.querySelector('.total-time');
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    const formattedCurrentTime = formatTime(audio.currentTime);
    currentTimeDisplay.textContent = formattedCurrentTime;
    if (isFinite(audio.duration)) {
      const formattedTotalTime = ` / ${formatTime(audio.duration)}`;
      totalTimeDisplay.textContent = formattedTotalTime;
      if (audio.currentTime === audio.duration) {
        setT(true);
      }
    }
  };
  const handleNext = () => {
    setQuestion(true);

  }

  const handleNextQuestion = () => {

    navigate("/all-activity");
  }

  return (
    <>
      <div className='chosen-story-section all_activity_sr'>
        <div className='all_activity_navSR'>
          <div className='left_activity_btns' >
            <Link className="nav-link" to="/Kids-view">
            <img className="defaultHome" loading="lazy" src={ParentalSwitch} alt='' />
          <img className="DarkBlue_HomeIn defaultHome" loading="lazy" src={DarkBlue_Home} alt='' />
          <img className="blueTheme_HomeIn defaultHome" loading="lazy" src={blueTheme_Home} alt='' />
          <img className="orangeTheme_HomeIn defaultHome" loading="lazy" src={orangeTheme_Home} alt='' />
          <img className="pinkTheme_HomeIn defaultHome" loading="lazy" src={pinkTheme_Home} alt='' />
          <img className="purpleTheme_HomeIn defaultHome" loading="lazy" src={purpleTheme_Home} alt='' />
            </Link>
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
                          <button className='sendAudio_btn no-background' onClick={() => { sendRandomQuestion(); }}>
                            Send Response
                          </button>

                        </div>
                      </>
                    )}
                    {sendAudio && (
                      <>
                        <div className='RecordedAnswer_recorder'>
                          <div className="audio-player" id={`audio`}>
                            <div className="play-pause-btn" onClick={() => togglePlayPause(`audio`)}></div>
                            <div className="progress-bar">
                              <input type="range" min="0" max="100" value={progressRange} step="1" />
                              <div className="time-display1">
                                <span className="current-time">0:00</span>  <span className="total-time"></span>
                              </div>
                            </div>
                            <audio className={`audio`} preload controls style={{ display: sendAudio ? 'none' : 'block' }}>
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