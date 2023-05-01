import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

import Notification from "./Notification";
import Network from "./Network";
import baseApi from "../API";

export default function Nav({ socket }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [userObj, setUserObj] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`${baseApi}/profile/${user.id}`)
        .then((response) => {
          setUserObj(response.data.user);
        })
        .catch((error) => {
          navigate("/not-found");
        });
    } else {
      setUserObj(undefined);
    }
  }, [user, navigate]);

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-color-1 mb-5 p-1">
      <div className="container container-fluid ">
        <NavLink className="navbar-brand color-1" to="/">
          <div className="d-flex gap-1 justify-content-center align-items-center">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              height="33px"
              alt="Logo"
            />
            <p className="logo-name p-0 m-0">MATRIX MASTER COMMUTITY</p>
          </div>
        </NavLink>
        <div className="nav-link color-2" aria-current="page">
          Welсome{" "}
          {userObj && (
            <b
              className="link color-2"
              onClick={() => navigate(`/profile/${userObj._id}`)}
            >
              {userObj.user}
            </b>
          )}
          !
        </div>
        <button
          className="navbar-toggler btn-outline-secondary btn-lg text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          style={{ justifyContent: "flex-end" }}
          id="navbarNav"
        >
          <ul className="navbar-nav d-flex align-items-center">
            {userObj && (
              <>
                <li className="nav-item color-1" >
                  <Network />
                </li>
                <li>
                  <Notification socket={socket} />
                </li>
                <li className="nav-item me-3  color-1 list-hover" onClick={handleClick}>
                  Logout
                </li>
                <li
                  className="nav-item me-3  color-1 list-hover"
                  onClick={() => navigate(`/profile/${userObj._id}`)}
                >
                  Profile
                </li>
                <div
                  className="link color-1 userPicture"
                  aria-current="page"
                  onClick={() => navigate(`/profile/${userObj._id}`)}
                >
                  <img
                    className="img-small p-0 m-0"
                    src={`${baseApi}/public/images/${userObj.imageUrl}`}
                    alt="ptofile"
                  />
                </div>
              </>
            )}
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link color-1"
                    aria-current="page"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
