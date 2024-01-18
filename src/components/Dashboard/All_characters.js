import KidsNav from "../../navbar/kidzNav";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import AuthUser from '../AuthUser';

import { Link, json } from "react-router-dom";
import Selected_character from "./Selected_character";
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap";

export default function All_characters() {
  const { token } = AuthUser();
  const [characters,setCharacters]=useState([]);
    useEffect(() => {
    fetchAllcharacters();
     
    }, [])
    
    const fetchAllcharacters = async () => {
       const allCharacters = JSON.parse(localStorage.getItem("All_Characters"));
       if(allCharacters){
        setCharacters(allCharacters);
       } else{
        try {
            const response = await axios.get('https://mykidz.online/api/get-all-characters', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setCharacters(response.data);
            localStorage.setItem("All_Characters",JSON.stringify(response.data));
            console.log("CHARATERS",characters);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
       }
        
      };
    return (
        <>
            <div className="kidzdashboard">
                <div className="container-fluid display-table">
                    <KidsNav />
                    <div className="main-content">
                        <div className="page_ttl">
                            <div className='kidz_allcharacters_Sr'>
                                <div className='kidz_profile_popupsr_inner'>
                                    {characters.map((character) => (
                                        <Link 
                                        to={`/selectedcharacter?id=${character.id}&imagetoken=${character['main-image']}&charname=${character.title}&description=${character.discription}&sliderImages=${character['slider-images']}`}
                                    >
                                        <div className="kidz_profile_popupsr_content">
                                            <img loading="lazy" src={character['main-image']} alt="Selected Image" className="modal-image" />
                                            <h3>{character.title}</h3>
                                        </div>
                                    </Link>
                                    
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}