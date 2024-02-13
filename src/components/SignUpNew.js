import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import TopBar from './top';
import parentimg from '../images/asparent.png';
import institutionimg from '../images/asinstitution.png';
import show_passwImage from '../images/show_passw.png';
import show_passwEYEImage from '../images/show_passwEyeOn.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuthLogin from './GoogleAuthLogin';
import FBImage from '../images/fb_icon.png';
import AppleImage from '../images/apple_icon.png';
import axios from 'axios';
import AuthUser from './AuthUser';

const SignUpNew = () => {
    const [mainScreen, setMainscreen] = useState(true);
    const [parentForm, setParentForm] = useState(false);
    const [errors, setErrors] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [imgSrc, setImgSrc] = useState(show_passwEYEImage);
    const [error, setError] = useState(false);
    const {http,setToken} = AuthUser();
    const navigate = useNavigate();
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const changeImg = () => {
        if (imgSrc === show_passwEYEImage) {
            setImgSrc(show_passwImage);
        }
        else if (imgSrc === show_passwImage) {
            setImgSrc(show_passwEYEImage);
        }
    };
    const submitForm = async (event) =>  {
        event.preventDefault();
        
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          };
          const email = document.getElementById('parentemail').value;
        const password = document.getElementById('parentpwd').value;

        const data = {
            email: email,
            password: password,
          };

        const response = await axios.post('https://mykidz.online/api/register', {  email: email, password: password }, { headers: headers })
        .then((res) => {
          const { access_token, user } = res.data;
           localStorage.setItem('accesstoken' , access_token )
             navigate('/SignUpregistration' , { state: { email } });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            const errors = error.response.data.errors;
          } else {
            // console.log(error.response.data.message);
          }
        });
    }
    return (
        <>
<div className="SignUpNew_Page">
            <TopBar />
            <div className='SignUpNew'>
                <div className="container">
                    <div className='SignUpNew_inner'>
                        {mainScreen ? (<>
                            <div className='SignUpNew_opt'>
                                <div className='SignUpNew_opt_item SignUpNew_parent' onClick={() => { setMainscreen(false); setParentForm(true) }}>
                                    <img src={parentimg} />
                                    <p >As a Parent</p>
                                </div>
                                <div className='SignUpNew_opt_item SignUpNew_institution' onClick={() => { setMainscreen(false); setParentForm(false) }}>
                                    <img src={institutionimg} />
                                    <p >As an Institution</p>
                                </div>
                            </div>
                            <div className='SignUpNew_community'>
                                <p>Join a community</p>
                            </div>
                            <div className='SignUpNew_bottom '>
                                <p>Already have an account?</p>
                                <Link to='/login'><button className="btn btn-primary mt-4" type='button'>Log In</button></Link>
                            </div>
                        </>) : (<>
                            <div className="Signup_form">
                                <div className="Signup_form_opt">
                                    <h1>Create account</h1>
                                    <div className="SignupForm_Toggle">
                                        <div className={`SignupForm_toggle Signupform_parent ${parentForm?'active':''}`} onClick={() => { setParentForm(true) }}>As a Parent</div>
                                         <div className={`SignupForm_toggle  Signupform_institution ${parentForm?'':'active'}`} onClick={() => { setParentForm(false) }}>As an Institution</div>
                                    </div>
                                </div>
                                {parentForm ? (<>
                                    <form className="SignupFormMain SignUpNew_parentForm" onSubmit={submitForm}>
                                        <div className="form-group">
                                            <label>Email address:</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter email"
                                                id="parentemail"
                                            />
                                            {errors && errors.email && (
                                                <span className="text-danger">{errors.email[0]}</span>
                                            )}
                                        </div>
                                        <div className="form-group mt-3 Password_form_sr">
                                            <label>Password:</label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                placeholder="Enter password"
                                                id="parentpwd"
                                            />
                                            {errors && errors.password && (
                                                <span className="text-danger">{errors.password[0]}</span>
                                            )}
                                            <span className="show_passw_btn" onClick={function () { toggleShowPassword(); changeImg() }}>
                                                {showPassword ? 'hide' : 'show'}<img loading="lazy" src={imgSrc} alt="meet-character-1" />
                                            </span>
                                            <span className={error ? 'actveError' : 'deactiveError'}>Please enter correct Email or Password</span>
                                        </div>
                                        <div className="SignUpNew_parentForm_bottom">
                                            <p><input type="checkbox" class="ch" id="rememberCheck"/> <span>I agree to KidzConnect <a>Terms of Use</a> and <a>Privacy Policy</a></span></p>
                                            <button type="submit" className="btn btn-primary">Create account with email</button>
                                        </div>
                                    </form>

                                </>) : (<>
                                    <form className=" SignupFormMain SignUpNew_institutionForm" onSubmit={submitForm}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label >First Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label >Last Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label >Email address</label>
                                            <input type="email" className="form-control" />
                                        </div>
                                        <div className="form-group mt-3 Password_form_sr">
                                            <label>Password:</label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="form-control"
                                                placeholder="Enter password"
                                                id="pwd"
                                            />
                                            {errors && errors.password && (
                                                <span className="text-danger">{errors.password[0]}</span>
                                            )}
                                            <span className="show_passw_btn" onClick={function () { toggleShowPassword(); changeImg() }}>
                                                {showPassword ? 'hide' : 'show'}<img loading="lazy" src={imgSrc} alt="meet-character-1" />
                                            </span>
                                            <span className={error ? 'actveError' : 'deactiveError'}>Please enter correct Email or Password</span>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label >School Name</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label >Grade Taught</label>
                                                <select class="form-control" id="exampleFormControlSelect1">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="SignUpNew_parentForm_bottom">
                                            <p><input type="checkbox" class="ch" id="rememberCheck"/> <span>I agree to KidzConnect <a>Terms of Use</a> and <a>Privacy Policy</a></span></p>
                                            <button type="submit" className="btn btn-primary">Create account with email</button>
                                        </div>
                                    </form>

                                </>)}
                                <div className="form-group mt-3 or_text">
                                    <span>OR</span>
                                </div>
                                <div className="form-group login_with_btncnrl mt-3">
                                    <GoogleOAuthProvider clientId="211892139032-031hag3n8u2u3m1s39nhpjjrauakc32k.apps.googleusercontent.com">
                                        <GoogleAuthLogin />
                                    </GoogleOAuthProvider>
                                    <button type="button" className="login-with-facebook-btn" >
                                        <img loading="lazy" src={FBImage} alt="meet-character-1" /> Sign in with Facebook
                                    </button>
                                    <button type="button" className="login-with-apple-btn" >
                                        <img loading="lazy" src={AppleImage} alt="meet-character-1" /> Sign in with Apple
                                    </button>
                                </div>
                            </div>

                        </>)}
                    </div>
                </div>


            </div>
            </div>
        </>
    )
}

export default SignUpNew