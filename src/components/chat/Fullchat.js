import React, { useEffect, useState, useRef } from "react";
import AuthUser from "../AuthUser";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import Facebook from "../../images/Facebook_Icon.png";
import Whatsapp from "../../images/whatsapp_Icon.png";
import Copy from "../../images/Copy_Link.png";
import axios from "axios";
import TenBack from '../../images/TenBack.png';
import TenForward from '../../images/Tenforward.png';
import getToKnow from '../Audio/getToKnow.wav';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Load from '../../images/index.gif';
import { useStopwatch } from 'react-timer-hook';
const Fullchat = ({ selectedDate, dataId }) => {
  const {
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });
  const [progressRange, setProgressRange] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [question, setQuestion] = useState('');
  const [totalseconds, settotalseconds] = useState(0);
  const [members, setMembers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [username, setUsername] = useState(null);
  const { http } = AuthUser();
  const [userId, setUserId] = useState("");
  const [link, setLink] = useState("https://link.kidzconnect.xxxxx");
  const [isCopied, setIsCopied] = useState(false);
  const [displayedMembers, setDisplayedMembers] = useState([]);
  const [more, setMore] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedDate1, setSelectedDate] = useState(null);
  const [chatsForDate, setChatsForDate] = useState([]);
  const userInfo = sessionStorage.getItem('user');
  const userInfoDetail = JSON.parse(userInfo);
  const spouse = userInfoDetail.spouse;
  const userId1 = userInfoDetail.id;
  const dataId1 = sessionStorage.getItem('setChildID');
  const d = sessionStorage.getItem('DATE');
  const [parsedSelectedDate, setParsedSelectedDate] = useState();
  const navigate = useNavigate();
  const [datetoggle, setDatetoggle] = useState(false);
  const [day, setDay] = useState();
  const [highlightDay, setHighlightDay] = useState([]);
  const [childName, setChildName] = useState([]);
  const [isrunning, setIsRunning] = useState(false);
  const [elapsedTime2, setElapsedTime2] = useState(0);
  const [c, setC] = useState('sliding-text');
  const [loader, setLoader] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [totalQuestions, setTotalquestioins] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);



  useEffect(() => {
    console.log("questionIndex", questionIndex);
    console.log("totalQuestions", totalQuestions);
    console.log("progressRange", progressRange);

  }, [questionIndex])

  useEffect(() => {

    const audioPlayer = document.getElementById('src');
    const updateProgress = () => {
      const time = currentTime;
      const percent = (time / totalseconds) * 100;
      setProgressRange(percent);
    };
    if (audioPlayer) {
      audioPlayer.addEventListener('timeupdate', updateProgress);
      return () => {
        audioPlayer.removeEventListener('timeupdate', updateProgress);
      };
    } else {
      console.log("No audio player found");
    }

  }, [currentTime]);
  useEffect(() => {
    const totalSecondsElapsed = currentTime;
    if (totalSecondsElapsed >= totalseconds) {
      pause();
    }
  }, [currentTime]);
  useEffect(() => {
    let interval;
    if (elapsedTime == elapsedTime2) {
      setElapsedTime2(elapsedTime);
    } else {
      if (isrunning) {
        interval = setInterval(() => {
          setElapsedTime2((prevTime) => prevTime + 1);
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [isrunning]);
  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };
  const handleReset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mykidz.online/api/messagesActivity/${userId1}/${dataId1}/${spouse}`);
        const messagesFromApi = response.data;
        console.log('messagesFromApi', messagesFromApi);
        setHighlightDay(messagesFromApi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userId1, dataId1, spouse]);
  useEffect(() => {
    setChildName(sessionStorage.getItem('setChildName'));
    console.log("childName", childName);
    console.log("childName", childName);
  }, [childName])
  const apiResponse = highlightDay;
  const convertApiResponse = (apiResponse) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return Object.values(apiResponse).map(({ month, day }) => ({
      month: months[parseInt(month, 10) - 1], // Adjust month index
      day: parseInt(day, 10),
    }));
  };
  const convertedData = convertApiResponse(apiResponse);
  const highlightedDates = convertedData;
  const [selectedDates, setSelectedDates] = useState([]);
  useEffect(() => {
    localStorage.setItem("duration",0);
    fetchAudio();
  }, [sessionStorage.getItem('DATE')]);
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  const [taudio, setTaudio] = useState(false);
  const handleDateChange = (date) => {
    sessionStorage.setItem('DATE', date);
    setDatetoggle(true);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const selectedDay = date.getDate();
    setDay(selectedDay);
    const selectedMonthIndex = date.getMonth();
    const selectedMonth = monthNames[selectedMonthIndex];
    const selectedYear = date.getFullYear();
    const selectedDate = `${selectedMonth} ${selectedDay}${getOrdinalSuffix(selectedDay)}, ${selectedYear}`;
    function getOrdinalSuffix(day) {
      if (day === 1 || day === 21 || day === 31) {
        return 'st';
      } else if (day === 2 || day === 22) {
        return 'nd';
      } else if (day === 3 || day === 23) {
        return 'rd';
      } else {
        return 'th';
      }
    }
    const selected = `${selectedMonth} ${selectedDay},${selectedYear}`;
    sessionStorage.setItem("selectedDate", JSON.stringify(selected));
    console.log("selectedDate", selectedDate);
    console.log("selectedDate", selectedDate);
    navigate(`/parent-dashboard?datetoggle=${datetoggle}&selectedDate=${selectedDate}`);
    const chatsForSelectedDate = messages.filter((message) => {
      const messageDate = new Date(message.created_at).toDateString();
      const selectedDateStr = date.toDateString();
      return messageDate === selectedDateStr;
    });
    setChatsForDate(chatsForSelectedDate);
    console.log("selected", chatsForSelectedDate)
    setDay(extractDay(date.toISOString()));
    setSelectedDate(selectedDate);
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);
    const { id } = user;
    setUserId(id);
    setUsername(user.name);
    console.log(user);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.spouse) {
        setSelectedItem(user.spouse);
      }
    }
    fetchAudio();
    fetchMembers();
  }, []);
  const extractDay = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);
    const day = dateObject.getDate();
    return day;
  };
  const updateCurrentTime = (player, audio) => {
    let time = JSON.parse(localStorage.getItem("duration"));
    let newtime = audio.currentTime + time ;
    setCurrentTime(newtime);
  };
  const playAudio = (audioSrc, isAutoplay, question, sum) => {
    setC('');
    settotalseconds(sum);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const audioElement = document.getElementById('src');
        setQuestion(question);
        setC('sliding-text');

        if (audioElement) {
          
    //  localStorage.setItem("duration",Math.floor(audioElement.duration));
         
          if (audioSrc == 'L3N0YXRpYy9tZWRpYS9nZXRUb0tub3cuOWZlMjk4YjJhMWVjODY3ZjdkMjIud2F2') {
            audioElement.src = getToKnow;
          } else {
            audioElement.src = `data:audio/wav;base64,${audioSrc}`;
          }
          audioElement.type = 'audio/wav';
          audioElement.controls = true;
          audioElement.onended = () => {


            console.log('tetetete' , audioElement.duration)
            let storedDuration = localStorage.getItem("duration");
            console.log('t111111111' , storedDuration);
            let x = 0;

        if (storedDuration) {
            try {
                x = JSON.parse(storedDuration);
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
                // Handle the error as needed
            }
        }
            let y = Math.floor(audioElement.duration);

            let z = x+y;
            localStorage.setItem("duration",z);
         
            audioElement.onended = null;
            if (questionIndex === totalQuestions - 1) {
              reset();
              pause();
              setProgressRange(0);
              fetchAudio();
            }
            resolve();
          };
          if (isAutoplay) {
            audioElement.play();
          }
        } else {
          reject('Audio element not found');
        }
      }, 1000);
    });
  };
  const [length, setLength] = useState(0);
  const fetchAudio = async () => {
    try {
      const response = await http.get(`/messages-audio/${userId1}/${dataId1}/${spouse}`);
      const audioFromApi = response.data;
      console.log("AUDIO", audioFromApi)
      const selectedDay = new Date(d);
      var dataaudio = [];
      var question = [];
      var seconds = [];
      if (Array.isArray(audioFromApi)) {
        audioFromApi.forEach(item => {
          const itemDate = new Date(item.created_at);
          if (
            item.audio_path !== null &&
            itemDate.getDate() === selectedDay.getDate() &&
            itemDate.getMonth() === selectedDay.getMonth() &&
            itemDate.getFullYear() === selectedDay.getFullYear()
          ) {
            dataaudio.push(item.audio_path);
            question.push(item.question_voice_answer);
            seconds.push(item.total_second);
            console.log("!", dataaudio);
          } else if (
            item.voice_answer !== null &&
            itemDate.getDate() === selectedDay.getDate() &&
            itemDate.getMonth() === selectedDay.getMonth() &&
            itemDate.getFullYear() === selectedDay.getFullYear()
          ) {
            dataaudio.push(item.voice_answer);
            question.push(item.question_voice_answer);
            seconds.push(item.total_second);
            console.log("!1", dataaudio);
          }
          else if (
            item.question_voice !== null &&
            itemDate.getDate() === selectedDay.getDate() &&
            itemDate.getMonth() === selectedDay.getMonth() &&
            itemDate.getFullYear() === selectedDay.getFullYear()
          ) {
            dataaudio.push(item.question_voice);
            question.push(item.question_voice_answer);
            seconds.push(item.total_second);
            console.log("!2", dataaudio);
          }
        });
      } else {
        const itemDate = new Date(audioFromApi.created_at);
        if (
          audioFromApi.audio_path !== null &&
          itemDate.getDate() === selectedDay.getDate() &&
          itemDate.getMonth() === selectedDay.getMonth() &&
          itemDate.getFullYear() === selectedDay.getFullYear()
        ) {
          dataaudio.push(audioFromApi.audio_path);
          question.push(audioFromApi.question_voice_answer);
          seconds.push(audioFromApi.total_second);
        } else if (
          audioFromApi.voice_answer !== null &&
          itemDate.getDate() === selectedDay.getDate() &&
          itemDate.getMonth() === selectedDay.getMonth() &&
          itemDate.getFullYear() === selectedDay.getFullYear()
        ) {
          dataaudio.push(audioFromApi.voice_answer);
          question.push(audioFromApi.question_voice_answer);
          seconds.push(audioFromApi.total_second);
        }
        else if (
          audioFromApi.question_voice !== null &&
          itemDate.getDate() === selectedDay.getDate() &&
          itemDate.getMonth() === selectedDay.getMonth() &&
          itemDate.getFullYear() === selectedDay.getFullYear()
        ) {
          dataaudio.push(audioFromApi.question_voice);
          question.push(audioFromApi.question_voice_answer);
          seconds.push(audioFromApi.total_second);
        }
      }
      setLength(seconds.length);
      setTotalquestioins(question.length);
      let sum = length + question.length;
      for (let i = 0; i < seconds.length; i++) {
        sum += seconds[i];
      }
      if (dataaudio.length > 0) {
        sessionStorage.setItem("TOGGLE", false);
        setTaudio(true);
        setLoader(false);
      } else {
        sessionStorage.setItem("TOGGLE", true);
        setTaudio(false);
      }
      for (let i = 0; i < dataaudio.length; i++) {
        let audioFile = dataaudio[i];
        setQuestionIndex(i);
        const isAutoplay = i > 0;
        await playAudio(dataaudio[i], isAutoplay, question[i], sum, questionIndex);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };
  const handleCopyClick = () => {
    const linkInput = document.getElementById("link-input");
    linkInput.select();
    document.execCommand("copy");
    setIsCopied(true);
  };
  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `https://mykidz.online/api/members/${userId}`
      );
      const membersData = response.data;
      setMembers(membersData);
      setDisplayedMembers(membersData.slice(0, 2));
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };
  const [hidden, setHidden] = useState(false);
  const remainingMembersCount = members.length - displayedMembers.length;
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [hide, setHide] = useState(true);
  const handleShowAllMembersClick = () => {
    setShowAllMembers(true);
    setHide(false);
    setHidden(true);
  };
  const handleHideClick = () => {
    setHidden(false);
    setShowAllMembers(false);
    setHide(true);
  };
  const colours = [
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6'
  ];
  // *****************************Audio Player*************************************
  const [isPlaying, setIsPlaying] = useState({});
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;
  useEffect(() => {
    const audioPlayers = document.querySelectorAll('.audio-player');
    for (const player of audioPlayers) {
      const audio = player.querySelector('audio');
      setIsPlaying((prevIsPlaying) => ({ ...prevIsPlaying, [player.id]: false }));
      updateCurrentTime(player, audio);
    }
  }, [isPlayingRef]);
  const togglePlayPause = (playerId) => {
    const audioPlayer = document.getElementById(playerId);
    const audio = audioPlayer.querySelector('audio');
    const player = document.getElementById(playerId);
    const addclass = audioPlayer.querySelector('.play-pause-btn');

    audio.addEventListener('timeupdate', () => {
      const T = JSON.parse(localStorage.getItem("Time"));
      const percent = (audio.currentTime / totalseconds) * 100;
      setProgressRange(percent);
      updateCurrentTime(player, audio);
    });

    if (audio.paused) {
      audio.play();
      addclass.classList.remove('pause');
      addclass.classList.add('play');
    } else {
      audio.pause();
      addclass.classList.remove('play');
      addclass.classList.add('pause');
    }
  };

 
  useEffect(() => {
    const storedSelectedDate = sessionStorage.getItem('selectedDate');
    setParsedSelectedDate(storedSelectedDate ? new Date(JSON.parse(storedSelectedDate)) : null);
  }, [sessionStorage.getItem('selectedDate')])
  const monthNameToNumber = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12,
  };

  const tileClassName = ({ date, view }) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const monthNumber = monthNameToNumber[month];

    // Check if the current date is in the highlightedDates array
    if (highlightedDates.some((highlightedDate) => highlightedDate.day === day && monthNumber === monthNameToNumber[highlightedDate.month])) {
      return 'highlightedDates';
    }
    return null;
  };
  const updateprogress = () => {
    const time = currentTime;
    const percent = (time / totalseconds) * 100;
    setProgressRange(percent);
  };

  const skipBackward = () => {
    const audioElement = document.getElementById('src');
    const newTime = currentTime - 10;
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
    updateprogress();
  };
  const skipForward = () => {
    const audioElement = document.getElementById('src');
    const newTime = currentTime + 10;
    audioElement.currentTime = newTime;
    setCurrentTime(newTime);
    updateprogress();
  };
  return (
    <>
      <div className="fullconver_chat">
        {loader ? (<><div className='no-chat'>    <img src={Load} alt="Loading..." /></div></>) : (<>{taudio ? (<>
          <div className="audio_fullcon audio_fullcon-cstm">
            <div className="sliding-text-container">
              {c && (<><p className={c}>
                {question ? (<>{question}
                </>) : (<>{spouse}'s Response</>)}
              </p></>)}

            </div>
            <div className="audio-player" id="audio">
              <div className="audio-player_inner">
                <img loading="lazy" src={TenBack} onClick={() => skipBackward()} />
                <div className="play-pause-btn" onClick={() => { togglePlayPause("audio"); isRunning ? pause() : start(); }}></div>

                <img loading="lazy" src={TenForward} onClick={() => skipForward()} />
              </div>
              <div className="progress-bar">
                <input type="range" min="0" max="100" value={progressRange} step="1" readOnly />
                <div className="time-display">
                  <span>{formatTime(currentTime)}</span>
                  <span>
                    {/* {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds} */}
                    / {formatTime(totalseconds)}</span>
                </div>
              </div>
              <audio className="audio" id="src" src='' controls style={{ display: 'none' }} />
            </div>

          </div></>) : (<>No Recordings for this day</>)}</>)}

        <span className={`profile_type_letters_outer ${hide ? "" : "space"}`}>
          {taudio ? (
            <>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip">{`${spouse} `}</Tooltip>}
              >
                <span className={`profile_type_letter ${colours[0]}`}>

                  <span>
                    {spouse ? spouse.charAt(0) : ""}
                  </span>
                </span>
              </OverlayTrigger>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip">{`${childName} `}</Tooltip>}
              >
                <span className={`profile_type_letter ${colours[1]}`}>
                  <span>
                    {typeof childName === 'string' && childName.length > 0 ? childName.charAt(0) : ""}
                  </span>
                </span>
              </OverlayTrigger>
            </>
          ) : (
            <></>
          )}
        </span>
        {hide === "false" ? <></> : <></>}
        <div className="social_icons">
          <a
            className="social_icons_item"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              link
            )}`}
            target="_blank"
          >
            <img loading="lazy" src={Facebook} alt="Facebook" />
            <span>Facebook</span>
          </a>
          <a
            className="social_icons_item"
            href="https://web.whatsapp.com/send?text= Please Visit https://link.kidzconnect.xxxxx"
            target="_blank"
          >
            <img loading="lazy" src={Whatsapp} />
            <span>Whatsapp</span>
          </a>
          <div className="social_icons_item">
            <img loading="lazy"
              src={Copy}
              alt="Copy Small"
              onClick={handleCopyClick}
              style={{ cursor: "pointer" }}
            />
            <span onClick={handleCopyClick} style={{ cursor: "pointer" }}>
              {isCopied ? "Link Copied!" : "Copy Link"}
            </span>
          </div>
        </div>
        <div className="copylink">
          <input
            style={{ display: "none" }}
            type="text"
            id="link-input"
            value={link}
            readOnly
          />
        </div>
        <Calendar onChange={handleDateChange} value={parsedSelectedDate} tileClassName={tileClassName} />
      </div>
    </>
  );
};
export default Fullchat;