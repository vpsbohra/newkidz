import React, { useState } from "react";
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


const Start_Printing = () => {
    const characters = [
        stany_1, stany_2, stany_3, stefy_1, stefy_2, stefy_3, stefy_4, stefy_5, stefy_6
    ];

    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
        setIsModalOpen(false);

    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const handlePrint = () => {
    //     const iframe = document.createElement('iframe');
    //     iframe.style.display = 'none';
    //     iframe.onload = () => {
    //       iframe.contentDocument.write(`
    //         <html>
    //           <head>
    //             <title>Print</title>
    //           </head>
    //           <body>
    //             <img src="${selectedImage}" alt="Print" style="max-width: 100%; height: auto;">
    //           </body>
    //         </html>
    //       `);
    //       const printImage = iframe.contentDocument.querySelector('img');
    //       printImage.onload = () => {
    //         iframe.contentWindow.print();
    //         document.body.removeChild(iframe);
    //       };
    //     };
    //     document.body.appendChild(iframe);
    //   };
    const handlePrint = () => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
    
        iframe.onload = () => {
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
    };
    
      

    return (
        <>
            <div className="kidzdashboard">
                <div className="container-fluids display-table">
                    <KidsNav />
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
                </div>
            </div>
            {isModalOpen && (
                <div className="imagepopupdiv modal selected-popup">
                    
                    <div className="modal-content start_printing_popup">
                    <div className="print_btn_strPrint"><button onClick={handlePrint}>PRINT</button></div>
                        <span className="close" onClick={closeModal}>
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="32" height="32" rx="16" fill="#F28A35" />
                                <path d="M20.1074 22.3803C21.1535 23.4805 22.8039 21.769 21.7579 20.6444L17.6433 16.3168L21.7579 11.9892C22.8039 10.8889 21.1767 9.15301 20.1074 10.2777L15.9928 14.6053L11.8782 10.2777C10.8321 9.15301 9.18163 10.8889 10.251 11.9892C11.6225 13.4317 12.9708 14.8742 14.3655 16.3168L10.251 20.6444C9.18163 21.7446 10.8321 23.4805 11.8782 22.3803L15.9928 18.0527L20.1074 22.3803Z" fill="white" />
                            </svg>
                        </span>
                        <img loading="lazy" src={selectedImage} alt="" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Start_Printing;
