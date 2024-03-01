import Topbar from './top';
import React, { useEffect, useState } from 'react';
import AuthUser from './AuthUser';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUpmailverify = () => {
  const [Email, setEmail] = useState('');
  const navigate = useNavigate();
  // const { token } = AuthUser();


  useEffect(() => {
    // Function to extract email from URL
    const getEmailFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const email = params.get('email');
      if (email) {
        console.log('Email:', email); // You can replace console.log with your logic to use the email
        setEmail(email);
      }
    };

    getEmailFromURL(); // Call the function on component mount
  }, []);

  const handleGotItClick = () => {
const token = localStorage.getItem('accesstoken');

    const headers = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const accountData = {
      email:Email,
      account_status: 'active',
    };

    axios.patch(`https://mykidz.online/api/User-account-status-update`, accountData, { headers })
      .then(response => {
        console.log('User updated successfully:', response.data);
        localStorage.setItem('email' , Email );
        navigate('/account-created');
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          console.error(error.response.data.errors);
        } else {
          console.error('Error adding member:', error);
        }
      });
    

  };

  return (
    <>
         <div className='signUpmailverify_pageSr'>

      <Topbar />

      <div className='signUpmailverify'>
        <div className='container'>
          <div className='signUpmailverify_inner'>
            <div className='signUpmailverify_txt'>
              <h1>Thank you for verifying your email!</h1>
            </div>
            <div className='signUpmailverify_btn'>
              <button type="button" className="btn btn-primary mt-4" onClick={()=>handleGotItClick()}  >Log in</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default SignUpmailverify