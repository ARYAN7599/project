import React from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/data.css"
import error from "../image/error.svg"

function Error() {

  const navigate = useNavigate();
  const handleClick = () => navigate('/');

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className='col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12'>
          <div className='error-image text-center mt-5'>
            <img src={ error } alt="error" />
          </div>
          <div className='text-center mb-5'>
            <button type="button" onClick={handleClick} >Go To Home</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error