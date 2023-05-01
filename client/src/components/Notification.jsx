import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaHeart } from "react-icons/fa";
import { BsChatDots } from "react-icons/bs";
import { Modal } from "react-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import baseApi from "../API";

function Notification({ socket }) {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuthContext();

  const fetchNotifications = useCallback(async () => {
    try {
      if (user) {
        const response = await axios.get(
          `${baseApi}/notifications/${user.id}?seen=false`
        );
        setNotifications(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    fetchNotifications();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      socket.off("notification");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, fetchNotifications, socket, user]);

  useEffect(() => {
    socket.on("notification", (data) => {
      fetchNotifications();
    });
  }, [fetchNotifications, socket]);

  const markNotificationsAsSeen = async () => {
    try {
      // First update the notifications array in the state to mark them as seen
      setNotifications((notifications) =>
        notifications.map((notification) => ({ ...notification, seen: true }))
      );
      // Then send the PUT request to the server to mark them as seen
      await axios.put(`${baseApi}/notifications/${user.id}/seen`);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleDropdownToggle = () => {
  //   setShowDropdown(!showDropdown);
  // };

  const handleModalToggle = async () => {
    setShowDropdown(!showDropdown);
    await markNotificationsAsSeen();
    setShowModal(!showModal);
  };

  return (
    <div className="notification-container">
      <div className="notification-card">
        <div
          className="notification-icon-container"
          onClick={handleModalToggle}
        >
          <div className="your-news color-2">Your News</div>
          <FaBell style={{ color: "white" }} className="notification-icon" />
          {notifications.filter((notification) => !notification.seen)?.length >
            0 && (
            <div className="notification-badge">
              {
                notifications.filter((notification) => !notification.seen)
                  ?.length
              }
            </div>
          )}
          {showModal && (
            <Modal
              className="modalView"
              show={showModal}
              onHide={handleModalToggle}
              aria-labelledby="notifications-modal"
            >
              <Modal.Header closeButton className="modal-header">
                <Modal.Title>
                  {" "}
                  <h3 id="notifications-modal">Notifications </h3>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="overflow-auto" style={{ height: "300px" }}>
                {notifications.slice(0, 20).map((notification) => (
                  <div
                    className="notification seen"
                    key={notification._id}
                    data-bs-spy="scroll"
                  >
                    <p>
                      {notification.type === "like" ? (
                        <FaHeart className="notification-like-icon" />
                      ) : (
                        <BsChatDots className="notification-comment-icon" />
                      )}{" "}
                      <span> </span>
                      <span className="tools-used-link" id="notifiation-user">
                        {" "}
                        <b
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/profile/${notification.fromUser._id}`);
                          }}
                        >
                          {" "}
                          {notification.fromUser.user}{" "}
                        </b>{" "}
                      </span>
                      {notification.type === "like" ? "liked" : "commented on"}{" "}
                      your question{" "}
                      <b
                        className="notification-link tools-used-link"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/question/${notification.question._id}`);
                        }}
                      >
                        "{notification.question?.title}"{" "}
                      </b>
                    </p>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <div className="notification">
                    <p>No new notifications</p>
                  </div>
                )}
              </Modal.Body>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
