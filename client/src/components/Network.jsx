import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../API";
import ProfileImgName from "./ProfileImgName";

function Network() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseApi}/users`)
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <p
        type="button"
        className="list-hover modal-link m-0 p-0 d-flex justife-content-center align-items-center gap-2"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            fillRule="evenodd"
            d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87z"
          />
          <circle cx="9" cy="8" r="4" fill="white" fillRule="evenodd" />
          <path
            fill="white"
            fillRule="evenodd"
            d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zm-6 1c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
          />{" "}
        </svg>
        <span className=" color-1">Network</span>
      </p>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Our Community:
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div>
              <ul className="list-group liked-list">
                {users.map((user, id) => (
                  <li
                    data-bs-dismiss="modal"
                    key={id}
                    className="list-group-item liked-user link"
                    onClick={() => navigate(`/profile/${user._id}`)}
                  >
                    <ProfileImgName profile={user} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-1"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Network;
