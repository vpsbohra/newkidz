import { Link } from 'react-router-dom';
import React from 'react';
import Topbar from '../top';
import bar from '../../images/bar5.png';
import back from '../../images/backbtnimg.png';

const done = () => {
  return (
    <>
      <div class="done_page profile_all_page">
        <Topbar />
        <div class="done_page_inner">
          <div className="container">
            <div className="progressbar_Top">
              <Link to='/create-child-profile' className='back_btn_link' > <img src={back} /><p>Back</p></Link>
              <img src={bar} />
            </div>
            <div className="done_body">
              <h1>You’re all set!</h1>
              <Link to ='/Login' className="confirm" >Complete</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default done