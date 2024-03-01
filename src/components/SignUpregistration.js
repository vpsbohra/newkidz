import React from 'react'
import Topbar from './top';
import mailimg from '../images/registrationmail.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';

const SignUpregistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const myVariable = location.state.email;

const sendEmail = () => {
    const emailAddresses = myVariable; //PLEASE ENTER YOUR EMAIL ID HERE

    const templateParams = { 
        message: `Please verify your email address ${myVariable}. Please click on the link to verify your email address: 'https://dev.kidzconnect.online/mailverification?email=${myVariable}'` 
    };
        templateParams.user_email = emailAddresses;

        emailjs
            .send(
                'service_oa10xs4',
                'template_spdasds',
                templateParams,
                'I8VSSe2ScoovjjwRQ',
                { isHtml: true }
            )
            .then(
                (result) => {
                    console.log(templateParams);
                    console.log('Email sent:', result.text);
                    window.location.href = 'https://mail.google.com/mail/u/0/#inbox';
                },
                (error) => {
                    console.error('Email error:', error.text);
                }
            );
};
    return (
        <>
         <div className='signupregistration_pageSr'>
            <Topbar />
            <div className='signupregistration'>
                <div className='container'>
                    <div className='signupregistration_inner'>
                    <div className='signupregistration_body'>
                <img src={mailimg} />
                <h1>Complete your registration</h1>
                <p>A confirmation email has been sent to “{myVariable}” </p>
                <p>Didn’t get the email? Make sure to check your spam folder.</p>
                </div>
                <div className="signupregistration_btn">
                    <button  className="btn btn-primary " onClick={()=>sendEmail()}>Verify your email address</button>
                </div>
                    </div>
                </div>
                
            </div>
        </div>

        </>
    )
}

export default SignUpregistration