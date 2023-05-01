import React from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../API";

export default function UsersLikeList({ users }) {
  const navigate = useNavigate();

  return (
    <div>
      <p
        type="button"
        className="modal-link link-text"
        data-bs-toggle="modal"
        data-bs-target="#likesModal"
      >
        See all users who likes this post
      </p>
      <div
        className="modal fade"
        id="likesModal"
        tabIndex="-1"
        aria-labelledby="likesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="likesModalLabel">
                The following users have liked this question
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
                  <li  data-bs-dismiss="modal" key={id} className="list-group-item liked-user link" onClick={() => navigate(`/profile/${user._id}`)}> 
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <div
                        className="userPicture"
                      >
                        <img
                          data-bs-dismiss="modal"
                          className="img-small"
                          src={`${baseApi}/public/images/${user.imageUrl}`}
                          alt="ptofile"
                        />
                      </div>
                      <div
                        data-bs-dismiss="modal"
                        className="fw-bold fs-5 link link-text"
                      >
                        {user.user}
                      </div>
                    </div>
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
