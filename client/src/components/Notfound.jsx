import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';

const Notfound = () => {
  return (
    <div className=" container text-center animate__animated animate__fadeIn">
 
    <h1 className="animate__animated animate__bounceIn">Oops! <span className="number-404">404</span></h1>
    <p className="error-message animate__animated animate__fadeIn">Looks like you've stumbled upon a page that doesn't exist.</p>
    <p className="help-message animate__animated animate__fadeIn">But don't worry, you're not lost. Let's get you back!</p>
    <Link to="/" className="btn btn-1 animate__animated animate__fadeIn">Go Home</Link>
    <div className="mt-3 animate__animated animate__shakeX">
      <i className="fas fa-meh-rolling-eyes fa-10x"></i>
    </div>
    <div className="animate__animated animate__fadeInDownBig delay-2s">
      <p className="error-info">Please check your URL or try using our search bar above.</p>
    </div>
    
  </div>
  
  );
};

export default Notfound;
