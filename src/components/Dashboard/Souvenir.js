import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from '../AuthUser';
import axios from 'axios';
import SouvenirPlayer from '../chat/SouvenirPlayer';
import filter from '../../images/filter.png';
import TenBack from '../../images/TenBack.png';
import TenForward from '../../images/Tenforward.png';
import edit from '../../images/editMemo.png';
import view from '../../images/viewallsouvenir.png';
import addimage from '../../images/addimagesouvenir.png';
import Facebook from "../../images/Facebook_Icon.png";
import Whatsapp from "../../images/whatsapp_Icon.png";
import NO_story from '../../images/no_story_img.png'
import Copy from "../../images/Copy_Link.png";
const Souvenir = () => {
    const [toggle, setToggle] = useState(true);
    const [stories, setStories] = useState([]);
    const { token, http } = AuthUser();
    const [audiostate, setAudiostate] = useState(true);
    const [currentlyreading, setCurrentlyreading] = useState();
    const [selectedMember, setMember] = useState([]);
    const [selectedTab, setTab] = useState('fullconversations');
    const link = useState("https://link.kidzconnect.xxxxx");
    const [isCopied, setIsCopied] = useState(false);
    const [childProfiles, setChildProfiles] = useState([]);
    const [highlightDay, setHighlightDay] = useState([]);
    const [savebtn, setSavebtn] = useState(false);
    const [saveimg, setSaveImg] = useState(false);
    const [memo, setMemo] = useState('');
    const [userID, setUserId] = useState();
    const [selectedImage, setSelectedImage] = useState();
    const [selectedMemoIndex, setSelectedMemoIndex] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const userInfo = sessionStorage.getItem('user');
    const userInfoDetail = JSON.parse(userInfo);
    const spouse = userInfoDetail.spouse;
    const userId1 = userInfoDetail.id;
    const [test, setTest] = useState([]);
    const [totalSeconds, setTotalSeconds] = useState(0);

    useEffect(() => {
        fetchStories();
        const children = JSON.parse(sessionStorage.getItem('children'));
        setChildProfiles(children);
        const user = JSON.parse(sessionStorage.getItem('user'));
        setUserId(user.id);
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://mykidz.online/api/messagesActivityData/${userId1}/${spouse}`);
            const messagesFromApi = response.data;
            const audioObjects = [];
            const totalSeconds = {};
            if (Array.isArray(messagesFromApi)) {
                messagesFromApi.forEach(item => {
                    if (item.voice_answer !== null) {
                        const senderProfile = childProfiles.find(profile => profile.id.toString() === item.senderId.toString());
                        const senderName = senderProfile ? senderProfile.child_name : 'child';
                        audioObjects.push({
                            voice_answer: item.voice_answer,
                            question: item.question_voice_answer,
                            seconds: item.total_second,
                            created_at: item.created_at,
                            sender_name: senderName,
                            story_id: item.story_id,
                        });
                        const currentDate = item.created_at.split('T')[0];
                        totalSeconds[currentDate] = (totalSeconds[currentDate] || 0) + item.total_second;
                    }
                });
                const audio = {};
                console.log("AUDIO OBJECTS", audioObjects);
                audioObjects.forEach(obj => {
                    const currentDate = obj.created_at.split('T')[0];
                    if (!audio[currentDate]) {
                        audio[currentDate] = {
                            questions: [],
                            voice_answers: [],
                            seconds: [],
                            sender_name: [],
                            story_id: []
                        };
                    }
                    audio[currentDate].questions.push(obj.question);
                    audio[currentDate].voice_answers.push(obj.voice_answer);
                    audio[currentDate].seconds.push(obj.seconds);
                    audio[currentDate].sender_name.push(obj.sender_name);
                    audio[currentDate].story_id.push(obj.story_id);
                });
                const mergedResponse = Object.entries(audio).map(([date, data]) => ({
                    date,
                    questions: data.questions,
                    voice_answers: data.voice_answers,
                    seconds: data.seconds,
                    sender_name: data.sender_name,
                    story_id: data.story_id,
                }));
                console.log("AUDIO", audio);
                setTest(mergedResponse);
                setHighlightDay(audioObjects);
                setTotalSeconds(totalSeconds);
                // console.log('totalSeconds',totalSeconds);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchStories = async () => {
        const storiesFromLocal = localStorage.getItem('storiesLocal');
        if (storiesFromLocal) {
            setStories(JSON.parse(storiesFromLocal));
        }
        else {
            try {
                const response = await axios.get('https://mykidz.online/api/stories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStories(response.data);
                localStorage.setItem('storiesLocal', JSON.stringify(response.data));
                sessionStorage.setItem("StoryData", response);
            } catch (error) {
                console.error('Error fetching stories:', error);
            }
        }
    };
    const truncateText = (text, maxLength) => {
        const words = text.split(' ');
        if (words.length <= maxLength) {
            return text;
        }
        const truncatedText = words.slice(0, maxLength).join(' ');
        return truncatedText + '...';
    };
    const handleCopyClick = () => {
        const linkInput = document.getElementById("link-input");
        linkInput.select();
        document.execCommand("copy");
        setIsCopied(true);
    };
    const navigate = useNavigate();
    function back() {
        setToggle(true);
        sessionStorage.setItem("TOGGLE", false);
        navigate('/parent-dashboard');
    }
    function formatDate(field) {
        const today = new Date();
        const date = new Date(field);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        let daySuffix = 'th';
        if (day === 1 || day === 21 || day === 31) {
            daySuffix = 'st';
        } else if (day === 2 || day === 22) {
            daySuffix = 'nd';
        } else if (day === 3 || day === 23) {
            daySuffix = 'rd';
        }
        if (today.getDate() == day && today.getMonth() == date.getMonth() && today.getFullYear() == year) {
            return 'Today';
        } else {
            return `${month} ${day}${daySuffix}, ${year}`;
        }
    }
    function focusInput(index) {
        setSavebtn(true);
        setSelectedMemoIndex(index);
        setTimeout(() => {
            document.getElementById(index).focus();
        }, 100);
    }
    const saveMemo = (date) => {
        http.post('https://mykidz.online/api/memo-souvenir', { user_id: userID, child_id: sessionStorage.getItem('setChildID'), date: date, memo: memo }).then((res) => {
            console.log("Success", res.data);
            setSavebtn(false);
        }).catch((error) => {
            console.log("Fail", error);
        });
    }
    const handleImageChange = (e, index) => {
        setSelectedImageIndex(index);
        setSaveImg(true);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const saveImg = (date) => {
        http.post('https://mykidz.online/api/image-souvenir', { user_id: userID, child_id: sessionStorage.getItem('setChildID'), date: date, image: selectedImage }).then((res) => {
            console.log("Success", res.data);
            setSaveImg(false);
        }).catch((error) => {
            console.log("Fail", error);
        });
    }
    return (
        <>
            <div className='right_sidebar_parent'>
                <div className='souvenir_main'>
                    {toggle ? (
                        <>
                            <div className='souvenir_main_inner'>
                                <div className='souvenir_top'>
                                    <div className='souvenir_top_ttl'>
                                        <h1>Your Souvenir</h1>
                                    </div>
                                    <div className='souvenir_filter'>
                                        <button><img src={filter} />Filter by</button>
                                    </div>
                                </div>
                                <div className='souvenir_body'>
                                    {test.slice()
                                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                                        .map((member, index) => (
                                            <div className='souvenir_card' key={index}>
                                                <div className='souvenircard_top'>
                                                    <div className='souvenirtitle' >{formatDate(member.date)}</div>
                                                    <div className='souvenircardViewAll'>
                                                        <button onClick={() => { setCurrentlyreading(member.story_id[0]); setToggle(false); setMember(member.sender_name); }}> View all <img src={view} /></button>
                                                    </div>
                                                </div>
                                                <SouvenirPlayer
                                                    key={index}
                                                    name={member.sender_name}
                                                    audioText={member.questions}
                                                    audio={member.voice_answers}
                                                    seconds={totalSeconds[member.date]}
                                                />
                                                <div className='card_bottom'>
                                                    <div className='memo'>
                                                        <div className='memo_top'>
                                                            <p>Memo</p>
                                                            {selectedMemoIndex === index && savebtn ? (<><p style={{ cursor: 'pointer' }} onClick={() => saveMemo(formatDate(member.date))}>Save</p></>) : (<><img src={edit} onClick={() => { focusInput(index) }} /></>)}
                                                        </div>
                                                        <div className='memo_description'>
                                                            <textarea id={index} onChange={(e) => { setMemo(e.target.value) }} placeholder={member.memoText ? '' : 'Write a future memory..'} disabled={savebtn ? false : true}></textarea>
                                                        </div>
                                                    </div>
                                                    <div className='add_image' style={{ position: 'relative' }}>
                                                        <input type='file' accept="image/png, image/jpeg" style={{ position: 'absolute', top: 0, left: 0, opacity: 0, width: '100%', height: '100%', zIndex: 1, cursor: 'pointer' }} onChange={(e) => { handleImageChange(e, index) }} />
                                                        <img src={addimage} style={{ zIndex: 0 }} />
                                                    </div>
                                                    {selectedImageIndex === index && saveimg && (<><p style={{ cursor: 'pointer' }} onClick={() => { saveImg(formatDate(member.date)) }}>save</p></>)}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div></>) : (<>
                                <div className='currently_reading_date'>
                                    <div className='currently_reading_date_inner'>
                                        <Link onClick={back}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6 8L2 12L6 16" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M2 12H22" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>Go back to your Souvenir</Link>
                                    </div>
                                    <h2>{selectedMember[0]} Read</h2>
                                </div>
                                <div className='top_currently_parent'>
                                    <div className='inner-container'>
                                        {currentlyreading !== null ? (<>
                                            {stories.map((story, index) => (
                                                <>
                                                    {story.id == currentlyreading && (
                                                        <>
                                                            <div className='inner-container-left'>
                                                                <img loading="lazy" src={story.image_path} alt='Story' width={137} height={137} />
                                                            </div>
                                                            <div className='inner-container-right'>
                                                                <h4>{story.title}</h4>
                                                                <p>{truncateText(story.description, 15)}</p>
                                                                <div className='Currently_Reading_right'>
                                                                    <Link className='Currently_Reading_btn'>
                                                                        <button>
                                                                            {audiostate ? (
                                                                                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <circle cx="16.5" cy="16" r="16" fill="#00897B" />
                                                                                    <path d="M20.6886 13.7671L14.5743 10.27C14.2728 10.0932 13.9295 10 13.58 10C13.2305 10 12.8872 10.0932 12.5857 10.27C12.2542 10.4745 11.9804 10.7603 11.7904 11.1004C11.6004 11.4404 11.5004 11.8233 11.5 12.2129V19.2071C11.5004 19.5967 11.6004 19.9796 11.7904 20.3196C11.9804 20.6597 12.2542 20.9455 12.5857 21.15C12.8864 21.3293 13.2299 21.4241 13.58 21.4243C13.9283 21.4223 14.2705 21.3318 14.5743 21.1614L20.6886 17.6757C21.0244 17.472 21.3021 17.1851 21.4949 16.8428C21.6876 16.5005 21.7888 16.1143 21.7888 15.7214C21.7888 15.3286 21.6876 14.9424 21.4949 14.6001C21.3021 14.2578 21.0244 13.9709 20.6886 13.7671ZM13.8314 18.99V12.4529L19.6029 15.7214L13.8314 18.99Z" fill="white" />
                                                                                </svg>
                                                                            ) : (
                                                                                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M16.4998 29.3337C23.8636 29.3337 29.8332 23.3641 29.8332 16.0003C29.8332 8.63653 23.8636 2.66699 16.4998 2.66699C9.13604 2.66699 3.1665 8.63653 3.1665 16.0003C3.1665 23.3641 9.13604 29.3337 16.4998 29.3337Z" stroke="#00897B" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <path d="M13.8335 20V12" stroke="#00897B" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                                                                                    <path d="M19.1665 20V12" stroke="#00897B" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round" />
                                                                                </svg>
                                                                            )}
                                                                            Play Story
                                                                        </button>
                                                                    </Link>
                                                                    <Link to="/openbook" className='Currently_Reading_btn Currently_Reading_btnsecnd'>
                                                                        <button>Read Story</button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </>
                                            ))}
                                        </>
                                        ) : (
                                            <div className='no_story'>
                                                <img src={NO_story} />
                                                <p>No read story yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='top_interactions_parent'>
                                    <div className='top_interactions_parent_inner'>
                                        <div className='main_heading'>
                                            <h3>Conversations and Souvenirs</h3>
                                            <nav class="nav">
                                                <a className={`nav-link ${selectedTab == 'fullconversations' ? 'active' : ''}`} onClick={() => { setTab('fullconversations') }} >Full Conversation</a>
                                                <a className={`nav-link ${selectedTab == 'individualmoments' ? 'active' : ''}`} onClick={() => { setTab('individualmoments') }}>Individual Moments</a>
                                                <a className={`nav-link ${selectedTab == 'images' ? 'active' : ''}`} onClick={() => { setTab('images') }}>Images</a>
                                                <a className={`nav-link ${selectedTab == 'memos' ? 'active' : ''}`} onClick={() => { setTab('memos') }}>Memos</a>
                                            </nav>
                                            <div className='fullconver_chat'>
                                                {selectedTab == 'fullconversations' && (<>
                                                    <div className='souvenir_read_tabs_fullconversation'>
                                                        <div className="audio_fullcon audio_fullcon-cstm">
                                                            <div className='audio_fullcon_image'>
                                                            </div>
                                                            <div className='audio_fullcon_content'><div className="sliding-text-container">
                                                                <p>Lorem ipsum dolor sit amet consectetur. Vestibulum donec ac lacus nam purus...</p>
                                                            </div>
                                                                <div className="audio-player" id="audio">
                                                                    <div className="audio-player_inner">
                                                                        <img loading="lazy" src={TenBack} />
                                                                        <div className="play-pause-btn" ></div>
                                                                        <img loading="lazy" src={TenForward} />
                                                                    </div>
                                                                    <div className="progress-bar">
                                                                        <input type="range" min="0" max="100" step="1" readOnly />
                                                                        <div className="time-display">
                                                                            <span>0:00/0:00</span>
                                                                        </div>
                                                                    </div>
                                                                    <audio className="audio" id="src" src='' controls style={{ display: 'none' }} />
                                                                </div></div>
                                                        </div>
                                                        <div className="social_icons_outer">
                                                            <h3>Share your memory</h3>
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
                                                    </div>
                                                </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Souvenir