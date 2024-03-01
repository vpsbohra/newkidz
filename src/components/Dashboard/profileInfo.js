import React from 'react'
import { useState } from "react";
import Topbar from '../top';
import { getCountries, getCities } from 'countries-cities';
import Select from 'react-select';
import bar from '../../images/bar2.png';
import back from '../../images/backbtnimg.png';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const ProfileInfo = () => {
  const myVariable1 = localStorage.getItem('email');
    const [first_name,setFirstName]=useState();
    const [last_name,setLastName]=useState();
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    const countries = getCountries().map((country) => ({
        value: country,
        label: country,
    }));
    const cities = country ? getCities(country.value).map((city) => ({
        value: city,
        label: city,
    })) : [];
    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption);
        setCity(null);
    };

    const handleCityChange = (selectedOption) => {
        setCity(selectedOption);
    };
    const submitform = async(event) => {
        event.preventDefault();
        console.log(country.value);
        console.log(city.value);
        console.log(first_name);
        console.log(last_name);
    
        const token = localStorage.getItem('accesstoken');
    
        const headers = {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        const accountData = {
            email: myVariable1,
            name: first_name + ' ' + last_name,
            country: country.value,
            city: city.value
        };
    
        try {
            const response = await axios.patch(`https://mykidz.online/api/profile-information`, accountData, { headers });
            console.log('User updated successfully:', response.data);
    
            const response1111 = await axios.get(`https://mykidz.online/api/user/${myVariable1}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response1111.data);
            if (response1111.data) {
                sessionStorage.setItem('user', JSON.stringify(response1111.data));
                navigate('/add-profile');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                console.error(error.response.data.errors);
            } else {
                console.error('Error adding member:', error);
            }
        }
    }
    return (
        <>


        <div className="profile_info profile_all_page">
            <Topbar />
            <div className="container">
           

            <div className="progressbar_Top">
                      <Link className='back_btn_link' to='/account-created'> <img src={back} /><p>Back</p></Link>  
                        <img src={bar} />
                    </div>
                <div className="profile_info_inner">
                    <div className="profile_info_head">
                        <h1>Profile information</h1>
                    </div>
                <form  onSubmit={submitform}>
                    <div className="form-group form-row half_item">
                        <div className="half_item_form col-md-6">
                            <label >First Name*</label>
                            <input type="text" className="form-control" onChange={(e)=>{setFirstName(e.target.value)}} />
                        </div>
                        <div className="half_item_form col-md-6">
                            <label >Last Name*</label>
                            <input type="text" className="form-control" onChange={(e)=>{setLastName(e.target.value)}}  />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Country*</label>
                        <Select className="select_ss form-control"
                            options={countries}
                            onChange={handleCountryChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>City*</label>
                        <Select className="select_ss form-control"
                            options={cities}
                            onChange={handleCityChange}
                        />
                    </div>

                    <div className="profile_info_btn">
                        <button type="submit" className="btn btn-primary">Continue</button>
                    </div>
                </form>
            </div>
            </div>
            </div>
        </>
    )
}

export default ProfileInfo