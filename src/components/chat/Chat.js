import React, { useEffect, useState, useRef } from 'react';
import Pusher from 'pusher-js';
import AuthUser from '../AuthUser';
import sendImage1 from '../../images/sendVector1.png';
import sendImage2 from '../../images/sendVector2.png';
import { Link, Navigate } from 'react-router-dom';
import PaperClipImage from '../../images/paper-clip.png';
import EmojiImage from '../../images/Emoji_icon.png';
import SendAudioImage from '../../images/Send-audio-message.png';
import play from '../../images/play1.png';
import pause from '../../images/pause1.png';
import del from '../../images/delete.png';
import WaveSendAudioImage from '../../images/wave.png';
import { useParams } from 'react-router-dom';
import RecordRTC from 'recordrtc';
import Calendar from 'react-calendar';
import ChatPopup from './ChatPopup';
import { useNavigate } from "react-router-dom";
import InputEmoji from 'react-input-emoji'
import Picker from 'emoji-picker-react';
import Play_audio from '../../images/Play_audio_message.png';
import Pause_audio from '../../images/pause_btn.png';
import axios from "axios";
import Load from '../../images/index.gif';
import Happy from '../../images/Happyr.png';
import Excited from '../../images/Excitedr.png';
import Sad from '../../images/sadr.png';
import Angry from '../../images/Angryr.png';
import Scared from '../../images/sadr.png';
import Surprised from '../../images/surprisedr.png';
import bell from '../../images/Bell.png';
import getToKnow from '../Audio/getToKnow.wav';
import hasResponded from '../Audio/hasResponded.wav';
import paper_clip from '../../images/paper_clip.png';
import emotes from '../../images/Frame.png';
import { faL } from '@fortawesome/free-solid-svg-icons';
import AudioPlayer from './AudioPlayer';
import { Scrollbars } from 'react-custom-scrollbars-2';


const Chat = ({ dataId, userId }) => {
  // const [recorder1, setRecorder1] = useState(false);
  const getToKnow = '/getToKnow.wav'
  const hasResponded = '/hasResponded.wav'
  const [recorder1, setRecorder1] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { http } = AuthUser();
  const { user, token } = AuthUser();
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [userdetail, setUserdetail] = useState({});
  const [message, setMessage] = useState('');
  const { childId } = useParams();
  const userInfo = sessionStorage.getItem('user');
  const userInfoDetail = JSON.parse(userInfo);
  const spouse = userInfoDetail.spouse;
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [chatsForDate, setChatsForDate] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [datetoggle, setDatetoggle] = useState(false);
  const chatSectionRightRef = useRef(null);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileMessage, setFileMessage] = useState('');
  const [imageToShow, setImageToShow] = useState(null);
  const [T, setT] = useState(true);
  const [progressRange, setProgressRange] = useState(0);
  const [activeAudioPlayer, setActiveAudioPlayer] = useState(null);
  const [day, setDay] = useState();
  const [highlightDay, setHighlightDay] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loader, setLoader] = useState(true);
  const [reaction, setReaction] = useState();
  const [stop, setStop] = useState(null);
  const getToKnowpara = "Get to know your child:Explore your child's responses to gain deeper insights into their thoughts and perspectives.";
  const hasRespondedpara = "Your child has responded! Listen to their question and send them your response here!";
  const resumeRecording = () => {
    setI(prevI => !prevI);
    setStop(false);
  };
  const delRecording = () => {
    setRecorder1(false);
    setRecorder(null);
    setElapsedTime(0);
  };
  // useEffect(() => {
  //   fetchThankyouNotification();
  // }, []);

  useEffect(() => {
    // start();
    //  fetchData();
    let timer;

    if (recorder) {
      if (!stop) {
        console.log('ifffff');
        timer = setInterval(() => {
          setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);
      } else {
        console.log('elseeeee');
      }
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [recorder, stop]);
  const pauseRecording = () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
        setRecorder(null);
        setRecorder1(null);
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mykidz.online/api/messagesActivity/${userId}/${dataId}/${spouse}`);
        const messagesFromApi = response.data;
        console.log('messagesFromApi', messagesFromApi);
        setHighlightDay(messagesFromApi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, dataId, spouse]);

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

  const onEmojiClick = (event, emojiObject) => {
    setMessage(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false);
    console.log("emojiObject.emoji", emojiObject.emoji);
    console.log("emojiObject", emojiObject);

  };

  const handleDateChange = (date) => {
    setDatetoggle(true);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const selectedDay = date.getDate();
    const selectedMonthIndex = date.getMonth(); // Get the month index (0-11)
    const selectedMonth = monthNames[selectedMonthIndex];
    const selectedYear = date.getFullYear();
    // Prepare the date string in the desired format (e.g., 'DD-MM-YYYY')
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
    navigate(`/parent-dashboard?datetoggle=${datetoggle}&selectedDate=${selectedDate}`);
    const chatsForSelectedDate = messages.filter((message) => {
      const messageDate = new Date(message.created_at).toDateString();
      const selectedDateStr = date.toDateString();
      return messageDate === selectedDateStr;
    });
    setSelectedDate(date);
    sessionStorage.setItem('DATE', date);
    console.log("selectedDate", selectedDate)
    setChatsForDate(chatsForSelectedDate);
    setShowPopup(true);
    console.log("Date11", date);


    // Assuming 'date' is a Date object
    const selectedDatee = new Date(date);

    // Format the date as "December 8, 2023"
    const formattedDate = selectedDatee.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    // Store the formatted date in sessionStorage
    sessionStorage.setItem('selectedDate', `"${formattedDate}"`);

  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher('8bc60721fd702db2ed68', {
      cluster: 'ap2',
      encrypted: true,
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      pusher.unsubscribe('chat');
    };
  }, []);
  useEffect(() => {
    const updateParentId = () => {
      const scrollArea = document.querySelector('.scrollarea');
      if (scrollArea && scrollArea.parentNode) {
        scrollArea.parentNode.setAttribute('id', 'chat-messages-page');
      }
    };

    updateParentId(); // Call the function once when the component mounts

    // Clean up function to remove event listeners, etc. (if needed)
    // For this example, since it's a one-time operation, we don't need cleanup

  }, []);

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
        // progressRange.removeEventListener('input', () => seekTo(playerId));
      }
    };
  }, []);
  useEffect(() => {
    fetchUserDetail();
    fetchMessages();
  }, [dataId, loader]);
  useEffect(() => {
    if (chatSectionRightRef.current) {
      chatSectionRightRef.current.scrollTop = chatSectionRightRef.current.scrollHeight;
    }
  }, [spouse]);
  const [thankyouNotification ,setThankyouNotification] = useState(0);

  // const fetchThankyouNotification = async () => {
  //   const senderId = userInfoDetail.id;
  //   const receiverId = dataId;
  //   const storydetails = JSON.parse(sessionStorage.getItem('childStorydata'));
  //   const storyId = storydetails.id;
  //   try {
  //     const response = await http.post(
  //       'https://mykidz.online/api/thankyou-notification',
  //       { sender_id: senderId, reciever_id: receiverId, story_id: storyId },
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );
  //       const thankyouResponse = response.data;
  //       // localStorage.setItem("ThankyouResponse",thankyouResponse.notification)
  //       const x = thankyouResponse.notification;
  //       setThankyouNotification(x);
  //       console.log('thankyouNotification',thankyouNotification)
  //       console.log("thankyouResponse",thankyouResponse.notification);

  //   } catch (error) {
  //     console.error('Error saving message:', error);
  //   }
  // }

  const storydetails = JSON.parse(localStorage.getItem("storiesLocal"));
  const storyId = storydetails && storydetails.id ? storydetails.id : "";
  useEffect(()=>{
    localStorage.setItem("ThankyouResponse",'null')
  },[storyId])
  const saveThankyouNotification = async () => {
    const senderId = userdetail.id;
    const receiverId = dataId;
    try {
      const response = await http.post(
        'https://mykidz.online/api/save-thankyou-notification',
        { sender_id: senderId, reciever_id: receiverId, story_id: STORYId },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );


    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

const [STORYId,setStory_id]=useState();
  const fetchMessages = async () => {
    try {
      const response = await http.get(`/messages/${userId}/${dataId}/${spouse}`);
      const chatMessagesPage = document.getElementById('chat-messages-page');
      chatMessagesPage.scrollTop = chatMessagesPage.scrollHeight;
      if (response) {
        setLoader(false);
      }
      const messagesFromApi = response.data;
      console.log("messages", response.data);
      setMessages(messagesFromApi);
      
      console.log(messagesFromApi);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };
  const fetchUserDetail = () => {
    setUserdetail(user);
    setUsername(user.name.split(' ')[0]);
  };

  const submit = async () => {
    const senderId1 = userInfoDetail.id;
    const receiverId1 = dataId;
    try {
      const response = await http.post(
        'https://mykidz.online/api/thankyou-notification',
        { sender_id: senderId1, reciever_id: receiverId1, story_id: STORYId },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
        const thankyouResponse = response.data.notification;
        if(thankyouResponse === 1){
          setRecorder1(false);
    console.log('attached_file_type:', fileMessage)
    const senderId = userdetail.id;
    const receiverId = dataId;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('message', message);
    formData.append('senderId', senderId);
    formData.append('receiverId', receiverId);
    formData.append('spouse', spouse);
    formData.append('attached_file', selectedImage);
    formData.append('attached_file_type', fileMessage);
    formData.append('total_second', 0);
    formData.append('reply_question', rdiv);



    http.post('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(async (response) => {

        setFname(null);
        setMessage('');
        setFileMessage('');
        setSelectedImage(null);
        setSelectedFile(null);
        setRmessage(false);
        setRdiv('');
        await fetchMessages();
        setSelectedImage(null);
        setFileMessage('');
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error('Error saving message:', error);
      });





        }else{
          saveThankyouNotification();

          setRecorder1(false);
    console.log('attached_file_type:', fileMessage)
    const senderId = userdetail.id;
    const receiverId = dataId;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('message', message);
    formData.append('senderId', senderId);
    formData.append('receiverId', receiverId);
    formData.append('spouse', spouse);
    formData.append('attached_file', selectedImage);
    formData.append('attached_file_type', fileMessage);
    formData.append('total_second', 0);
    formData.append('reply_question', rdiv);



    http.post('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(async (response) => {

        setFname(null);
        setMessage('');
        setFileMessage('');
        setSelectedImage(null);
        setSelectedFile(null);
        setRmessage(false);
        setRdiv('');
        console.log('Message saved:', response.data);
        if (  thankyouNotification !== 1) {
          const formData2 = new FormData();
          formData2.append('username', username);
          formData2.append('senderId', receiverId);
          formData2.append('receiverId', senderId);
          formData2.append('spouse', spouse);
          formData2.append('total_second', 0);
          formData2.append('attached_file', selectedImage);
          formData2.append('attached_file_type', fileMessage);
          formData2.append('total_second', 0);
          formData2.append('reply_question', '');
          formData2.append('question_voice_answer', 'Thank you for sharing your thoughts!');
          http.post('/messages', formData2, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(async (response) => {
              setFname(null);
              setMessage('');
              setFileMessage('');
              setSelectedImage(null);
              setSelectedFile(null);
              setRmessage(false);
              setRdiv('');
              console.log('Message saved:', response.data);
              await fetchMessages();
              setSelectedImage(null);
              setFileMessage('');
              setSelectedFile(null);
            })
            .catch((error) => {
              console.error('Error saving message:', error);
            });
        }
        await fetchMessages();
        setSelectedImage(null);
        setFileMessage('');
        setSelectedFile(null);
      })
      .catch((error) => {
        console.error('Error saving message:', error);
      });
        }

    } catch (error) {
      console.error('Error saving message:', error);
    }
  };
  function formatTime(dateTimeString) {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const formattedTime = new Date(dateTimeString).toLocaleTimeString('en-US', options);
    return formattedTime;
  }
  const startRecording = async () => {
    setRecorder1(true);
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
  const [i, setI] = useState(true);
  const stopRecording = () => {
    console.log(elapsedTime);
    setElapsedTime(elapsedTime);
    setStop(true);
    setI(prevI => !prevI);
    if (recorder) {
      // setElapsedTime(100);
      recorder.stopRecording(() => {
        const audioBlob = recorder.getBlob();
        setRecordedAudio(audioBlob);
      });
    }
  };

  const sendAudioMessage = () => {
     setRecorder1(false);
    setRecorder(null);

    setElapsedTime(0);
    setRmessage(false);
    setRdiv('');

    const senderId = userdetail.id;
    const receiverId = dataId;
    if (recordedAudio) {
      const audioFile = new File([recordedAudio], 'audio.wav', { type: 'audio/wav' });
      const reader = new FileReader();
      reader.readAsDataURL(audioFile);
      reader.onloadend = function () {
        const base64Audio = reader.result.split(',')[1];
        const formData = new FormData();
        formData.append('audio', base64Audio);
        http
          .post('https://mykidz.online/api/audio-messages', { username, senderId, message, receiverId, spouse, base64Audio, total_second: elapsedTime ? elapsedTime : 0, reply_question: rdiv })
          .then( async (data) => {
           await fetchMessages();
            console.log('si message sent:', data.message);
            console.log('Audio message data:', data.data);
          })
          .catch((error) => {
            console.error('Error sending audio message:', error);
          });

        setRecordedAudio(null);
        setRecorder(null);
        // fetchMessages(dataId);
      };
    }
  };
  const [fname, setFname] = useState();
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result.split(',')[1];
        const fileExtension = file.name.split('.').pop();
        setFname(file.name);
        setSelectedFile(file);
        setFileMessage(`${fileExtension}`);
        // const imageUrl = URL.createObjectURL(response.data);
        setSelectedImage(base64Image);
        console.log("selected file", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    console.log(chosenEmoji, "currentEmoji");
  }, [chosenEmoji]);


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
  }, [isPlaying]);

  const togglePlayPause = (playerId) => {
    const audioPlayer = document.getElementById(playerId);
    const audio = audioPlayer.querySelector('audio');
    const player = document.getElementById(playerId);
    const addclass = audioPlayer.querySelector('.play-pause-btn');
    audio.addEventListener('timeupdate', () => {
      // const percent = (audio.currentTime / audio.duration) * 100;
      // setProgressRange(percent);
      updateCurrentTime(player, audio);
    });
    // updateCurrentTime(player, audio);

    if (activeAudioPlayer && activeAudioPlayer !== playerId) {
      const activeAudio = document.getElementById(activeAudioPlayer).querySelector('audio');
      activeAudio.pause();
    }

    if (audio.paused) {
      audio.play();
      setActiveAudioPlayer(playerId);
      addclass.classList.remove('pause');
	    addclass.classList.add('play');
    } else {
      audio.pause();
      setActiveAudioPlayer(null);
      addclass.classList.remove('play');
	    addclass.classList.add('pause');
    }
  };
  const updatePlayPauseButton = (playerId) => {
    const playPauseBtn = document.getElementById(playerId).querySelector('.play-pause-btn');
    // playPauseBtn.innerHTML = isPlaying[playerId] ? '&#9616;&#9616;' : '&#9654;';
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
    updateCurrentTime(player, audio);
  };

  // const seekTo = (playerId) => {
  //   console.log("seek");
  //   const player = document.getElementById(playerId);
  //   const audio = player.querySelector('audio');
  //   const progressRange = player.querySelector('input[type="range"]');
  //   const seekTime = (progressRange.value / 100) * audio.duration;
  //   audio.currentTime = seekTime;
  //   updateCurrentTime(player, audio);
  // };

  //*************************Dynamic circle letter */
  // console.log("spouse",spouse);
  const firstCharacterP = spouse.charAt(0);
  // console.log("firstCharacter",firstCharacterP);


  const ChildName = sessionStorage.getItem('setChildName');
  const firstCharChild = ChildName.charAt(0);

  const handleDateChange1 = (date) => {
    // Your date change logic here
    // For example, you can toggle the date in the selectedDates array
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };
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

  const [rmessage, setRmessage] = useState(false);
  const [rdiv, setRdiv] = useState('');

  function reply(question,storyID) {
    setRdiv(question);
    setRmessage(true);
    setStory_id(storyID);

  }



  return (
    <>
      <div className="chat_section_sr">
        <div className="chat_section_sr_right chat_pagemainSR">
          <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" ref={chatSectionRightRef}>
            <div className="user_name_chat d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
              <input
                className="fs-5 fw-semibold"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <Scrollbars style={{ height: 330 }}>
            <div className="list-group user_list_sr_outer list-group-flush border-bottom scrollarea" style={{ textAlign: 'center' }}>
              {!loader ? (<>
                {messages.length !== 0 ? (<>{messages.map((message, index) => (
                  <>
                    {message.senderId == dataId ? (
                      <div
                        key={index}
                        className={`list-group-item user_list_sr list-group-item-action py-3 lh-tight${message.senderId === userId ? 'sent-by-user' : ''
                          }`}
                      >
                        <div className="user_list_groupsr">
                          {message.story_reaction !== null ? (
                            <></>
                          ) : (
                            <>
                              <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                                {message.question_voice_answer === "Your child has responded! Listen to their question and send them your response here!" || message.question_voice_answer === "Your child has a question for you, listen to it and give them your full attention!" || message.question_voice_answer === "Get to know your child:Explore your child's responses to gain deeper insights into their thoughts and perspectives." || message.question_voice_answer === "Thank you for sharing your thoughts!"
                                  ? <strong className="mb-1"> <img src={bell} alt='bell' /> </strong> : <strong className="mb-1">{firstCharChild}   </strong>}
                              </div>
                            </>
                          )}
                          <div className={`right-side-user col-10 mb-1 small user_message_sr story_reaction_sr  ${message.senderId == userId ? 'sent-by-user-message' : ''
                            }`}>
                            {message.story_reaction ? (<>

                              {message.story_reaction == 'Happy' && (<><div className='story_reaction_item'>
                                <img src={Happy} />
                                <span>{ChildName} felt {message.story_reaction} reading this <br></br>story</span>
                              </div></>)}
                              {message.story_reaction == 'Excited' && (<><div className='story_reaction_item'>
                                <img src={Excited} />
                                <span>{ChildName} felt {message.story_reaction} reading this <br></br> story</span>
                              </div></>)}
                              {message.story_reaction == 'Sad' && (<><div className='story_reaction_item'>
                                <img src={Sad} />
                                <span>{ChildName} felt {message.story_reaction} reading this <br></br> story</span>
                              </div></>)}
                              {message.story_reaction == 'Angry' && (<><div className='story_reaction_item'>
                                <img src={Angry} />
                                <span>{ChildName} felt {message.story_reaction} reading this <br></br> story</span>
                              </div></>)}
                              {message.story_reaction == 'Scared' && (<><div className='story_reaction_item'>
                                <img src={Scared} />
                                <span>{ChildName} felt {message.story_reaction} reading this <br></br> story</span>
                              </div></>)}
                              {message.story_reaction == 'Surprised' && (<><div className='story_reaction_item'>
                                <img src={Surprised} />
                                <span>{ChildName} felt {message.story_reaction} reading this <br></br> story</span>
                              </div></>)}

                            </>) : (<></>)}
                            {message.message ? (
                              <><p className='simpleMsgFullchat'>{message.message}</p></>
                            ) : (
                              <>
                                {message.audio_path ? (
                                  <div class="chat-audio">
                                    <AudioPlayer index={index} message={message} togglePlayPause={togglePlayPause} />
                                    {/*  */}
                                  </div>
                                ) : (
                                  <>
                                    {message.voice_answer == "NULL" ? (<>
                                      <img src={`data:image/png;base64,${message.image}`} alt="Attached" />
                                    </>
                                    ) : (
                                      <>
                                        {message.question_voice_answer !== "Please send your family or loved ones a question about today’s topic!" && message.question_voice_answer !== "Your child has responded! Listen to their question and send them your response here!" && message.question_voice_answer !== "Your child has a question for you, listen to it and give them your full attention!" && message.question_voice_answer !== "Get to know your child:Explore your child's responses to gain deeper insights into their thoughts and perspectives." && message.question_voice_answer !== "Thank you for sharing your thoughts!" ? (<>
                                          {message.story_reaction !== null ? (
                                            <></>
                                          ) : (
                                            <p>{message.question_voice_answer}</p>

                                          )}
                                          {message.story_reaction !== null ? (
                                            <></>
                                          ) : (
                                            <div className="chat-audio" id={message.story_id}>
                                              <AudioPlayer index={index} message={message} togglePlayPause={togglePlayPause} />
                                            </div>
                                          )}
                                          {message.story_reaction !== null ? (
                                            <></>
                                          ) : (
                                            <>
                                              <div className='reply_chat_btn'>
                                                <button className='reply_btn' onClick={() => reply(message.question_voice_answer, message.story_id)}>REPLY</button>
                                              </div>
                                            </>
                                          )}
                                        </>) : (
                                          <>
                                            {message.question_voice_answer === "Please send your family or loved ones a question about today’s topic!" ? (<>
                                              <div class="chat-audio " id={message.story_id}>
                                                <p>{message.question_voice_answer}</p>
                                                <AudioPlayer index={index} message={message} togglePlayPause={togglePlayPause} />
                                              </div>
                                              <div className='reply_chat_btn'>
                                                <button className='reply_btn' onClick={() => reply(message.question_voice_answer)}>REPLY</button>
                                              </div>
                                            </>) : (
                                              <>
                                                <div class="chat-audio notification-active-cnt">
                                                  <p>{message.question_voice_answer} </p>
                                                  <AudioPlayer index={index} message={message} togglePlayPause={togglePlayPause} />
                                                </div>
                                              </>
                                            )}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        <div className={`user_time_sr ${message.question_voice_answer === "Please send your family or loved ones a question about today’s topic!" ? "karnisena" : ""}`} >
                          {message.question_voice_answer === "Your child has responded! Listen to their question and send them your response here!" || message.question_voice_answer === "Your child has a question for you, listen to it and give them your full attention!" || message.question_voice_answer === "Get to know your child:Explore your child's responses to gain deeper insights into their thoughts and perspectives." || message.question_voice_answer === "Thank you for sharing your thoughts!"
                            ? (<><label className='notification-active-cnt' >kidzconnect</label> <span>{formatTime(message.created_at)}</span></>) : (
                              <>
                                {message.story_reaction !== null ? (
                                  <>

                                  </>
                                ) : (
                                  <>
                                    <label>{ChildName}</label><span>{formatTime(message.created_at)}</span>
                                  </>

                                )}
                              </>
                            )}
                        </div>
                      </div>
                    ) : (
                      <>
                        {message.voice_answer == "NULL" ? (
                          <div
                            key={index}
                            className={`list-group-item user_list_sr list-group-item-action py-3 lh-tight ${message.senderId == userId ? 'sent-by-user' : ''
                              }`}
                          >
                            <div className="user_list_groupsr">
                              <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                                <strong className="mb-1">P</strong>
                              </div>
                              <div className={`col-10 mb-1 small user_message_sr ${message.senderId == userId ? 'sent-by-user-message' : ''
                                }`}>
                                {message.message ? (<>
                                  <p>{message.message}</p>
                                </>
                                ) : (
                                  <>
                                    {message.audio_path ? (
                                      <div class="chat-audio">
                                        <AudioPlayer index={index} message={message} togglePlayPause={togglePlayPause} />
                                      </div>
                                    ) : (
                                      <audio controls>
                                        <source src={`data:audio/wav;base64,${message.voice_answer}`} />
                                      </audio>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="user_time_sr">
                              <label>{ChildName}</label> <span>{formatTime(message.created_at)}</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div
                              key={index}
                              className={`list-group-item user_list_sr list-group-item-action py-3 lh-tight ${message.senderId == userId ? 'sent-by-user' : ''
                                }`}
                            >
                              <div className="user_list_groupsr">
                                <div className={`chat-audio-main col-10 mb-1 small user_message_sr ${message.senderId == userId ? 'sent-by-user-message' : ''}`}>
                                  {message.message ? (
                                    <>

                                      {message.reply_question ? (<>
                                        <div className='reply_question_fullchat'>
                                          <p className='reply_question'>{message.reply_question}</p>
                                          <div className="audio-player" id="audio" >
                                            <div className="play-pause-btn"></div>
                                            <div className="progress-bar">
                                              <input type="range" min="0" max="100" value={progressRange} step="1" />
                                              <div className="time-display2">
                                                <span className="current-time">0:00</span>  <span className="total-time"> </span>
                                              </div>
                                            </div>
                                            <audio className='audio' preload controls style={{ display: 'none' }}>
                                              <source src={`data:audio/wav;base64,${message.audio_path}`} />
                                            </audio>
                                          </div>
                                        </div>
                                        <p className='reply_response_text reply_textp'>{message.message}</p>
                                      </>) : (<><p className='simple_chat_text reply_textp'>{message.message}</p></>)}

                                    </>
                                  ) : (
                                    <>
                                      {message.attached_file && (
                                        <>
                                          {message.attached_file_type === "jpg" || message.attached_file_type === "png" || message.attached_file_type === "gif" ? (
                                            <img
                                              src={`data:image/${message.attached_file_type};base64,${message.attached_file}`}
                                              alt="Attached"
                                              style={{ maxWidth: '100%', maxHeight: '200px' }}
                                            />
                                          ) : null}
                                          {message.attached_file_type === "mp4" ? (
                                            <video controls style={{ maxWidth: '100%', maxHeight: '200px' }}>
                                              <source src={`data:video/mp4;base64,${message.attached_file}`} type="video/mp4" />
                                              Your browser does not support the video tag.
                                            </video>
                                          ) : null}
                                          {message.attached_file_type === "mp3" ? (
                                            <audio controls>
                                              <source src={`data:audio/mp3;base64,${message.attached_file}`} type="audio/mp3" />
                                              Your browser does not support the audio tag.
                                            </audio>
                                          ) : null}
                                          {message.attached_file_type === "pdf" ? (
                                            <>
                                              Attachment : PDF
                                              <a href={`data:application/pdf;base64,${message.attached_file}`} download="attached.pdf">
                                                (Download)
                                              </a>
                                            </>
                                          ) : null}
                                          {message.attached_file_type === "docx" ? (
                                            <>
                                              Attachment : DOCX
                                              <a href={`data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${message.attached_file}`} download="attached.docx">
                                                (Download)
                                              </a>
                                            </>
                                          ) : null}
                                          {message.attached_file_type === "txt" ? (
                                            <>
                                              Attachment : ${fname}
                                              <a
                                                href={`data:text/plain;base64,${message.attached_file}`}
                                                download="attached.txt"
                                              >
                                                (Download)
                                              </a></>
                                          ) : null}
                                        </>
                                      )}
                                      {message.audio_path ? (
                                        <div class="chat-audio">
                                          {message.reply_question && (<>
                                            <div className='reply_question_fullchat chat-audioreply'>
                                              <p className='reply_question'>{message.reply_question}</p>
                                              <AudioPlayer index={index} message={message} togglePlayPause={togglePlayPause} />
                                            </div>
                                          </>)}
                                          <AudioPlayer index={index} message={message} togglePlayPause={togglePlayPause} />
                                        </div>
                                      ) : (
                                        <>
                                          {message.voice_answer == "NULL" ? (<></>
                                          ) : (<></>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </div>
                                <div className="d-flex w-100 align-items-center justify-content-between user_name_label">
                                  <strong className="mb-1">{firstCharacterP}</strong>
                                </div>
                              </div>
                              <div className="user_time_sr">
                                <label>{spouse}</label><span>{formatTime(message.created_at)}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                ))}</>) : (<div className='no-chat'> <p> No chats </p></div>)}

              </>) : (<div className='no-chat'>    <img src={Load} alt="Loading..." /></div>
              )}
            </div>
            </Scrollbars>

          </div>
        </div>

        <div className="chat_form_input_outer_new ">

          <div className="chat_form_input">

            <div className='reply_message_container'>
              {rmessage && (<> <div className='chat_form_input reply_message' >
                <div class="chat-audio">
                  <p>{rdiv} </p>
                  <div className="audio-player" id="audio" >
                    <div className="play-pause-btn"></div>
                    <div className="progress-bar">
                      <input type="range" min="0" max="100" value={progressRange} step="1" />
                      <div className="time-display2">
                        <span className="current-time">0:00</span>  <span className="total-time"> </span>
                      </div>
                    </div>
                    <audio className='audio' preload controls style={{ display: 'none' }}>
                      <source src={`data:audio/wav;base64,${message.audio_path}`} />
                    </audio>
                  </div>
                </div>
              </div></>)}
            </div>

            <input
              className="form-control"
              placeholder={fname ? `Attached file : ${fname}` : "Write a message"}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setRecorder1(e.target.value);
                // setRecorder(e.target.value);
              }}
            />
            <div className="chat_form_input_btncnrl">
              <div className="chat_form_input_btncnrlLeft" >
                <div style={{ position: 'relative' }}>
                  <button className="confirm" disabled={recorder ? true : false} >
                    <img src={recorder ? paper_clip : PaperClipImage} alt="protected" />
                  </button>
                  <input
                    className='file_choise_profile'
                    type={recorder ? '' : "file"}
                    onChange={handleFileChange}
                    onClick={() => setRecorder1(true)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                    }}
                  />
                </div>
                <div><img
                  className="emoji-icon"
                  src={recorder ? emotes : EmojiImage}
                  onClick={recorder ? undefined : () => { setShowPicker(val => !val); setRecorder1(true) }} />
                  {showPicker && <Picker
                    pickerStyle={{ width: '100%' }}
                    onEmojiClick={onEmojiClick} />}
                </div>
              </div>
              <div className="chat_form_input_btncnrlRight chat_form_input_btncnrlRight-parrent">
                {recorder ? (
                  <>
                    <img onClick={delRecording} src={del} />
                    <div style={{ background: '#8A6CB1' }}>
                      <span>{`0:${elapsedTime.toString().padStart(2, '0')}`}</span>
                      <img src={WaveSendAudioImage} alt="protected" />
                      {i ? (<>
                        <button className='stop_reco_btn' onClick={stopRecording}><img src={pause} /></button>
                      </>) : (<>
                        <button className='stop_reco_btn' onClick={resumeRecording} ><img src={play} /></button>
                      </>)}
                    </div>
                  </>
                ) : (<><button onClick={startRecording}>
                  <img src={SendAudioImage} alt="protected" />
                </button></>)}
              </div>
            </div>
          </div>
          {recorder1 ? (
            <>
              {recorder ? (
                <button className='sendAudioMessage_new t1' onClick={sendAudioMessage}>
                  <img src={sendImage2} alt="protected" />
                </button>
              ) : (
                <button className='sendAudioMessage_new t2' onClick={submit}>
                  <img src={sendImage2} alt="protected" />
                </button>
              )}
            </>
          ) : (
            <>
              <button className='sendAudioMessage_new t3' disabled >
                <img src={sendImage1} alt="protected" />
              </button>
            </>
          )
          }
        </div>
      </div>
      <div className="chat_filter">
        <div className="calendar">
          <Calendar onChange={handleDateChange} value={selectedDate} tileClassName={tileClassName} />
        </div>
      </div>
    </>
  );
};

export default Chat;
