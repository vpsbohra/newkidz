import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthUser from '../../components/AuthUser';
import protectImg from '../../images/passSet.png';
import show_passwImage from '../../images/show_passw.png';
import show_passwEYEImage from '../../images/show_passwEyeOn.png';
import Topbar  from '../top';
import bar from '../../images/bar1.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AccountCreatedCodeSetup() {
  const [code, setCode] = useState('');
  const [userdetail, setUserdetail] = useState('');
  const navigate = useNavigate();
  
  const myVariable = localStorage.getItem('email');
  const { updateCode } = AuthUser();
  // const { user } = AuthUser();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail =  async () => {
   const token = localStorage.getItem('accesstoken');
    try {
      const response = await axios.get(`https://mykidz.online/api/user/${myVariable}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      // setUserdetail(response);
       
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };



  const handleCodeChange = (e) => {
    const inputValue = e.target.value;
    const maxDigits = 4;

    if (inputValue.length <= maxDigits) {
      setCode(inputValue);
    }
  };
  const handleGetStarted = () => {
    updateCode(code)
      .then((res) => {
        console.log(res);
        navigate('/profileinfo' );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
};
const [imgSrc, setImgSrc] = useState(
    show_passwEYEImage
);

const changeImg = () => {
    if (imgSrc === show_passwEYEImage) {
        setImgSrc(show_passwImage);
    }
    else if (imgSrc === show_passwImage) {
        setImgSrc(show_passwEYEImage);
    }
};
  return (
    <>
      <div className="account_created">
    <Topbar/>
        <div className="container">
        <div className="progressbar_Top single_bar">
           <img src={bar}/>
        </div>

          <div className="account_created_mainsr">
            
            <div className="account_created_header">
              <h1>Welcome</h1>
              <h4>You've successfully created your account!</h4>
            </div>
            <div className="row">
              <div className="account_created_formsr">
                <img loading="lazy" src={protectImg} alt="protected" />
                <p>Create a 4-digit passcode to restrict access to the parental dashboard</p>
                <div class="Password_form_Sr">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Code"
                  onChange={handleCodeChange}
                  value={code}
                  id="code" maxLength={4}
                />
                <img src={imgSrc} onClick={function () { toggleShowPassword(); changeImg() }}></img>

                </div>

                <Link className="continue-code" onClick={handleGetStarted}>
                  LET'S GET STARTED
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
