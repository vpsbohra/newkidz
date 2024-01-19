import React, { useState } from 'react'
import AuthUser from './AuthUser';
import emailjs from 'emailjs-com';
import { Link, Route, useNavigate } from 'react-router-dom';
import mail_sent from '../images/mail_sent.png'
const ForgetPassword = () => {
    const { http, setToken } = AuthUser();
    const navigate = useNavigate();
    const [linkSent, setLinkSent] = useState(false);
    const [email, setEmail] = useState();
    const [error, setError] = useState('');

    const characters = '1234567890qwertyuiopasdfghjklzxcvbnm';
    let randomString = '';

    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
   
    const sendEmail = (formData) => {
        const emailAddress = [email];

        const templateParams = {
            message: `${formData.message}`
        };
        emailAddress.forEach((emailAddress) => {
            templateParams.user_email = emailAddress;

            emailjs
                .send(
                    'service_oa10xs4',
                    'template_spdasds',
                    templateParams,
                    'I8VSSe2ScoovjjwRQ'
                )
                .then(
                    (result) => {
                        setLinkSent(true);
                    },
                    (error) => {
                        console.error('Email error:', error.text);
                    }
                );
        });
    };
    const sendLink = () => {
        http.post('/forgot-password', { email: email, token: randomString }).then((res) => {
            if (res) {
                const origin= window.location.origin;
                const link = `${origin}/ResetPassword?email=${email}&token=${randomString}`;
                const formData = {
                    message: `Here link for password reset for your KidzConnect Account ${link}`,
                };
                sendEmail(formData);
            }
        }).catch((error) => {
            setError('Please enter correct email only')
        });
        
    }
    const backToLogin = () => {
        navigate("/login");
    }
    const signUp = () => {
        navigate("/subscription");
    }

    return (
        <div className="forget_pas_sr">
        <div className="container">
        <div className="outer_forget_main_cnt">
            {!linkSent && (
                <div className="forget_main_cnt">
                    <div className="card login_sr_cnt p-4">
                    <h1 className="text-center mb-3">Forgot Password? </h1>

                    <div className="forget_input_cnt">
                        <h3>Enter your account’s email address and we’ll send you a password reset link.</h3>
                        <input type="email" className="form-control" placeholder='Email' name="email" onChange={(e) => setEmail(e.target.value)} />
                        <button className='send_restLink btn btn-primary mt-4' onClick={sendLink}>SEND RESET LINK</button>
                        <span className="text-danger">{error}</span>
                    </div>
                    <div className="forget_pass_link">
                        <a>Don’t have an account?</a>
                    </div>
                    <button className="forget_pass_sign_up btn btn-primary mt-4" onClick={signUp}>SIGN UP</button>
                </div>
                </div>
            )}
            {linkSent && (
                <div className="forget_email_main_cnt">
                      <div className="card login_sr_cnt p-4">
                    <img src={mail_sent} alt='Email_sent_icon' />
                    <h3>Check Your Email</h3>
                    <div className='email_para_div'>
                        <p>A password reset link has been sent to the email “{email}”, </p>
                        <p>Didn’t get the email? Make sure to check your spam folder.</p>
                        <button className='btn btn-primary mt-4' onClick={backToLogin}>BACK TO LOGIN</button>
                    </div>
                </div>
                </div>
            )}
        </div>
        </div>
        </div>
    )
}
export default ForgetPassword;