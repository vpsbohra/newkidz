/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import KidsNav from "../../navbar/kidzNav";
import { Link } from "react-router-dom";
import Back from "../../images/BackButton.png";
import { useLocation } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Big from "../../images/Sizes/Big.jpg";
import Jumbo from "../../images/Sizes/Jumbo.jpg";
import Larger from "../../images/Sizes/Larger.jpg";
import Medium from "../../images/Sizes/Medium.jpg";
import Normal from "../../images/Sizes/Normal.jpg";
import close from "../../images/Close.png";

export default function Selected_character() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const imagetoken = searchParams.get("imagetoken");
    const charname = searchParams.get("charname");
    const description = searchParams.get("description");
    const sliderImagesParam = searchParams.get("sliderImages");
    const sliderImages = sliderImagesParam ? sliderImagesParam.split(",") : [];
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState("big");
    const [start, setStart] = useState(false);
    const [w, setW] = useState(3);
    const [h, setH] = useState(3);
    const [s, setS] = useState(9);
    console.log("selectedSize", selectedSize)
    const handleSizeSelect = (size, w, h, s) => {
        setW(w);
        setH(h);
        setS(s);
        setSelectedSize(size);
    }
    const [imageIndex, setImageIndex] = useState();
    const openModal = (index,image) => {
        setSelectedImage(image);
        setImageIndex(index);
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

    const handleClose = () => {
        setStart(false);
        setIsModalOpen(false);
    }

    const handlePrintMain = () => {
        if (selectedSize === 'Normal') {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            const image = new Image();
            image.src = selectedImage;
            image.onload = () => {
                iframe.contentDocument.write(`
                        <html>
                            <head>
                                <title>Print</title>
                                <style>
                                    body {
                                        margin: 0;
                                        padding: 0;
                                    }
                                    img {
                                        max-width: 100%;
                                        height: 100vh; /* Set the height to fill the viewport */
                                        object-fit: contain; /* Maintain aspect ratio while filling the viewport */
                                        page-break-before: always; /* Ensure each image is on a new page */
                                    }
                                </style>
                            </head>
                            <body>
                                <img src="${selectedImage}" alt="Print">
                            </body>
                        </html>
                    `);

                const printImage = iframe.contentDocument.querySelector('img');
                printImage.onload = () => {
                    iframe.contentWindow.print();
                    document.body.removeChild(iframe);
                };
            };

            document.body.appendChild(iframe);
        }
        else {


            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';

            const image = new Image();
            image.src = selectedImage;

            image.onload = () => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                const pageWidth = image.width; 
                const pageHeight = image.height;

                canvas.width = pageWidth;
                canvas.height = pageHeight;

                context.drawImage(image, 0, 0, image.width, image.height);

                const quadrantWidth = image.width / w;
                const quadrantHeight = image.height / h;

                for (let i = 0; i < s; i++) {
                    const x = (i % w) * quadrantWidth;
                    const y = Math.floor(i / w) * quadrantHeight;
                    const imageData = context.getImageData(x, y, quadrantWidth, quadrantHeight);
                    iframe.contentDocument.write(`
                        <html>
                            <head>
                                <title>Print</title>
                                <style>
                                    body {
                                        margin: 0;
                                        padding: 0;
                                    }
                                    img {
                                        width: 100%;
                                        height: 100%;
                                        object-fit: contain;
                                    }
                                </style>
                            </head>
                            <body>
                                <div style="page-break-before: always;">
                                    <img src="data:image/png;base64,${encodeBase641(imageData)}" alt="Print">
                                </div>
                            </body>
                        </html>
                    `);
                }
                const printImage = iframe.contentDocument.querySelector('img');
                if (printImage) {
                    printImage.onload = () => {
                        iframe.contentWindow.print();
                        document.body.removeChild(iframe);
                    };
                }
            };
            document.body.appendChild(iframe);
        }
    };

    const encodeBase641 = (imageData) => {
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const context = canvas.getContext('2d');
        context.putImageData(imageData, 0, 0);
        return canvas.toDataURL('image/png').split(',')[1];
    };
    const responsiveSettings = [
        {
            breakpoint: 767, // For mobile devices
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1024, // For tablets
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ];
    const settings = {
        // dots: true,
        infinite: true,
        slidesToShow: 3.06,
        slidesToScroll: 1,
        centerMode: true,
        arrows: true,
        centerPadding: '10px',
        responsive: responsiveSettings,
    };
    return (
        <>
            <div className="kidzdashboard selected_character_main_Sr">
                <div className="container-fluid display-table"></div>
                <KidsNav />
                <div className="main-content selected_character_sr">
                {start && (
                        <div className="select_size_main">
                            <img className="close_btn_size" src={close} alt="close" onClick={handleClose} />
                            <div className="main-content">

                                <div className="select_size_mainInner">
                                    <div className="left_content">
                                        <img src={selectedSize === "big" ? Big : selectedSize === "jumbo" ? Jumbo : selectedSize === "larger" ? Larger : selectedSize === "medium" ? Medium : Normal} alt="room_image" />
                                    </div>
                                    <div className="right_content">
                                        <button className="start_printingBtn" onClick={handlePrintMain}><span>START PRINTING</span></button>

                                        <p>Choose the perfect size for your illustration!</p>
                                        <div className="select_size_bottomBTn">
                                            <div className="bottom_content">
                                                <button className={`normal${selectedSize == "Normal" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Normal") }}><span>NORMAL</span></button>
                                                <button className={`medium${selectedSize == "medium" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("medium") }}><span>MEDIUM</span></button>
                                                <button className={`big${selectedSize == "big" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("big") }}><span>BIG</span></button>
                                                <button className={`bigger${selectedSize == "bigger" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("bigger", 5, 4, 20) }}><span>BIGGER</span></button>
                                                <button className={`larger${selectedSize == "larger" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("larger") }}><span>LARGER</span></button>
                                                <button className={`jumbo${selectedSize == "jumbo" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("jumbo") }}><span>JUMBO</span></button>
                                            </div>
                                        </div>
                                        <img src={selectedImage} alt="Your_character_image" />
                                    </div>
                                </div>
                                <div className="select_size_bottomBTn">
                                    <div className="bottom_content">
                                        <button className={`normal${selectedSize == "Normal" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("Normal") }}><span>NORMAL</span></button>
                                        <button className={`medium${selectedSize == "medium" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("medium", 2, 2, 4) }}><span>MEDIUM</span></button>
                                        <button className={`big${selectedSize == "big" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("big", 3, 3, 9) }}><span>BIG</span></button>
                                        <button className={`bigger${selectedSize == "bigger" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("bigger", 5, 4, 20) }}><span>BIGGER</span></button>
                                        <button className={`larger${selectedSize == "larger" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("larger", 6, 6, 36) }}><span>LARGER</span></button>
                                        <button className={`jumbo${selectedSize == "jumbo" ? (' active') : ('')}`} onClick={() => { handleSizeSelect("jumbo", 8, 6, 48) }}><span>JUMBO</span></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                    <div className="selected_character_sr-inr">
                        <Link to='/allcharacters' className="allcharacter_link"><img loading="lazy" src={Back} /><h3>Back</h3></Link>
                    </div>
                    <div className="selected_character_sr_content">
                        <div className="selected_character_left">
                            <img loading="lazy" src={imagetoken} />
                        </div>
                        <div className="selected_character_right selected_character_right_cstm">
                            <div>
                                <h1>{charname}</h1>
                                <p>{description}</p>
                            </div>
                            <div className='slider_mainsr'>
                                <Slider {...settings}>
                                    {sliderImages.map((image, index) => (
                                        <div key={index} className='slide_mainsr' onClick={() => openModal(index , image)}>
                                            <img loading="lazy" src={image} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                {isModalOpen &&  !start ? (
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
                ):(<></>)}
            </div>
        </>
    );
}