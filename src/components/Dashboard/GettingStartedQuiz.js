import React, { useEffect, useState } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';

import ParentalSwitch from '../../images/Home.png';
import DarkBlue_Home from '../../images/DarkBlue_Home.png';
import blueTheme_Home from '../../images/blueTheme_Home.png';
import orangeTheme_Home from '../../images/orangeTheme_Home.png';
import pinkTheme_Home from '../../images/pinkTheme_Home.png';
import purpleTheme_Home from '../../images/purpleTheme_Home.png';

import Smiling from '../../images/emoji/02 Smiling.png';
import Squinting from '../../images/emoji/07 Grinning Squinting Face.png';
import Flushed from '../../images/emoji/18 Flushed Face.png';
import Crying from '../../images/emoji/31 Crying Face.png';
import Rounded from '../../images/emoji/Rounded_Emoji_Icons_Set (1).png';
import Rounded1 from '../../images/emoji/Rounded_Emoji_Icons_Set.png';
import AuthUser from '../AuthUser';



const GettingStartedQuiz = (dataId) => {
  const { http } = AuthUser();
  const navigate = useNavigate();

  const { user, token } = AuthUser();
  const [username, setUsername] = useState('');
  const [userdetail, setUserdetail] = useState({});
  const [selectedReaction, setSelectedReaction] = useState('');
  useEffect(() => {
    fetchUserDetail();
    // console.log(username);
    // console.log(userdetail);
  }, [])
  const fetchUserDetail = () => {
    setUserdetail(user);
    setUsername(user.name.split(' ')[0]);
  };

  useEffect(()=>{
    const theme = sessionStorage.getItem("theme");
    document.body.classList.add(theme);
    },[sessionStorage.getItem("theme")])
 
  const handleEmojiClick = (reaction) => {
    console.log(reaction);
    setSelectedReaction(reaction);
    const senderId = sessionStorage.getItem('setChildID');
    const receiverId = userdetail.id;
    const spouse = userdetail.spouse;

    http
      .post('https://mykidz.online/api/add-story-reaction', { username, senderId, receiverId, spouse, story_reaction: reaction })
      .then((data) => {
        navigate('/quiz');
      })
      .catch((error) => {
        console.error('Error sending audio message:', error);
      });
  };

  return (
    <>
      <div className='chosen-story-section'>
        <Link className="nav-link" to="/Kids-view">
        <img className="defaultHome" loading="lazy" src={ParentalSwitch} alt='' />
          <img className="DarkBlue_HomeIn defaultHome" loading="lazy" src={DarkBlue_Home} alt='' />
          <img className="blueTheme_HomeIn defaultHome" loading="lazy" src={blueTheme_Home} alt='' />
          <img className="orangeTheme_HomeIn defaultHome" loading="lazy" src={orangeTheme_Home} alt='' />
          <img className="pinkTheme_HomeIn defaultHome" loading="lazy" src={pinkTheme_Home} alt='' />
          <img className="purpleTheme_HomeIn defaultHome" loading="lazy" src={purpleTheme_Home} alt='' />

          </Link>
        <div className='feedback-container-story' >
          <h2>How did the story make you feel?</h2>
          <p>Select an emotion!</p>
          <div className='emoji-section'>
            <div className='single-emoji-section'>
              <Link className="nav-link" onClick={() => handleEmojiClick('Happy')} >
                <img loading="lazy" src={Smiling} />
                <p>Happy</p>
              </Link>
            </div>
            <div className='single-emoji-section'>
              <Link className="nav-link" onClick={() => handleEmojiClick('Excited')} >
                <img loading="lazy" src={Squinting} />
                <p>Excited</p>
              </Link>
            </div>
            <div className='single-emoji-section'>
              <Link className="nav-link" onClick={() => handleEmojiClick('Sad')} >
                <img loading="lazy" src={Rounded1} />
              </Link>
              <p>Sad</p>
            </div>
            <div className='single-emoji-section'>
              <Link className="nav-link" onClick={() => handleEmojiClick('Angry')} >
                <img loading="lazy" src={Rounded} />
                <p>Angry</p>
              </Link>
            </div>
            <div className='single-emoji-section'>
              <Link className="nav-link" onClick={() => handleEmojiClick('Scared')} >
                <img loading="lazy" src={Crying} />
                <p>Scared</p>
              </Link>
            </div>

            <div className='single-emoji-section'>
              <Link className="nav-link" onClick={() => handleEmojiClick('Surprised')}>
                <img loading="lazy" src={Flushed} />
                <p>Surprised</p>
              </Link>
            </div>


          </div>

        </div>
      </div>

    </>
  );
};

export default GettingStartedQuiz;
