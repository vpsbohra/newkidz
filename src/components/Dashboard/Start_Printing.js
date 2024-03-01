import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KidsNav from "../../navbar/kidzNav";
import axios from "axios";
import Back from "../../images/BackButton.png";
import { Link } from "react-router-dom";


import balum1 from "../../images/characters/BalumBalum/1.webp";
import balum2 from "../../images/characters/BalumBalum/2.webp";
import balum3 from "../../images/characters/BalumBalum/3.webp";
import balum4 from "../../images/characters/BalumBalum/4.webp";
import balum5 from "../../images/characters/BalumBalum/5.webp";
import balum6 from "../../images/characters/BalumBalum/6.webp";
import balum7 from "../../images/characters/BalumBalum/7.webp";
import balum8 from "../../images/characters/BalumBalum/8.webp";
import balum9 from "../../images/characters/BalumBalum/9.webp";
//git check 
import booboo1 from "../../images/characters/Booboo/1.webp";
import booboo2 from "../../images/characters/Booboo/2.webp";
import booboo3 from "../../images/characters/Booboo/3.webp";
import booboo4 from "../../images/characters/Booboo/4.webp";
import booboo5 from "../../images/characters/Booboo/5.webp";
import booboo6 from "../../images/characters/Booboo/6.webp";
import booboo7 from "../../images/characters/Booboo/7.webp";


import Bradford1 from "../../images/characters/Bradford/1.webp";
import Bradford2 from "../../images/characters/Bradford/2.webp";
import Bradford3 from "../../images/characters/Bradford/3.webp";
import Bradford4 from "../../images/characters/Bradford/4.webp";

import Cindy1 from "../../images/characters/Cindy/1.webp";
import Cindy2 from "../../images/characters/Cindy/2.webp";
import Cindy3 from "../../images/characters/Cindy/3.webp";
import Cindy4 from "../../images/characters/Cindy/4.webp";
import Cindy5 from "../../images/characters/Cindy/5.webp";
import Cindy6 from "../../images/characters/Cindy/6.webp";
import Cindy7 from "../../images/characters/Cindy/7.webp";
import Cindy8 from "../../images/characters/Cindy/8.webp";
import Cindy9 from "../../images/characters/Cindy/9.webp";
import Cindy10 from "../../images/characters/Cindy/10.webp";
import Cindy11 from "../../images/characters/Cindy/11.webp";

import Dad1 from "../../images/characters/Dad/1.webp";
import Dad2 from "../../images/characters/Dad/2.webp";
import Dad3 from "../../images/characters/Dad/3.webp";
import Dad4 from "../../images/characters/Dad/4.webp";
import Dad5 from "../../images/characters/Dad/5.webp";
import Dad6 from "../../images/characters/Dad/6.webp";

import Filoo1 from "../../images/characters/Filoo/1.webp";
import Filoo2 from "../../images/characters/Filoo/2.webp";
import Filoo3 from "../../images/characters/Filoo/3.webp";
import Filoo4 from "../../images/characters/Filoo/4.webp";
import Filoo5 from "../../images/characters/Filoo/5.webp";
import Filoo6 from "../../images/characters/Filoo/6.webp";
import Filoo7 from "../../images/characters/Filoo/7.webp";
import Filoo8 from "../../images/characters/Filoo/8.webp";

import Giovanni1 from "../../images/characters/Giovanni/1.webp";
import Giovanni2 from "../../images/characters/Giovanni/2.webp";
import Giovanni3 from "../../images/characters/Giovanni/3.webp";
import Giovanni4 from "../../images/characters/Giovanni/4.webp";
import Giovanni5 from "../../images/characters/Giovanni/5.webp";
import Giovanni6 from "../../images/characters/Giovanni/6.webp";
import Giovanni7 from "../../images/characters/Giovanni/7.webp";
import Giovanni8 from "../../images/characters/Giovanni/8.webp";
import Giovanni9 from "../../images/characters/Giovanni/9.webp";
import Giovanni10 from "../../images/characters/Giovanni/10.webp";
import Giovanni11 from "../../images/characters/Giovanni/11.webp";

import Gregory1 from "../../images/characters/Gregory/1.webp";
import Gregory2 from "../../images/characters/Gregory/2.webp";
import Gregory3 from "../../images/characters/Gregory/3.webp";
import Gregory4 from "../../images/characters/Gregory/4.webp";
import Gregory5 from "../../images/characters/Gregory/5.webp";
import Gregory6 from "../../images/characters/Gregory/6.webp";
import Gregory7 from "../../images/characters/Gregory/7.webp";


// Kapinga 1-9
import Kapinga1 from "../../images/characters/Kapinga/1.webp";
import Kapinga2 from "../../images/characters/Kapinga/2.webp";
import Kapinga3 from "../../images/characters/Kapinga/3.webp";
import Kapinga4 from "../../images/characters/Kapinga/4.webp";
import Kapinga5 from "../../images/characters/Kapinga/5.webp";
import Kapinga6 from "../../images/characters/Kapinga/6.webp";
import Kapinga7 from "../../images/characters/Kapinga/7.webp";
import Kapinga8 from "../../images/characters/Kapinga/8.webp";
import Kapinga9 from "../../images/characters/Kapinga/9.webp";

// Karima 1-6
import Karima1 from "../../images/characters/Karima/1.webp";
import Karima2 from "../../images/characters/Karima/2.webp";
import Karima3 from "../../images/characters/Karima/3.webp";
import Karima4 from "../../images/characters/Karima/4.webp";
import Karima5 from "../../images/characters/Karima/5.webp";
import Karima6 from "../../images/characters/Karima/6.webp";

// Martin 1-5
import Martin1 from "../../images/characters/Martin/1.webp";
import Martin2 from "../../images/characters/Martin/2.webp";
import Martin3 from "../../images/characters/Martin/3.webp";
import Martin4 from "../../images/characters/Martin/4.webp";
import Martin5 from "../../images/characters/Martin/5.webp";

// Mom 1-9
import Mom1 from "../../images/characters/Mom/1.webp";
import Mom2 from "../../images/characters/Mom/2.webp";
import Mom3 from "../../images/characters/Mom/3.webp";
import Mom4 from "../../images/characters/Mom/4.webp";
import Mom5 from "../../images/characters/Mom/5.webp";
import Mom6 from "../../images/characters/Mom/6.webp";
import Mom7 from "../../images/characters/Mom/7.webp";
import Mom8 from "../../images/characters/Mom/8.webp";
import Mom9 from "../../images/characters/Mom/9.webp";

// Rodrigo 1-10
import Rodrigo1 from "../../images/characters/Rodrigo/1.webp";
import Rodrigo2 from "../../images/characters/Rodrigo/2.webp";
import Rodrigo3 from "../../images/characters/Rodrigo/3.webp";
import Rodrigo4 from "../../images/characters/Rodrigo/4.webp";
import Rodrigo5 from "../../images/characters/Rodrigo/5.webp";
import Rodrigo6 from "../../images/characters/Rodrigo/6.webp";
import Rodrigo7 from "../../images/characters/Rodrigo/7.webp";
import Rodrigo8 from "../../images/characters/Rodrigo/8.webp";
import Rodrigo9 from "../../images/characters/Rodrigo/9.webp";
import Rodrigo10 from "../../images/characters/Rodrigo/10.webp";

// Sheriff 1-5
import Sheriff1 from "../../images/characters/Sheriff/1.webp";
import Sheriff2 from "../../images/characters/Sheriff/2.webp";
import Sheriff3 from "../../images/characters/Sheriff/3.webp";
import Sheriff4 from "../../images/characters/Sheriff/4.webp";
import Sheriff5 from "../../images/characters/Sheriff/5.webp";

// Songa 1-5
import Songa1 from "../../images/characters/Songa/1.webp";
import Songa2 from "../../images/characters/Songa/2.webp";
import Songa3 from "../../images/characters/Songa/3.webp";
import Songa4 from "../../images/characters/Songa/4.webp";
import Songa5 from "../../images/characters/Songa/5.webp";

// Stany 1-6
import Stany1 from "../../images/characters/Stany/1.webp";
import Stany2 from "../../images/characters/Stany/2.webp";
import Stany3 from "../../images/characters/Stany/3.webp";
import Stany4 from "../../images/characters/Stany/4.webp";


// Stephy 1-6
import Stephy1 from "../../images/characters/Stephy/1.webp";
import Stephy2 from "../../images/characters/Stephy/2.webp";
import Stephy3 from "../../images/characters/Stephy/3.webp";
import Stephy4 from "../../images/characters/Stephy/4.webp";
import Stephy5 from "../../images/characters/Stephy/5.webp";
import Stephy6 from "../../images/characters/Stephy/6.webp";

// Stock 1-12
import Stock1 from "../../images/characters/Stock/1.webp";
import Stock2 from "../../images/characters/Stock/2.webp";
import Stock3 from "../../images/characters/Stock/3.webp";
import Stock4 from "../../images/characters/Stock/4.webp";
import Stock5 from "../../images/characters/Stock/5.webp";
import Stock6 from "../../images/characters/Stock/6.webp";
import Stock7 from "../../images/characters/Stock/7.webp";
import Stock8 from "../../images/characters/Stock/8.webp";
import Stock9 from "../../images/characters/Stock/9.webp";
import Stock10 from "../../images/characters/Stock/10.webp";
import Stock11 from "../../images/characters/Stock/11.webp";
import Stock12 from "../../images/characters/Stock/12.webp";


import print from "../../images/print.png";
import Big from "../../images/Sizes/Big.jpg";
import Jumbo from "../../images/Sizes/Jumbo.jpg";
import Larger from "../../images/Sizes/Larger.jpg";
import Medium from "../../images/Sizes/Medium.jpg";
import Normal from "../../images/Sizes/Normal.jpg";
import close from "../../images/Close.png";


const Start_Printing = () => {
    const [selectedSize, setSelectedSize] = useState("big");
    const [start, setStart] = useState(false);
    const [printChartype, setPrintCharType] = useState(true);
    const characters = [
        balum1, balum2, balum3, balum4, balum5, balum6, balum7, balum8, balum9,
        booboo1, booboo2, booboo3, booboo4, booboo5, booboo6, booboo7,
        Bradford1, Bradford2, Bradford3, Bradford4,
        Cindy1, Cindy2, Cindy3, Cindy4, Cindy5, Cindy6, Cindy7, Cindy8, Cindy9, Cindy10, Cindy11,
        Dad1, Dad2, Dad3, Dad4, Dad5, Dad6,
        Filoo1, Filoo2, Filoo3, Filoo4, Filoo5, Filoo6, Filoo7, Filoo8,
        Giovanni1, Giovanni2, Giovanni3, Giovanni4, Giovanni5, Giovanni6, Giovanni7, Giovanni8, Giovanni9, Giovanni10, Giovanni11,
        Gregory1, Gregory2, Gregory3, Gregory4, Gregory5, Gregory6, Gregory7,
        Kapinga1, Kapinga2, Kapinga3, Kapinga4, Kapinga5, Kapinga6, Kapinga7, Kapinga8, Kapinga9,
        Karima1, Karima2, Karima3, Karima4, Karima5, Karima6,
        Martin1, Martin2, Martin3, Martin4, Martin5,
        Mom1, Mom2, Mom3, Mom4, Mom5, Mom6, Mom7, Mom8, Mom9,
        Rodrigo1, Rodrigo2, Rodrigo3, Rodrigo4, Rodrigo5, Rodrigo6, Rodrigo7, Rodrigo8, Rodrigo9, Rodrigo10,
        Sheriff1, Sheriff2, Sheriff3, Sheriff4, Sheriff5,
        Songa1, Songa2, Songa3, Songa4, Songa5,
        Stany1, Stany2, Stany3, Stany4,
        Stephy1, Stephy2, Stephy3, Stephy4, Stephy5, Stephy6,
        Stock1, Stock2, Stock3, Stock4, Stock5, Stock6, Stock7, Stock8, Stock9, Stock10, Stock11, Stock12,
    ];
    const [colored_characters, setColoredCharacters] = useState([]);
    useEffect(() => {
        fetchColoredCharacters();
    }, [])
    const fetchColoredCharacters = async () => {
        try {
            const response = await axios.get(`https://mykidz.online/api/get-all-images`);
            console.log("Response", response);
            const data = response.data;
            setColoredCharacters(data);
            console.log('colored_characters', response.data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };
    const [selectedImage, setSelectedImage] = useState(null);
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
    const openModal = (image, index) => {
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


    const handleColorPrint = () => {
        const printImagesOnPage = (imageUrls) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';

            document.body.appendChild(iframe);

            const printDocument = imageUrls
                .map(imageUrl => `<img src="${imageUrl}" alt="Print">`)
                .join('');

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
                                height: 100vh;
                                object-fit: contain;
                                page-break-before: always;
                            }
                        </style>
                    </head>
                    <body>
                        ${printDocument}
                    </body>
                </html>
            `);

            const lastImage = iframe.contentDocument.querySelector('img:last-child');
            lastImage.onload = () => {
                iframe.contentWindow.print();
                document.body.removeChild(iframe);
            };
        };
        if (selectedSize === 'Normal') {
            printImagesOnPage([selectedImage]);
        } else {
            const selectedImageUrls = colored_characters[imageIndex][selectedSize].split(',').map(url => url.trim());
            printImagesOnPage(selectedImageUrls);
        }
    };
    return (
        <>
            <div className={`kidzdashboard start_printing_pageSr ${start ? 'active_popup' : ""}`} >
                <div className="container-fluids display-table">
                    <KidsNav />
                    <div className="main-content">
                        <div className="page_ttls">
                            <div className="toggle_characters">
                                <span onClick={() => { setPrintCharType(true) }} className={printChartype ? 'active' : ''} >Illustrations</span>
                                <span onClick={() => { setPrintCharType(false) }} className={printChartype ? '' : 'active'} >Coloring Pages</span>
                            </div>
                            <div className={`kidz_allcharacters_Sr start_printing  ${printChartype ? "" : "coloring_acitve"}`}>
                                <div className='kidz_profile_popupsr_inner'>
                                    {printChartype ? (<>
                                        {characters.map((character, index) => (
                                            <div className="kidz_profile_popupsr_content" onClick={() => openModal(character)}>
                                                <img loading="lazy" src={character} alt={`Character ${index + 1}`} className="modal-image" />
                                            </div>
                                        ))}
                                    </>) : (<>
                                        {colored_characters.map((character, index) => (
                                            <div className="kidz_profile_popupsr_content" onClick={() => openModal(character.profile_image, index)}>
                                                <img loading="lazy" src={character.profile_image} alt={`Character ${index + 1}`} className="modal-image" />
                                            </div>
                                        ))}
                                    </>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    {start && (
                        <div className="select_size_main">
                            <img className="close_btn_size" src={close} alt="close" onClick={handleClose} />
                            <div className="main-content">

                                <div className="select_size_mainInner">
                                    <div className="left_content">
                                        <img src={selectedSize === "big" ? Big : selectedSize === "jumbo" ? Jumbo : selectedSize === "larger" ? Larger : selectedSize === "medium" ? Medium : Normal} alt="room_image" />
                                    </div>
                                    <div className="right_content">
                                        <button className="start_printingBtn" onClick={printChartype ? handlePrintMain : handleColorPrint}><span>START PRINTING</span></button>
                                        {printChartype ? (<><p>Choose the perfect size for your illustration!</p></>) : (<><p>Choose the perfect size to color!</p></>)}

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

                </div>
            </div>
            {isModalOpen && !start ? (
                <div className="imagepopupdiv modal selected-popup">

                    <div className="modal-content start_printing_popup">
                        <div className="print_btn_strPrint"><button onClick={() => { handlePrint() }}>PRINT</button></div>
                        <span className="close" onClick={closeModal} >
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
