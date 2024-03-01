import React from 'react'

import Image1 from '../images/know-children.png';
import Image2 from '../images/Connecting_Parents.png';
export default function GetToKnow() {
    return(
        <section className="get-to-know">
            <div className="container">
                <div className="row">
                    <div className="left-section col-6">
                        <h1>Get to know your child</h1>
                        <p>Get a deeper understanding of your child's world and gain valuable insights into their development, empowering you to nurture their individual growth.</p>
                        <button className='content_btn' type='button'>START FOR FREE</button>
                    </div>
                    <div className="right-section col-6">
                        <img loading="lazy" src={Image1} alt="Description of the" />    
                    </div>
                </div>
                <div className="row section_one_rowtwo">
                    <div className="left-section col-6">
                        <img loading="lazy" src={Image2} alt="Description of the" />    
                    </div>
                    <div className="right-section col-6">
                        <h1>Connecting Parents and Kids</h1>
                        <p><span>We understand the challenges of being an involved parent in today's digital age.</span></p>
                        <p>KidzConnect bridges the gap between parents and kids, creating a safe space for children to explore daily topics and fostering a stronger parent-child bond. Connect with your kids anytime, making every moment the right moment with KidzConnect.</p>
                        <button className='content_btn' type='button'>Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
