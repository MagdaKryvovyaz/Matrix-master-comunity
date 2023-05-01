import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { useMediaQuery } from 'react-responsive';


function LogSignUp() {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 900px)' });
  const [showLogin, setShowLogin] = useState(true);

  const handleSignupClick = () => {
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <>
      {isSmallScreen ? (
        <div className="container">
          {showLogin ? (
            <div className="row justify-content-center">
              <div className="col-6 ">
                <Login />
                <div className="mt-3 text-center">
                  <p className="text-muted">
                    Don't have an account?{' '}
                    <span className="icon-signup" onClick={handleSignupClick}>
                      <br/><b>Sign up now</b>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-6">
                <Signup />
                <div className="mt-3 text-center">
                  <p className="text-muted">
                    Already have an account?{' '}
                    <span className="icon-signup" onClick={handleLoginClick}>
                    <br/><b>Login</b>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="container d-flex flex-row justify-content-around">
          <Login />
          <Signup />
          
          
        </div>
      )}
    </>
  );
}

export default LogSignUp;
