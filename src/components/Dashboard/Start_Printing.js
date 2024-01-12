import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import KidsNav from "../../navbar/kidzNav";
import stany_1 from "../../images/Character/stany(1).png";
import stany_2 from "../../images/Character/stany(2).png";
import stany_3 from "../../images/Character/stany(3).png";
import stefy_1 from "../../images/Character/stefy(1).png";
import stefy_2 from "../../images/Character/stefy(2).png";
import stefy_3 from "../../images/Character/stefy(3).png";
import stefy_4 from "../../images/Character/stefy(4).png";
import stefy_5 from "../../images/Character/stefy(5).png";
import stefy_6 from "../../images/Character/stefy(6).png";
import print from "../../images/print.png";
import Big from "../../images/Sizes/Big.jpg";
import Jumbo from "../../images/Sizes/Jumbo.jpg";
import Larger from "../../images/Sizes/Larger.jpg";
import Medium from "../../images/Sizes/Medium.jpg";
import Normal from "../../images/Sizes/Normal.jpg";


const Start_Printing = () => {
    const navigate = useNavigate();
    const [selectedSize, setSelectedSize] = useState("Big");
    const [start, setStart] = useState(false);
    const characters = [
        stany_1, stany_2, stany_3, stefy_1, stefy_2, stefy_3, stefy_4, stefy_5, stefy_6
    ];

    const [selectedImage, setSelectedImage] = useState(null);


    console.log("selectedSize", selectedSize)
    const handleSizeSelect = (size) => {

        setSelectedSize(size);
    }
    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);

    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handlePrint = () => {
        // navigate("/Print_Select");
        setStart(true);
    };



    return (
        <>
            <div className="kidzdashboard">
                <div className="container-fluids display-table">
                    <KidsNav />
                    {!start && (
                        <div className="main-content">
                            <div className="page_ttls">
                                <div className='kidz_allcharacters_Sr start_printing'>
                                    <div className='kidz_profile_popupsr_inner'>
                                        {characters.map((character, index) => (
                                            <div className="kidz_profile_popupsr_content" onClick={() => openModal(character)}>
                                                <img loading="lazy" src={character} alt={`Character ${index + 1}`} className="modal-image" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {start && (
                        <div className="select_size_main">
                            <div className="main-content">
                                <div className="select_size_mainInner">
                                    <div className="left_content">
                                        <img src={selectedSize === "Big" ? Big : selectedSize === "Jumbo" ? Jumbo : selectedSize === "Larger" ? Larger : selectedSize === "Medium" ? Medium : Normal} alt="room_image" />
                                    </div>
                                    <div className="right_content">
                                        <button className="start_printingBtn"><span>START PRINTING</span></button>

                                        <p>Choose the perfect size for your illustration!</p>
                                        <div className="select_size_bottomBTn">
                                            <div className="bottom_content">
                                            <button className={`normal${selectedSize == "Normal" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Normal") }}><span>NORMAL</span></button>
                                            <button className={`medium${selectedSize == "Medium" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Medium") }}><span>MEDIUM</span></button>
                                            <button className={`big${selectedSize == "Big" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Big") }}><span>BIG</span></button>
                                            <button className={`larger${selectedSize == "Larger" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Larger") }}><span>LARGER</span></button>
                                            <button className={`jumbo${selectedSize == "Jumbo" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Jumbo") }}><span>JUMBO</span></button>
                                            </div>
                                        </div>
                                        <img src={selectedImage} alt="Your_character_image" />
                                    </div>
                                </div>
                                <div className="select_size_bottomBTn">

                                    <div className="bottom_content">
                                        <button className={`normal${selectedSize == "Normal" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Normal") }}><span>NORMAL</span></button>
                                        <button className={`medium${selectedSize == "Medium" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Medium") }}><span>MEDIUM</span></button>
                                        <button className={`big${selectedSize == "Big" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Big") }}><span>BIG</span></button>
                                        <button className={`larger${selectedSize == "Larger" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Larger") }}><span>LARGER</span></button>
                                        <button className={`jumbo${selectedSize == "Jumbo" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Jumbo") }}><span>JUMBO</span></button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    )}

                </div>
            </div>
            {isModalOpen && !start ? (
                <div className="imagepopupdiv modal selected-popup">

                    <div className="modal-content start_printing_popup">
                        <div className="print_btn_strPrint"><button onClick={() => { handlePrint() }}>PRINT</button></div>
                        <span className="close" onClick={closeModal}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F28A35" />
                                <path d="M20.1074 22.3803C21.1535 23.4805 22.8039 21.769 21.7579 20.6444L17.6433 16.3168L21.7579 11.9892C22.8039 10.8889 21.1767 9.15301 20.1074 10.2777L15.9928 14.6053L11.8782 10.2777C10.8321 9.15301 9.18163 10.8889 10.251 11.9892C11.6225 13.4317 12.9708 14.8742 14.3655 16.3168L10.251 20.6444C9.18163 21.7446 10.8321 23.4805 11.8782 22.3803L15.9928 18.0527L20.1074 22.3803Z" fill="white" />
                            </svg>
                        </span>
                        <img loading="lazy" src={selectedImage} alt="" />
                    </div>
                </div>
            ) : (<></>)}
        </> 
    );
};

export default Start_Printing;
