import React from 'react';
import Logo from '../../images/KIDZCONNECT-1.png';
import { Link } from 'react-router-dom';

const Usertop = () => {
  return (
    <>
      <div className='topbar'>
        <div className="logo"><Link to="/"><img loading="lazy" src={Logo} alt="Description of the image" /></Link></div>
        <div className="switch-dashboard">
          <Link className="active" to="/parent-dashboard" >Parents space</Link>
          <Link className="" to="/kids-listing" >Kids space</Link>
        </div>
      </div>
    </>
  )
}

export default Usertop