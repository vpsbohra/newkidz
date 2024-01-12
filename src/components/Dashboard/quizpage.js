import React, { useState } from "react";
import "./App.css";
import questions from "./questions";
import Quiz from "./Quiz";
// import Popup from "./Popup";
import { Link, useNavigate } from 'react-router-dom';
import Star from '../../images/Star Icon.png';

import ParentalSwitch from '../../images/Home.png';
import DarkBlue_Home from '../../images/DarkBlue_Home.png';
import blueTheme_Home from '../../images/blueTheme_Home.png';
import orangeTheme_Home from '../../images/orangeTheme_Home.png';
import pinkTheme_Home from '../../images/pinkTheme_Home.png';
import purpleTheme_Home from '../../images/purpleTheme_Home.png';

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



  
  function handleTry() {
    setShowCorrectAnswer(false);
    setSelectedAnswer(null);
  }
  const handleNextQuestion = () => {
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


  const handleShare = () => {
    setShowSharePopup(true);
    addBodyClass();
  }
  
const handleCloseSharePopup = () => {
    
  setShowSharePopup(false); 
    removeBodyClass();
  };


  const addBodyClass = () => {
    document.body.classList.add('popup_active');
  };
  
  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
  };

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
        <Link className="nav-link top_navbtnsr top_navbtnsr_right" to="/Kids-view"><img loading="lazy" src={Replay} alt='' /></Link>
        {/* <button className='close-button Share_btn_sr' onClick={handleShare}>
                <Link className="nav-link"><img loading="lazy" src={Sharebtn} /> </Link>
              </button> */}
              </div>
              <div class="head-price-cstm">
                {/* <img loading="lazy" src={Coins}/> */}
                <img loading="lazy" src={MoneyBagImage} alt="protected" /><span>150</span>
              </div>
</div>

              {showSharePopup && (
                <SharePopup onClose={handleCloseSharePopup} />
              )}
        <Quiz
          correctAnswer={questions[currentQuestionIndex].correctAnswer}
          selectedAnswer={selectedAnswer}
          showCorrectAnswer={showCorrectAnswer}
          onSubmit={handleQuizSubmit}
          onNext={handleNextQuestion}
          tryAgain={handleTry}
        />
      </div>
    </>
  );
}

export default App1;
