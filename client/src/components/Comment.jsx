    import React, { useState } from "react";
    import axios from "axios";
    import { useAuthContext } from "../hooks/useAuthContext";
    import CommentList from "./CommentList";
    import { toast } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import { confirmAlert } from 'react-confirm-alert';
    import 'react-confirm-alert/src/react-confirm-alert.css';
    import baseApi from "../API";


    export default function Comment({ socket, comments, questionId, handleAllData , question}) {
      const [newComment, setNewComment] = useState("");
      const [commentList, setCommentList] = useState(comments);
      const [commentError, setCommentError] = useState("");
      const { user } = useAuthContext();
      

      const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim().length === 0) {
          setCommentError("Don't forget to add your comment");
          return;
        }
        if (newComment.trim().length > 400) {
          setCommentError("Comment cannot exceed more than 200 characters.");
          return;
        }
        try {
          const response = await axios.post(
            `${baseApi}/question/comment/${user.id}/${questionId}`,
            {
              user: user.id,
              question: questionId,
              content: newComment,
            }
          );
          handleAllData();
          const newCommentObj = response.data;
          setNewComment("");
          setCommentList([...commentList, newCommentObj]);
          toast.success("Comment added successfully!");
          socket.emit('newComment', {
            commentId: response.data._id,
            userId:   user.id,
            questionId: questionId
          })
        } catch (error) {
          console.log(error);
        }
      };

      const handleDeleteComment = async (commentId) => {
        try {
          confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this comment?',
            buttons: [
              {
                label: 'Yes',
                onClick: async () => {
                  await axios.delete(
                    `${baseApi}/question/delete/comment/${user.id}/${commentId}/${questionId}`
                  );
                  const updatedComments = commentList.filter((comment) => {
                    return comment._id !== commentId;
                  });
                  setCommentList(updatedComments);
                  handleAllData();
                  toast.success("Comment deleted successfully!");
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
        } catch (error) {
          console.log(error);
        }
      };
      

      return (
        <div className="text-start">
          <h2 className="mb-3">Add a comment:</h2>
          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3 d-flex gap-1">
              <div className="w-100">
                <input
                  id="comment"
                  name="content"
                  type="text"
                  className={`form-control ${commentError && "is-invalid"}`}
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                    setCommentError("");
                  }}
                />
                {commentError && (
                  <div className="invalid-feedback">{commentError}</div>
                )}
              </div>
              <div>
                <button type="submit" className="btn btn-1 w-100">
                  Confirm
                </button>
              </div>
            </div>
          </form>
          <CommentList
            questionId={questionId}
            commentList={commentList}
            user={user}
            question={question}
            handleDeleteComment={handleDeleteComment}
          />
        </div>
      );
    }
