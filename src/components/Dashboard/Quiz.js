import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Star from '../../images/Star Icon.png';
import SharePopup from './share_popup';
import ParentalSwitch from '../../images/Home.png';
import Share from '../../images/Share 3.png';
import sun_effect_IMG from '../../images/sun_effect.png';
import stairs_IMG from '../../images/013-stairs01.png';
import park_IMG from '../../images/001-park.png';
import cross from '../../images/cross.png';

function Quiz({
  selectedAnswer,
  showCorrectAnswer,
  tryAgain,
  onSubmit,
  onNext,
}) {
  const [currentSelectedAnswer, setCurrentSelectedAnswer] = useState(null);
  const [showPointEarnedPopup, setShowPointEarnedPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState();
  const [point, setPoint] = useState(0);
  const [showSharePopup, setShowSharePopup] = useState(false);

  useEffect(() => {
    const theme = sessionStorage.getItem("theme");

    document.body.classList.add(theme);
  }, [sessionStorage.getItem("theme")])
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const x = JSON.parse(sessionStorage.getItem("selectedStory"));
    const y = JSON.parse(sessionStorage.getItem("childStorydata"));
    const StoryData = x ? x : y;
    console.log("STORY DATA", StoryData);
    const questions = JSON.parse(StoryData.story_mcq_questions);
    setQuestion(questions.question);
    setDescription(questions.description);
    setCorrectAnswer(questions.correctAnswer);
    setOptions(questions.options);

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
    tryAgain();
    setCurrentSelectedAnswer(null);
  }

  const addBodyClass = () => {
    document.body.classList.add('popup_active');
  };

  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
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

  const handleNextQuestion = () => {
    onNext(); // Proceed to the next question
    localStorage.setItem("score", point + 1);
  };

  const [button, setButton] = useState(false);
  const Alph = ["A", "B", "C"];

  // Destructure values from the questions array

  return (
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
  );
}

export default Quiz;
