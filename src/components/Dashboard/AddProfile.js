/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation , useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Plus from "../../images/Circle Plus.png";
import axios from 'axios';
import close_iconImage from '../../images/close_icon_sr.png';
import bar from '../../images/bar3.png';
import back from '../../images/backbtnimg.png';
import profileimg from '../../images/profileimg.png';
import ForwardPopup from './forward_Popup';
import AuthUser from '../AuthUser';
import Topbar from '../top';


export default function DashboardAddprofile() {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [username, setUsername] = useState(null);
  const [currentPlan, setCurrentPlan] = useState('');
  // const [currenBilling, setCurrentBilling] = useState('');
  const [userId, setUserId] = useState('');
  const [member, isMember] = useState(false);
  const { token } = AuthUser();
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});
  const [payments, setPayments] = useState([]);
  const [addMemberSuccess, setAddMemberSuccess] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showMember, setShowMember] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showForwardPopup, setForwardPopup] = useState(false);
  const navigate = useNavigate()

  const removeBodyClass = () => {
    document.body.classList.remove('popup_active');
  };



  const fetchMembers = async () => {
    try {
      const response = await axios.get(`https://mykidz.online/api/members/${userId}`);
      const membersData = response.data;
      console.log("respone", response.data);
      setMembers(membersData);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    console.log(storedUser);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name);
      console.log(user.name);
      if (user.spouse) {
        setSelectedItem(user.spouse);
      }
    }
    const userInformation = sessionStorage.getItem('user');
    const user = JSON.parse(userInformation);
    const { id } = user;
    setUserId(id);
    fetchMembers();
  }, []);
  const handleCloseForwardPopup = () => {
    setForwardPopup(false);
    removeBodyClass();
  };
  const handleClick = (itemName) => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const updatedUser = { ...user, spouse: itemName };
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
      setSelectedItem(itemName);
    }
  };
  const handleAddMember = () => {
    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const firstName = document.getElementsByName('fname')[0].value;
    const lastName = document.getElementsByName('lname')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const phone = document.getElementsByName('phone')[0].value;
    setMemberName(firstName);
    const memberData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      user_id: userId,
    };
    axios.post('https://mykidz.online/api/add-member', memberData, { headers })
      .then(response => {
        console.log('Member added successfully:', response.data);
        // isMember(false);
        setErrors({});
        setAddMemberSuccess(true);
        fetchMembers();
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          console.error('Error adding member:', error);
        }
      });
    fetchMembers();
  };
  function close() {
    setAddMemberSuccess(false);
    isMember(false);
    setShowPopup(false);
    setShowMember(false);

  }

  const [toggle ,setToggle]=useState(true);
  
  function backProfile(){
    if(toggle){
      navigate('/profileinfo');
    } else{
      setToggle(true);
    }
  }

  return (
    <>
      <div class="account_created-dash add_profile_page profile_all_page">
        <Topbar />
        <div className="who-are-you_inner">
          <div className="container">
            <div className="progressbar_Top">
                  <span onClick={()=>{backProfile()}} className='back_btn_link' > <img src={back} /><p>Back</p></span>  
                  <img src={bar} />
              </div>
            <div className={`row addprofile_row ${toggle?'':'profile_memAdd'}`} >
            {toggle ?(<>
              <div className={`item-who-are-you profile_type_two col-md-4 ${selectedItem === 'Pierre' ? 'selected' : ''}`} onClick={() => handleClick(username.split(" ")[0])} >
                <Link to="/create-child-profile" name="Pierre">
                  <span className='profile_type_letter'>{username ? username.charAt(0) : ''}</span> {username}
                </Link>
              </div>
             {members.map((member) => (
                <div className={`item-who-are-you profile_type_two col-md-4 ${selectedItem === 'Pierre' ? 'selected' : ''}`} onClick={() => handleClick(username.split(" ")[0])} >
                  <Link to="/create-child-profile" name="Pierre">
                    <span className='profile_type_letter'>{member.first_name ? member.first_name.charAt(0) : ''}</span> {member.first_name}
                  </Link>
                </div>
              ))}
              <div className={`col-md-4 profilAddNew `} onClick={() => setToggle(false)}  >
                <span className='profile_type_letter'><img loading="lazy" src={Plus} /></span> <p style={{
                  color: '#F28A35',
                }}>Add New</p>
              </div>
              </>):(<>
          <div className='addProfile_formMem'>
            <div className='addProfile_img'>
              <img src={profileimg}></img>
            </div>
            <div className='addProfile_form'>
              <h1>Add Profile</h1>
              <form>
                <div className='addProfile_form_items'>
                  <label>Name</label>
                  <input type='text'/>
                </div>
                <div className='addProfile_form_btnCnrl'>
                  <button className='addProfile_form_cancel'>Cancel</button>
                  <button className='addProfile_form_confirm'>Confirm</button>
                </div>
              </form>
            </div>
          </div>
          
          </>)}
              
              {/* {member && (
                <div className="password-update">
                  <button className='closed_popup_password' onClick={close}><img loading="lazy" src={close_iconImage} alt="protected" /></button>
                  <div className="add-member">
                    {addMemberSuccess ? (
                      <div className="success">
                        {memberName} has been successfully added!
                      </div>
                    ) : (
                      <>
                        <div className="add-member">
                          <h2>Add a Member</h2>
                          <div className="form-group">
                            <label>First Name*</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                              name="fname"
                            />
                            {errors && errors.first_name && (
                              <p className="error-message">{errors.first_name}</p>
                            )}
                          </div>
                          <div className="form-group">
                            <label>Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Name"
                              name="lname"
                            />
                            {errors && errors.last_name && (
                              <p className="error-message">{errors.last_name}</p>
                            )}
                          </div>
                          <div className="form-group">
                            <label>Email*</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter email address"
                              name="email"
                            />
                            {errors && errors.email && (
                              <p className="error-message">{errors.email}</p>
                            )}
                          </div>
                          <div className="form-group">
                            <label>Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter phone number"
                              name="phone"
                            />
                            {errors && errors.phone && (
                              <p className="error-message">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                        <div className="form-group payment_btn_lastoption">
                          <button onClick={handleAddMember} className='add_paymentplan'>Add member</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )} */}
              
            </div>
            {toggle && (<> <div className="addProfile_btn">
            <Link to='/create-child-profile'>
            <button  className="btn btn-primary">Continue</button>
            </Link>
          </div></>)}
           
          </div>
         
        </div>
      </div>
    </>
  );
}
