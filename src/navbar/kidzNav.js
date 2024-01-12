import React, { useState, useEffect } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import AuthUser from '../components/AuthUser';

import ParentalSwitch from '../images/Parental_Switch01.png';
import MessagesIcon from '../images/Messages(1).png';
import ActivitiesIcon from '../images/Activities01.png';
import DarkBlue_Activities from '../images/DarkBlue_Activities.png';
import blueTheme_Activities from '../images/blueTheme_Activities.png';

import orangeTheme_Activities from '../images/orangeTheme_Activities.png';
import pinkTheme_Activities from '../images/pinkTheme_Activities.png';
import purpleTheme_Activities from '../images/purpleTheme_Activities.png';

import orangeTheme_Home from '../images/orangeTheme_Home.png';
import opinkTheme_Home from '../images/pinkTheme_Home.png';
import purpleTheme_Home from '../images/purpleTheme_Home.png';

import HomeIcon from '../images/Home01.png';
import DarkBlue_Home from '../images/DarkBlue_Home.png';
import blueTheme_Home from '../images/blueTheme_Home.png';


import MoneyBagImage from '../images/money-bag.png';
import protectImg1 from '../images/036-protect.png';
import setting from '../images/setting.png';
import brush from '../images/brush.png';
import KidzDashboard from '../components/Dashboard/KidzDashboard';
import axios from 'axios';
import bowbow from "../images/bow_bow.png";
import close from '../images/Close.png';




function KidsNav() {

  const { token } = AuthUser();

  const [rem, setRem] = useState(5 - localStorage.getItem('question') == 5 ? 0 : 5 - localStorage.getItem('question'));
  const [questions, setQuestions] = useState([]);
  const { http, setToken } = AuthUser();

  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userdetail, setUserdetail] = useState('');
  const [isParentalSwitchActive, setIsParentalSwitchActive] = useState(false);
  const { user } = AuthUser();
  const [userId, setUserId] = useState('');
  const childId = sessionStorage.getItem('childId');

  const [themesVisible, setThemesVisible] = useState(false);

  const [childProfiles, setChildProfiles] = useState([]);
  const [changeTheme, setChangeTheme] = useState(false);
  const [addClass, setAddClass] = useState('');




  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');

    const user = JSON.parse(userInformation);
    const { id } = user;


    const theme = sessionStorage.getItem("theme");
    if (theme) {
      document.body.classList.add(theme);
      setAddClass(theme)
    }
    else {

      http.get(`/child-profiles?user_id=${id}`).then((res) => {
        setChildProfiles(res.data);
        console.log("res.data", res.data)
        const response = res.data;
        localStorage.setItem("childProfilesLocal", JSON.stringify(res.data));
        console.log("else condition");
        const activeChildId = sessionStorage.getItem("childId");
        console.log("activeChildId", activeChildId)
        console.log("cholddd", childProfiles);
        console.log("cholddd2", response);
        const activeChild = response.find((child) => child.id == activeChildId);
        console.log("activeChild", activeChild)
        if (activeChild) {
          const themeFromDatbase = activeChild.theme_selected;
          setAddClass(themeFromDatbase);
          document.body.className = "";
          console.log("themeFromDatbase", themeFromDatbase);
          document.body.classList.add(themeFromDatbase);
          sessionStorage.setItem("theme", themeFromDatbase);
        }
      });
    }

    }, [childId, userId]);
    const handleColorClick = async (color) => {
      try {
        setAddClass(color);
        document.body.className = "";
        sessionStorage.setItem("theme",color);
        document.body.classList.add(color);
        await http.patch(`/update-child-account-theme/${childId}`, {
          theme_selected: color,
        });
      } catch (error) {
        console.error('Error updating child account theme:', error);
      }
    };


  console.log("adddddddd", addClass);

  const handleDefualt = () => {
    document.body.className = "";
    sessionStorage.removeItem("theme");
    setAddClass('')
    try {
      setAddClass(null);
      document.body.className = "";


      http.patch(`/update-child-account-theme/${childId}`, {
        theme_selected: null,
      });
    } catch (error) {
      console.error('Error updating child account theme:', error);
    }
  };





  console.log("childProfiles", childProfiles);

  useEffect(() => {

    fetchQuestions();
    fetchChildData();
  }, []);

  const fetchQuestions = async () => {
    const question = JSON.parse(localStorage.getItem('stories'));
    if (question) {
      const storyId = sessionStorage.getItem('childStory');
      const selectedStory = question.find(story => story.id === parseInt(storyId, 10));
      console.log("Story data", selectedStory);

      if (selectedStory) {
        const mcqData = selectedStory.story_mcq;
        const questionArray = mcqData.split('-');
        setQuestions(questionArray);

      }
    } else {
      try {
        const response = await axios.get('https://mykidz.online/api/stories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.setItem("stories", JSON.stringify(response.data));


        const storyId = sessionStorage.getItem('childStory');
        const selectedStory = response.data.find(story => story.id === parseInt(storyId, 10));
        console.log("Story data", selectedStory);

        if (selectedStory) {
          const mcqData = selectedStory.story_mcq;
          const questionArray = mcqData.split('-');
          setQuestions(questionArray);

        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }

  };


  //*************************messages******************************************* */
  const [totalUnreadMessages, setTotalUnreadMessages] = useState({});
  const [AllMessages, setAllMessages] = useState(0);
  const fetchTotalUnreadMessages = () => {
    const totalCounts = {};

    if (Array.isArray(AllMessages)) {

      console.log("yes its an array");
      AllMessages.forEach((message) => {
        if (!totalCounts[message.spouse]) {
          totalCounts[message.spouse] = 0;
        }

        if (message.message_status === 'unread') {
          totalCounts[message.spouse]++;
        }
      });
    }
    setTotalUnreadMessages(totalCounts);
  };
  const fetchAllMessages = async () => {
    const allmessages = JSON.parse(localStorage.getItem('allmessages'));
    if (!allmessages) {
      try {
        const response = await http.get('https://mykidz.online/api/all-messages');
        const allMessagesFromApi = response.data;

        const filteredMessages = allMessagesFromApi.filter(message => message.receiverId === childId);

        console.log('Filtered messages:', filteredMessages);
        setAllMessages(filteredMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
    else {
      const filteredMessages = allmessages.filter(message => message.receiverId === childId);

      console.log('Filtered messages:', filteredMessages);
      setAllMessages(filteredMessages);
    }

  };
  useEffect(() => {
    fetchTotalUnreadMessages();

  }, [AllMessages]);
  useEffect(() => {
    fetchAllMessages();

  }, []);
  console.log("totalUnreadMessages", totalUnreadMessages);
  console.log("AllMessages", AllMessages);
  const num = Object.values(totalUnreadMessages).reduce((total, count) => total + count, 0);
  console.log("num", num);


  useEffect(() => {
    const userInformation = sessionStorage.getItem('user');

    const user = JSON.parse(userInformation);
    const { id } = user;
    setUserId(id);

  }, []);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    setUserdetail(user);
  };

  function renderElement() {
    if (userdetail) {
      return <p>{userdetail.name.split(' ')[0]}</p>;
    } else {
      return <p>Loading.....</p>;
    }
  }
  const handleCodeEntry = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedCode = JSON.parse(sessionStorage.getItem('user')).user_code;
    if (code === storedCode) {
      navigate('/parent-dashboard');
    } else {
      setErrorMessage('Invalid code entered. Please try again.');
      console.log('Incorrect code entered!');
    }
  };
  const handleCancel = () => {
    setShowPopup(false);
    setIsParentalSwitchActive(false);
  };
  // const handleParentalSwitch = () => {
  //   // setShowPopup(true);
  //   // setErrorMessage('');
  //   // setIsParentalSwitchActive(true);
  //   navigate('/who-are-you');
  //   console.log('hello')

  // };

  const handleMessages = () => {
    navigate('/kids-messages');
  };
  const handleHome = () => {
    navigate('/kids-view');
  };

  useEffect(() => {
    if (isParentalSwitchActive) {
      document.documentElement.classList.add('parental-switch-active');
    } else {
      document.documentElement.classList.remove('parental-switch-active');
    }
  }, [isParentalSwitchActive]);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('parental-switch-active');
    };
  }, []);

  useEffect(() => {
    const x = sessionStorage.getItem('owner');
    if (x) {
      setToggle(true);
    }
    const handleBackButton = (event) => {
      event.preventDefault();
      // alert('true');
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [showPopup]);

  const fetchChildDetail = async () => {
    try {
      console.log('Fetching user detail');
      let childdata = JSON.parse(localStorage.getItem('childdata'));

      if (!childdata) {
        const response = await http.get(`/child-profiles?user_id=${userId}`);
        childdata = response.data;
        localStorage.setItem('childdata', JSON.stringify(childdata));
      }
      setChildProfiles(childdata);
      console.log("childdata", childdata);
    } catch (error) {
      console.error('Error fetching child detail:', error);
    }
  };


  useEffect(() => {
    if (childProfiles.length === 0) {
      fetchChildDetail();
    }
  }, [localStorage]);
  const activeChildProfiles = childProfiles.filter(child => child.id === parseInt(childId));
  const activeChildName = activeChildProfiles.map(child => child.child_name);
  const cname = sessionStorage.getItem('setChildName')
  const fetchChildData = async () => {
    const childdata = JSON.parse(localStorage.getItem('childdata'));
    if (childdata) {
      const a = sessionStorage.getItem('setChildID');
      const b = sessionStorage.getItem('childId');
      const cid = a ? a : b;
      // console.log("session child id", cid);
      const child = childdata.find((n) => n.id === parseInt(cid));
      if (child) {
        // console.log('test123' + child.current_question);
        // localStorage.setItem("question", child.current_question);
        // const a = localStorage.getItem("question");
        // const b = questions.length > 0 ? questions.length : 5;
        // const y = b - a;
        // setRem(y);
        // console.log("Attempted question", a);
        // console.log("Total question", b);
        // console.log("REMAINING QUESTIONS", y);
      }
    } else {
      try {
        const response = await axios.get(`https://mykidz.online/api/child-profiles?user_id=${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        localStorage.setItem('childdata', JSON.stringify(response.data))

        const abc = response.data;
        const a = sessionStorage.getItem('setChildID');
        const b = sessionStorage.getItem('childId');
        const cid = a ? a : b;
        // console.log("session child id", cid);
        const child = abc.find((n) => n.id === parseInt(cid));
        if (child) {
          // console.log('test123' + child.current_question);
          localStorage.setItem("question", child.current_question);
          const a = localStorage.getItem("question");
          const b = questions.length > 0 ? questions.length : 5;
          const y = b - a;
          setRem(y);
          // console.log("Attempted question", a);
          // console.log("Total question", b);
          // console.log("REMAINING QUESTIONS", y);
        }
      } catch (error) {
        console.error('Error fetching child data:', error);
      }
    }

  };
  const [toggle, setToggle] = useState(false);
  const handleLogout = () => {
    // Clear session storage and navigate to the logout page
    sessionStorage.clear();
    navigate('/');
  };

  const handleHover = () => {
    console.log('handle');
    setChangeTheme(true);
  };
  const handleHoverOut = () => {
    console.log('handle out');
    setChangeTheme(false);
  };
  const selectTheme = () => {

    setThemesVisible(true);
    console.log('session ')
  }
  const handleClose = () => {

    setThemesVisible(false);
  }

  const handleParentalSwitch = () => {
    document.body.className = '';
    console.log('remove')
    navigate('/who-are-you');
  }







  return (
    <>
      <div className="kidsname">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/Kids-view" onClick={handleHome}>
                  <img className='white_Home' loading="lazy" src={HomeIcon} alt='' />
                  <img className='DarkBlue_Home white_Home' loading="lazy" src={DarkBlue_Home} alt='' />
                  <img className='blueTheme_Home white_Home' loading="lazy" src={blueTheme_Home} alt='' />

                  <img className='orangeTheme_Home white_Home' loading="lazy" src={orangeTheme_Home} alt='' />
                  <img className='pinkTheme_Home white_Home' loading="lazy" src={opinkTheme_Home} alt='' />
                  <img className='purpleTheme_Home white_Home' loading="lazy" src={purpleTheme_Home} alt='' />

                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={rem < 1 ? "" : "/RecordedAnswer"}>
                  <img className='white_Activities' loading="lazy" src={ActivitiesIcon} alt='' />
                  <img className='DarkBlue_Activities white_Activities' loading="lazy" src={DarkBlue_Activities} alt='' />
                  <img className='blueTheme_Activities white_Activities' loading="lazy" src={blueTheme_Activities} alt='' />

                  <img className='orangeTheme_Activities white_Activities' loading="lazy" src={orangeTheme_Activities} alt='' />
                  <img className='pinkTheme_Activities white_Activities' loading="lazy" src={pinkTheme_Activities} alt='' />
                  <img className='purpleTheme_Activities white_Activities' loading="lazy" src={purpleTheme_Activities} alt='' />

                  <span>{rem < 5 ? rem : 0}</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Kids-messages" onClick={handleMessages} ><img loading="lazy" src={MessagesIcon} alt='' />{num > 0 ? (<span> {num} </span>) : (<></>)}</Link>
              </li>
              {toggle ? (<li className="nav-item active">
                <Link className="nav-link" id="parental_switch" to="/who-are-you" onClick={handleParentalSwitch}>
                  <img loading="lazy" src={ParentalSwitch} alt='' />
                </Link>
              </li>) : (<>
                <Link className="nav-link" onClick={handleLogout} ><svg width="76" height="76" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6413 2.45605H5.55794C3.70211 2.45605 2.19336 3.9648 2.19336 5.82064C2.19336 6.11105 2.43419 6.35189 2.72461 6.35189C3.01503 6.35189 3.25586 6.11105 3.25586 5.82064C3.25586 4.55272 4.29003 3.51855 5.55794 3.51855H12.6413C13.9092 3.51855 14.9434 4.55272 14.9434 5.82064V12.904C14.9434 14.1719 13.9092 15.2061 12.6413 15.2061H5.55794C4.29003 15.2061 3.25586 14.1719 3.25586 12.904C3.25586 12.6136 3.01503 12.3727 2.72461 12.3727C2.43419 12.3727 2.19336 12.6136 2.19336 12.904C2.19336 14.7598 3.70211 16.2686 5.55794 16.2686H12.6413C14.4971 16.2686 16.0059 14.7598 16.0059 12.904V5.82064C16.0059 3.9648 14.4971 2.45605 12.6413 2.45605Z" fill="#00897B" />
                  <path d="M2.19336 9.36232C2.19336 9.65274 2.43419 9.89357 2.72461 9.89357H10.6509L8.72419 11.8202C8.51878 12.0257 8.51878 12.3657 8.72419 12.5711C8.83044 12.6773 8.96503 12.7269 9.09961 12.7269C9.23419 12.7269 9.36877 12.6773 9.47503 12.5711L12.3084 9.73774C12.5138 9.53232 12.5138 9.19232 12.3084 8.98691L9.47503 6.15357C9.26961 5.94816 8.92961 5.94816 8.72419 6.15357C8.51878 6.35899 8.51878 6.69899 8.72419 6.90441L10.6509 8.83107H2.72461C2.43419 8.83107 2.19336 9.07191 2.19336 9.36232Z" fill="#00897B" />
                </svg></Link>
              </>)}

            </ul>
          </div>
          <div className="right-icons">
            <a className="nav-link points" disabled>
              <img loading="lazy" src={MoneyBagImage} alt="protected" /> 107 Points
            </a>

            <div className='theme_change_cnt' onMouseOut={handleHoverOut} onMouseOver={handleHover}>
              <a className="nav-link toggle-profile"   >
                <img src={setting} alt='setting icon' />{cname}
              </a>
              {/* {changeTheme && ( */}
              <div className='theme_change' onClick={selectTheme}><img src={brush} alt='brush' /><p>Change theme color</p></div>

            </div>
          </div>
        </nav>
      </div>

      {themesVisible &&
        <div className='select_theme_cnt'>
          <div className='bow_bow' >

            <img src={bowbow} alt="boobo" onClick={handleDefualt}/>
            {sessionStorage.getItem("theme") ? (
              <p className='boobo_text' onClick={handleDefualt}>Click on me to go back to how it was!</p>
            ) : (
              <p className='boobo_text' onClick={handleDefualt}>Choose a color buddy!</p>
            )}
          </div>

          <button className='close_btn_theme' onClick={handleClose}><img src={close} alt='close' /></button>
          <div className='choose_themes'>
            <div className={`color_darkblue themes_btn ${addClass === 'darkblueTheme' ? 'active' : ''}`} onClick={() => handleColorClick('darkblueTheme')}></div>

            <div className={`color_blue themes_btn ${addClass === 'blueTheme' ? 'active' : ''}`} onClick={() => handleColorClick('blueTheme')}></div>
            <div className={`color_orange themes_btn ${addClass === 'orangeTheme' ? 'active' : ''}`} onClick={() => handleColorClick('orangeTheme')}></div>
            <div className={`color_green themes_btn ${addClass === 'greenTheme' ? 'active' : ''}`} onClick={() => handleColorClick('greenTheme')}></div>
            <div className={`color_pink themes_btn ${addClass === 'pinkTheme' ? 'active' : ''}`} onClick={() => handleColorClick('pinkTheme')}></div>
            <div className={`color_purple themes_btn ${addClass === 'purpleTheme' ? 'active' : ''}`} onClick={() => handleColorClick('purpleTheme')}></div>
          </div>


        </div>
      }
    </>
  );
}

export default KidsNav;
