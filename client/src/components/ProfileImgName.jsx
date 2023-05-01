import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../API";
import { useAuthContext } from "../hooks/useAuthContext";
import socket from "../socket";


export default function ProfileImgName({ profile }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [onlineUsers, setOnlineUsers] = useState([]);
  
  useEffect(() => {
    socket.emit("setup", user);

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    })

    socket.on("user-disconnect", () => {      
      console.log("disconnect from front end")  
      socket.emit("user-disconnect", user);
  });
  }, [user]);

  return (
    <>
      {user && (
        <div
          className="d-flex align-items-center gap-2 mb-2 link"
          onClick={() => navigate(`/profile/${profile._id}`)}
        >
          <div className="userPicture">
            <img
              className="img-small"
              src={`${baseApi}/public/images/${profile.imageUrl}`}
              alt="profile"
            />
          </div>
          <div className="fw-bold fs-4 link-text">
            {profile.user}
            {profile._id === user.id && (
              <small className="fw-light"> (you)</small>
            )}
            {onlineUsers.includes(profile._id) && (
              <small className="text-success"> online</small>
            )}
          </div>
        </div>
      )}
      {!user && (
        <div
        className="d-flex align-items-center gap-2 mb-2 link"
        onClick={() => navigate(`/profile/${profile._id}`)}
      >
        <div className="userPicture">
          <img
            className="img-small"
            src={`${baseApi}/public/images/${profile.imageUrl}`}
            alt="profile"
          />
        </div>
        <div className="fw-bold fs-4 link-text">
          {profile.user}
          {onlineUsers.includes(profile._id) && (
            <small className="text-success"> online</small>
          )}
        </div>
      </div>
      )}
    </>
  );
}
