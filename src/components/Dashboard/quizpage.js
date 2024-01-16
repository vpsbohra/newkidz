import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./App.css";
import questions from "./questions";
import Quiz from "./Quiz";
import Star from '../../images/Star Icon.png';
import DarkBlue_Home from '../../images/DarkBlue_Home.png';
import blueTheme_Home from '../../images/blueTheme_Home.png';
import orangeTheme_Home from '../../images/orangeTheme_Home.png';
import pinkTheme_Home from '../../images/pinkTheme_Home.png';
import purpleTheme_Home from '../../images/purpleTheme_Home.png';
import AuthUser from '../AuthUser';
import axios from 'axios';
import ParentalSwitch from '../../images/Home.png';
import Share from '../../images/Share 3.png';
import sun_effect_IMG from '../../images/sun_effect.png';
import stairs_IMG from '../../images/013-stairs01.png';
import park_IMG from '../../images/001-park.png';
import cross from '../../images/cross.png';
import Replay from '../../images/Replay Audio.png';
import Sharebtn from '../../images/Share.png';
// import Coins from '../../images/Coins.png';
import MoneyBagImage from '../../images/money-bag.png';

import SharePopup from './share_popup';

function App1() {
  const [showPopup, setShowPopup] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDesIndex, setCurrentDesIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const navigate = useNavigate(); // Add this line

  const handleQuizSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setShowPopup(true);
    }
    setShowCorrectAnswer(true);

  };

  function tryAga() {
    setShowCorrectAnswer(false);
    setSelectedAnswer(null);
  }

  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);
  const [showPointEarnedPopup, setShowPointEarnedPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState();
  const [point, setPoint] = useState(0);
  const [currentaudio, setAudio] = useState();
  const { token } = AuthUser();
  const [story_id, setStory_id] = useState();
  const ChildID = sessionStorage.getItem('setChildID');
  const [showReplayButton, setShowReplayButton] = useState(false);






  useEffect(() => {
    fetchData();
    const theme = sessionStorage.getItem("theme");

    document.body.classList.add(theme);
  }, [sessionStorage.getItem("theme")])
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let StoryData;

    const x = sessionStorage.getItem("selectedStory");
    const y = sessionStorage.getItem("childStorydata") || '';
    
   
      
      StoryData = x ? JSON.parse(x) : JSON.parse(y);
      console.log("above",StoryData.story_mcq_questions);
  
    console.log("STORY DATA", StoryData);
    try {
      const questions = JSON.parse(StoryData.story_mcq_questions);
    console.log("questions.question",questions.question);
     
      setQuestion(questions.question);
      setDescription(questions.description);
      setCorrectAnswer(questions.correctAnswer);
      setOptions(questions.options);
  
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
    
   
  }, [])
  const handleShare = () => {
    setShowSharePopup(true);
    addBodyClass();
  }

  const handleCloseSharePopup = () => {

    setShowSharePopup(false);
    removeBodyClass();
  };

  const handleOptionSelect = (option) => {
    setButton(true);
    if (!showCorrectAnswer) {
      setCurrentSelectedAnswer(option);
    }
  };

  function handleTry() {
    tryAga();
    setCurrentSelectedAnswer(null);
  }

  const addBodyClass = () => {
    document.body.classList.add('popup_active');
  };

  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
  };

  const onSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
      setShowPopup(true);
    }
    setShowCorrectAnswer(true);

  };
  const handleSubmit = () => {
    if (currentSelectedAnswer === correctAnswer) {
      setIsCorrect(true);
      // setShowPointEarnedPopup(true);
    } else {
      setIsCorrect(false);
    }
    onSubmit(currentSelectedAnswer === correctAnswer);
  };
  const onNext = () => {
    // setShowPopup(false);
    // setShowCorrectAnswer(false);
    // setSelectedAnswer(null);

    // if (currentQuestionIndex + 1 < questions.length) {
    //   setCurrentQuestionIndex(currentQuestionIndex + 1);
    // } else {
    setQuizCompleted(true);
    // navigate('/all-activity', { state: { score } });
    window.location.href = '/RecordedAnswer';
    // }
  };
  const handleNextQuestion = () => {
    // setShowPointEarnedPopup(false); // Close the popup
    onNext(); // Proceed to the next question
    localStorage.setItem("score", point + 1);
  };
  const [button, setButton] = useState(false);
  const Alph = ["A", "B", "C"];
  // Destructure values from the questions array

  const fetchData = async () => {
    console.log('helllo')
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
        const mcq_audio = selectedStory.mcq_audio.split(',');
        setAudio(mcq_audio);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleAudioEnded = () => {
    // Show the replay button when the audio ends
    setShowReplayButton(true);
  };
  const handleReplay = () => {
    // Hide the replay button and replay the audio
    setShowReplayButton(false);
    let audio = new Audio(currentaudio);
    audio.play();
    audio.addEventListener('ended', handleAudioEnded);

  };


  useEffect(() => {
    // Play audio only once when the page loads
    let audio = new Audio(currentaudio);
    audio.play();

    // Add event listener to handle audio ended
    audio.addEventListener('ended', handleAudioEnded);

    // Clean up the audio element and remove event listener when the component unmounts
    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
      audio = null;
    };
  }, [currentaudio]);


 
  
  return (
    <>
      <div className='chosen-story-section'>
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
          <div class="head-price-cstm">
            {/* <img loading="lazy" src={Coins}/> */}
            <img loading="lazy" src={MoneyBagImage} alt="protected" /><span>150</span>
          </div>
        </div>

        {showSharePopup && (
          <SharePopup onClose={handleCloseSharePopup} />
        )}
        <div className="feedback-container-story feedback-container-story-cstm">
          <div className="option-main-section">
            <h2 className="question">{question}</h2>
            <p>{description}</p>
            <ul className="options">
              {options.map((option, index) => (
                <div
                  className={`${showCorrectAnswer && correctAnswer === option
                    ? "correct_item_sr"
                    : ""
                    }${showCorrectAnswer &&
                      correctAnswer !== option &&
                      currentSelectedAnswer === option
                      ? "incorrect_item_sr_selected"
                      : ""
                    }`}
                >
                  <li
                    key={index}
                    className={`option-section option ${currentSelectedAnswer === option ? "selected" : ""
                      } ${showCorrectAnswer &&
                        correctAnswer !== option &&
                        currentSelectedAnswer === option
                        ? "incorrect"
                        : ""
                      }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <span className="option">
                      {showCorrectAnswer && correctAnswer !== option && currentSelectedAnswer === option ? (
                        <img src={cross} alt="Incorrect" />
                      ) : (
                        Alph[index]
                      )}
                    </span>
                    <p className="option-text">{option}</p>
                  </li>



                  {showCorrectAnswer &&
                    correctAnswer === option &&
                    currentSelectedAnswer === correctAnswer ? (
                    <div className="point-earned-popup">
                      <img loading="lazy" src={Star} alt="Star Icon" />
                      <span>+1 POINT EARNED! </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </ul>
            {!showCorrectAnswer ? (
              <>
                {button ? (
                  <button
                    className="submit-button check-answer"
                    onClick={handleSubmit}
                  >
                    Check Answer
                  </button>
                ) : (
                  // Display "Try Again" button only if the selected option is incorrect
                  isCorrect === false && (
                    <button
                      className="try-again-button check-answer"
                      onClick={handleNextQuestion}
                    >
                      Try Again
                    </button>
                  )
                )}
              </>
            ) : (
              // Display "Next Question" button only if the selected option is correct
              isCorrect === true ? (

                <>
                  <button
                    className="next-button check-answer"
                    onClick={handleNextQuestion}
                  >
                    Next Question
                  </button>


                  {/* <button className='close-button Share_btn_sr' onClick={handleShare}>
                <Link className="nav-link">Share<img loading="lazy" src={Share} /> </Link>
              </button>
              {showSharePopup && (
                <SharePopup onClose={handleCloseSharePopup} />
              )} */}

                </>

              ) : (
                <>
                  <button
                    className="try-again-button check-answer"
                    onClick={handleTry}
                  >
                    Try Again
                  </button>
                </>
              )
            )}
            {/* {showCorrectAnswer && (
          <p className="correct-answer">Correct Answer: {correctAnswer}</p>
        )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App1;
