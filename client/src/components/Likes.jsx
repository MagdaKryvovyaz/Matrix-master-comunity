import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import UsersLikeList from "./UsersLikeList";
import baseApi from "../API";


const Likes = ({ socket, questionId, userId, length }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);


  useEffect(() => {
    // Fetch question data to determine if user has already liked it
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseApi}/question/${questionId}`
        );
        // console.log(response.data);
        setLikes(response.data.likes);
        response.data.likes.forEach((like) => {
          if (like._id === userId) {
            setLiked(true);
            socket.emit('newLike', {
              userId:   userId,
              questionId: questionId
            })
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId, questionId, liked, socket ]);

  const handleLike = async () => {
    try {
      await axios.post(
        `${baseApi}/question/like/${questionId}/${userId}`
      )
      .then( result => {
        setLikes(result.data.likes);
        setLiked(!liked);
      })
      .catch( err => {
        console.log(err)
      })
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {likes && (
        <div className="d-flex align-items-center justify-content-end gap-2">
          <p className=" fs-4 pt-2 m-0">{likes.length}</p>
          <p className=" p-0 m-0">
            <i className="btn p-0 m-0 fs-4" onClick={handleLike}>
              {liked ? <FaHeart color="#ac3501" /> : <FaRegHeart />}
            </i>
          </p>
        </div>
      )}
      {likes.length > 0 && <UsersLikeList users={likes} />}
      {likes.length < 1 && (
      <>
      <p style={{height: "50px"}}></p>
      </>
      )}
    </>
  );
};

export default Likes;
