import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import ParentalSwitch from '../../images/Home.png';
import DarkBlue_Home from '../../images/DarkBlue_Home.png';
import blueTheme_Home from '../../images/blueTheme_Home.png';
import orangeTheme_Home from '../../images/orangeTheme_Home.png';
import pinkTheme_Home from '../../images/pinkTheme_Home.png';
import purpleTheme_Home from '../../images/purpleTheme_Home.png';
import Record from '../../images/Record button.png';
import WaveSendAudioImage from '../../images/Ongoing Recording.png';
import WaveSendAudioImage1 from '../../images/Paused Recording.png';
import AuthUser from '../AuthUser';
import axios from 'axios';
import Replay from '../../images/Replay Audio.png'
import SharePopup from './share_popup';
import Sharebtn from '../../images/Share.png';
import MoneyBagImage from '../../images/money-bag.png';
import image1 from '../../images/recorded_answer1.png';
import image2 from '../../images/recorded_answer2.png';
import image3 from '../../images/recorded_answer3.png';
import image4 from '../../images/recorded_answer4.png';
import image5 from '../../images/recorded_answer5.png';
import image6 from '../../images/Character/Maskgroup(2).png';
const RecordedAnswer = () => {
  const navigate = useNavigate()
  const { token } = AuthUser();
  const { http } = AuthUser();
  const setChildID = sessionStorage.getItem('setChildID');
  const storyId = sessionStorage.getItem('childStory');
  const { user } = AuthUser();
  const [questions, setQuestions] = useState([]);
  const backgroundImages = [image1, image2, image3, image4, image5];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [recorder, setRecorder] = useState(null);
  const [show, setShow] = useState(true);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [sendAudio, setSendAudio] = useState(null);
  const [currentaudio, setAudio] = useState();
  const [showReplayButton, setShowReplayButton] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [activeAudioPlayer, setActiveAudioPlayer] = useState(null);
  const [T, setT] = useState(true);
  const [progressRange, setProgressRange] = useState(0);
  const [popup, setPopup] = useState(true);
  const addBodyClass = () => {
    document.body.classList.add('popup_active');
  };
  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
  };
  const handleShare = () => {
    setShowSharePopup(true);
    addBodyClass();
  }
  useEffect(() => {
    const theme = sessionStorage.getItem("theme");
    document.body.classList.add(theme);
  }, [sessionStorage.getItem("theme")])
  const handleCloseSharePopup = () => {
    setShowSharePopup(false);
    removeBodyClass();
  };
  const handleAudioEnded = () => {
    setShowReplayButton(true);
  };
  const handleReplay = () => {
    setShowReplayButton(false);
    let audio = new Audio(currentaudio);
    audio.play();
    audio.addEventListener('ended', handleAudioEnded);
  };
  useEffect(() => {
    const que = localStorage.getItem('question');
    if (que == null) {
      localStorage.setItem('question', 0);
    }
  }, []);
  useEffect(() => {
    console.log("currentQuestionIndex", currentQuestionIndex);
    console.log("localStorage.getItem('question')", localStorage.getItem('question'));

    if (currentQuestionIndex === localStorage.getItem('question')) {

      let audio = new Audio(currentaudio);
      audio.play();
      audio.addEventListener('ended', handleAudioEnded);
      return () => {
        audio.removeEventListener('ended', handleAudioEnded);
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [currentaudio, currentQuestionIndex]);
  const [story_id, setStory_id] = useState();
  const fetchData = async () => {
    const x = localStorage.getItem('question');
    if (x) {

      setCurrentQuestionIndex(x);
    }
    try {
      const response = await axios.get('https://mykidz.online/api/stories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const x = sessionStorage.getItem('sid');
      const y = sessionStorage.getItem('childStory');
      console.log("Y", y);
      console.log("X", x);
      const storyId = y;
      console.log("Response data", response.data);
      const selectedStory = response.data.find(story => story.id === parseInt(storyId, 10));
      console.log("Storyid", storyId);
      setStory_id(storyId);
      console.log("Data", selectedStory);
      if (selectedStory) {
        const mcqData = selectedStory.story_mcq;
        const questionArray = mcqData.split('-');
        setQuestions(questionArray);
        console.log("KJHSDKJFHKSLJDHFKJLSHDSKJF", currentQuestionIndex);
        const audioData = selectedStory.question_audio.split(',');
        const audioUrl = audioData[currentQuestionIndex].trim();
        setAudio(audioUrl);
        console.log("AUDIO", audioUrl);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const x = localStorage.getItem('question');
    if (x) {
      setCurrentQuestion(x);
    }
    fetchData();
  }, [token, currentQuestionIndex]);
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
          question_voice_answer: questions[currentQuestionIndex],
          total_second: elapsedTime,
          story_id: story_id,
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
  const pauseRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
        setRecorder(null);
      });
    }
  };
  const handleNextQuestion = () => {
    console.log("CurrentQuestionIndex", currentQuestionIndex);
    console.log("Total Questions", questions.length - 1);
    const x = localStorage.getItem('question');
    setCurrentQuestionIndex(x);
    if (currentQuestion < questions.length - 1) {
      localStorage.setItem("question", parseInt(currentQuestion, 10) + 1);
      setCurrentQuestionIndex(localStorage.getItem('question'));
      update();
      const audiodata = data?.question_audio?.split(',') || [];
      console.log("AUDIO DATA", audiodata);
      const audioUrl = audiodata[currentQuestionIndex + 1]?.trim();
      setAudio(audioUrl);
      setRecordedAudio(null);
      setRecorder(null);
      setSendAudio(null);
      setShow(true);
      console.log(audioUrl);
      console.log("currentQuestionIndex", currentQuestionIndex);
    } else {
      localStorage.setItem('question', 0);
      update();
      navigate('/TransitionScreen')
    }

  };
  const [data, setData] = useState();
  useEffect(() => {
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
  // *****************************Audio Player*************************************
  const [isPlaying, setIsPlaying] = useState({});
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
      audio.addEventListener('loadedmetadata', () => {
        updateCurrentTime(player, audio);
      });
      audio.addEventListener('play', () => {
        setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: true }));
      });
      audio.addEventListener('pause', () => {
        setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: false }));
      });
    }
    return () => {
      for (const player of audioPlayers) {
        const audio = player.querySelector('audio');
        const progressRange = player.querySelector('input[type="range"]');
        const playerId = player.id;
        audio.removeEventListener('timeupdate', () => updateProgressBar(playerId));
        audio.removeEventListener('ended', () => resetBackgroundColor(playerId));
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
  const update = () => {
    const a = sessionStorage.getItem('setChildID');
    const b = sessionStorage.getItem('childId');
    const chid = a ? a : b;
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const x = localStorage.getItem("question");
    const memberData = {
      current_question: x.toString(),
    };
    axios.patch(`https://mykidz.online/api/update-current-question/${chid}`, memberData, { headers })
      .then(response => {
        console.log("response", response.data);
      })
      .catch(error => {
        console.log("Error updating the field");
      });
  }
  return (
    <>
      <div className='chosen-story-section all_activity_sr' style={{ backgroundImage: `url(${backgroundImages[currentQuestionIndex]})` }}>
        <div class="head-main-cstm">
          <div class="head-cstm-left">
            <Link className="nav-link top_navbtnsr" to="/Kids-view">
              <img className="defaultHome" loading="lazy" src={ParentalSwitch} alt='' />
              <img className="DarkBlue_HomeIn defaultHome" loading="lazy" src={DarkBlue_Home} alt='' />
              <img className="blueTheme_HomeIn defaultHome" loading="lazy" src={blueTheme_Home} alt='' />
              <img className="orangeTheme_HomeIn defaultHome" loading="lazy" src={orangeTheme_Home} alt='' />
              <img className="pinkTheme_HomeIn defaultHome" loading="lazy" src={pinkTheme_Home} alt='' />
              <img className="purpleTheme_HomeIn defaultHome" loading="lazy" src={purpleTheme_Home} alt='' />
            </Link>
            {showReplayButton && (
              <button className='replay_btn no-background' onClick={handleReplay}>
                <img loading="lazy" src={Replay} />
              </button>
            )}
            <button className='close-button Share_btn_sr' onClick={handleShare}>
              <Link className="nav-link"><img loading="lazy" src={Sharebtn} /> </Link>
            </button>
          </div>
          <div className="head-price-cstm">
            <img loading="lazy" src={MoneyBagImage} alt="protected" /><span>150</span>
          </div>
        </div>
        {showSharePopup && (
          <SharePopup onClose={handleCloseSharePopup} />
        )}
        <div className='all_activity_sr_inner record_answer_page_srrr'>
          <div className='feedback-container-story'>
            <h2>{questions[currentQuestion]}</h2>
            <p>Press on the microphone below and record your response</p>
            
          </div>
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
            {popup && (<>
                  <div className='popup_recordedAns'>
                    <div className='left'>
                      <img src={image6} />
                    </div>
                    <div className='right'>
                      <div className='txt'>
                        <span>Listen to the question asked and press on the button to share your thoughts</span>
                      </div>
                      <div className='btn'>
                        <button onClick={() => { setPopup(false) }}>OKAY!</button>
                      </div>
                    </div>
                  </div>
                </>)}
        </div>
      </div>
    </>
  );
};

export default RecordedAnswer;
