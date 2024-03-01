
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../../components/AuthUser';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import MykidsImage from '../../images/my_kids.png';
import Mykids_clrImage from '../../images/my_kids_clr.png';
import BillingImage from '../../images/Billings-icon.png';
import SettingsImage from '../../images/Settings-icon.png';
import SuggestImage from '../../images/Suggest-Features-icon.png';
import SupportImage from '../../images/Support-icon.png';
import LogoutImage from '../../images/Logout_icon.png';
import BillingImage_b from '../../images/Billings-icon_blue.png';
import MykidsImage_b from '../../images/my_kids_blue.png';
import SettingsImage_b from '../../images/Settings-icon_blue.png';
import SuggestImage_b from '../../images/Suggest-Features-icon_blue.png';
import SupportImage_b from '../../images/Support-icon_blue.png';
import LogoutImage_b from '../../images/Logout_icon_blue.png';
import Billing_whtImage from '../../images/Billings-icon_white.png';
import Settings_whtImage from '../../images/Settings-icon_white.png';
import Suggest_whtImage from '../../images/Suggest-Features-icon_white.png';
import Support_whtImage from '../../images/Support-icon_white.png';
import Menu_toggleImage from '../../images/menu_toggle_sr.png';
import Menu_toggleclosedImage from '../../images/menu_toggle_sr_closed.png';
import ParentHeaderSection from './ParentHeaderSection';
import Settings from './Settings';
import BillingAndSubscription from './BillingAndSubscription';
import SuggestFeatures from './SuggestFeatures';
import Support from './Support';
import PlayButtonAudio from '../../images/PlayAudioVector.png';
import add from '../../images/addchild.png';
import souvenir from '../../images/souvenir.png';
import souvenirwht from '../../images/souvenirwhite.png';
import Profile_icon_dash from '../../images/profile_icon_dash.png';
import Usertop from './Usertop';
import Souvenir from './Souvenir';


const ParentDashboard = () => {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState('');
  const [childProfiles, setChildProfiles] = useState([]);
  const { token, logout } = AuthUser();
  const { user } = AuthUser();
  const [userId, setUserId] = useState(user.id);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [Menu, setMenu] = useState(true);
  const [refreshCurrentlyReading, setRefreshCurrentlyReading] = useState(false);
  const [activeComponent, setActiveComponent] = useState('parentHeaderSection');
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [activeChildIndex, setActiveChildIndex] = useState(0);
  const navigationDiv = document.getElementById('navigation');
  const closedImage = document.querySelector('.menu_toggle_closed');
  const openedImage = document.querySelector('.menu_toggle_open');
  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLiClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleChildSelection = (childProfile) => {
    sessionStorage.setItem("setChildID", childProfile.id);
    sessionStorage.setItem("setChildName", childProfile.child_name);
    setSelectedChild(childProfile);
    handleChildClick(childProfile.id);
    setRefreshCurrentlyReading(!refreshCurrentlyReading);

  };
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  useEffect(() => {

    fetchUserDetail();
    fetchProfileImage();
  }, [localStorage.getItem("childProfilesLocal")]);

  useEffect(() => {
    if (childProfiles.length > 0) {
      const defaultChildId = childProfiles[0].id;
      handleChildSelection(childProfiles[0]);
      setSelectedChildId(defaultChildId);
    }
  }, [childProfiles]);
  const fetchUserDetail = () => {
    setUserdetail(user);
    setUserId(user.id);
    const childProfilesFromLocal = localStorage.getItem("childProfilesLocal");
    if (childProfilesFromLocal) {
      setChildProfiles(JSON.parse(childProfilesFromLocal));
    } else {
      http.get(`/child-profiles?user_id=${userId}`).then((res) => {
        setChildProfiles(res.data);
        localStorage.setItem("childProfilesLocal", JSON.stringify(res.data));
      });

    }

  };
  function renderElement() {
    const x = JSON.parse(sessionStorage.getItem('owner'));
    if (x) {
      if (userdetail) {
        return <p>{userdetail.name.split(' ')[0]}</p>;

      } else {
        return <p>Loading.....</p>;
      }
    } else {
      return <p>{sessionStorage.getItem('userSpouse')}</p>;

    }

  }
  function renderImage() {
    const x = JSON.parse(sessionStorage.getItem('owner'));
    let profileImageSrc = '';

    if (x) {
      if (userdetail) {
        profileImageSrc = `https://mykidz.online/profile_images/${userdetail.profile_image}`;
      }
    } else {
      profileImageSrc = sessionStorage.getItem('memberDp');
    }

    return (
      <div>
        {profileImageSrc && <img loading="lazy" src={profileImageSrc} alt="Profile" />}
      </div>
    );
  }

  const handleChildClick = (childId, userId) => {
    setSelectedChildId(childId, userId);
  };
  const fetchProfileImage = async () => {
    try {
      // Check if user.id is available
      if (user && user.id) {
        const response = await axios.get(`https://mykidz.online/api/get-profile-image/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          responseType: 'blob',
        });

        const imageUrl = URL.createObjectURL(response.data);
        setProfileImage(imageUrl);
      } else {
        console.error('User ID is not available.');
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };
  //code for hiding displaying close open button in responsive for menu and also for hiding menu bar when clicked on any of menus in list
  const handleClose = () => {
    navigationDiv.classList.remove('show');
    closedImage.style.display = 'none';
    openedImage.style.display = "block";
    const btn = document.getElementById("bttna");
    btn.classList.remove('dashboard_menuActive');
  };
  const activeClosebutton = () => {
    const btn = document.getElementById("bttna");
    btn.classList.add('dashboard_menuActive');
    closedImage.style.display = 'block';
    openedImage.style.display = "none";
  }
  const activeOpenbutton = () => {
    closedImage.style.display = 'none';
    openedImage.style.display = "block";
    const btn = document.getElementById("bttna");
    btn.classList.remove('dashboard_menuActive');
  }

  return (
    <>
      <div className="account_created-dash">
        <div className="container-fluid display-table">
          <div className="row display-table-row">
            <Usertop />
            <button id='bttna' className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigations" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"><img loading="lazy" className='menu_toggle_open' src={Menu_toggleImage} alt="Profile" onClick={activeClosebutton} /> <img loading="lazy" className='menu_toggle_closed' src={Menu_toggleclosedImage} alt="Profile" onClick={activeOpenbutton} /></span>
            </button>
            <nav id="navigation" className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="col-md-12 col-sm-12 hidden-xs display-table-cell v-align box collapse navbar-collapse" id="navigations">
                <div className="logo">
                  <Link className='profile_linkdah'>
                    <div className="profile_image">
                      {renderImage()}
                    </div>
                  </Link>
                  <div className='profile_text_dash'>
                    <Link className='text_dash_name' to='/who-are-you'>{renderElement()} <img src={Profile_icon_dash} alt="Profile" /></Link>
                    <span>Parent Space</span>
                  </div>
                </div>
                <div className="navi">
                  <ul className="navi-ul navbar-nav">
                    <li
                      className={`item nav-item  ${activeComponent === 'parentHeaderSection' ? 'active' : ''}`}
                      onClick={() => handleLiClick('parentHeaderSection')}
                    >
                      <Dropdown show={isDropdownOpen} onToggle={handleToggle}>
                        <Dropdown.Toggle variant="light" id="my-kids-dropdown">
                          <img loading="lazy" className='Left_img_clr' src={MykidsImage_b} alt="protected" />
                          <img loading="lazy" className='Left_img_active' src={MykidsImage} alt="protected" />
                          My Kids
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {childProfiles.length > 0 ? (
                            childProfiles.map((childProfile, index) => (
                              <>
                                <Dropdown.Item
                                  key={childProfile.id}
                                  onClick={() => {
                                    handleChildSelection(childProfile);
                                    handleClose();
                                    setActiveChildIndex(index);
                                  }}
                                  className={activeChildIndex === index ? 'activeitemchild' : ''}
                                >
                                  {childProfile.child_name}
                                </Dropdown.Item>
                              </>
                            ))
                          ) : (
                            <Dropdown.Item disabled>No child profiles found.</Dropdown.Item>
                          )}
                          <Link className='addChildPro' to='/create-child-profile'><img src={add} /><span>Add child profile</span></Link>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                    <li
                      className={`item nav-item ${activeComponent === 'Souvenir' ? 'active' : ''}`}
                      onClick={() => {
                        handleLiClick('Souvenir');
                        handleClose();
                      }}
                    >
                      <Link href="#">
                        <span className="hidden-xs hidden-sm"><img loading="lazy" className='Left_img_clr' src={souvenir} alt="protected" /><img loading="lazy" className='Left_img_active' src={souvenirwht} alt="protected" /> Souvenir</span>
                      </Link>
                    </li>
                    <li
                      className={`item nav-item ${activeComponent === 'BillingAndSubscription' ? 'active' : ''}`}
                      onClick={() => {
                        handleLiClick('BillingAndSubscription');
                        handleClose();
                      }}
                    >
                      <Link href="#">
                        <span className="hidden-xs hidden-sm"><img loading="lazy" className='Left_img_clr' src={BillingImage_b} alt="protected" /><img loading="lazy" className='Left_img_active' src={Billing_whtImage} alt="protected" /> Billings and Subscriptions</span>
                      </Link>
                    </li>

                    <li
                      className={`item nav-item ${activeComponent === 'Settings' ? 'active' : ''}`}
                      onClick={() => {
                        handleLiClick('Settings');
                        handleClose();
                      }}
                    >
                      <Link href="#">
                        <span className="hidden-xs hidden-sm"><img loading="lazy" className='Left_img_clr' src={SettingsImage_b} alt="protected" /><img loading="lazy" className='Left_img_active' src={Settings_whtImage} alt="protected" /> Settings</span>
                      </Link>
                    </li>
                    <li
                      className={`item nav-item ${activeComponent === 'SuggestFeatures' ? 'active' : ''}`}
                      onClick={() => {
                        handleLiClick('SuggestFeatures');
                        handleClose();
                      }}
                    >
                      <Link href="#">
                        <span className="hidden-xs hidden-sm"><img loading="lazy" className='Left_img_clr' src={SuggestImage_b} alt="protected" /><img loading="lazy" className='Left_img_active' src={Suggest_whtImage} alt="protected" /> Suggest Features</span>
                      </Link>
                    </li>
                    <li
                      className={`item nav-item ${activeComponent === 'Support' ? 'active' : ''}`}
                      onClick={() => {
                        handleLiClick('Support');
                        handleClose();
                      }}
                    >
                      <Link href="#">
                        <span className="hidden-xs hidden-sm"><img loading="lazy" className='Left_img_clr' src={SupportImage_b} alt="protected" /><img loading="lazy" className='Left_img_active' src={Support_whtImage} alt="protected" /> Support</span>
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link href="#">
                        <span onClick={logoutUser} className="hidden-xs hidden-sm"><img loading="lazy" src={LogoutImage_b} alt="protected" /> Logout</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {activeComponent === 'parentHeaderSection' ? (
              <ParentHeaderSection key={refreshCurrentlyReading ? 'refresh' : 'no-refresh'} childId={selectedChildId} userId={userId} />
            ) : activeComponent === 'Souvenir' ? (
              <Souvenir />
            ) : activeComponent === 'Settings' ? (
              <Settings />
            ) : activeComponent === 'BillingAndSubscription' ? (
              <BillingAndSubscription />
            ) : activeComponent === 'SuggestFeatures' ? (
              <SuggestFeatures handleLiClick={handleLiClick} />
            ) : activeComponent === 'Support' ? (
              <Support />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentDashboard;