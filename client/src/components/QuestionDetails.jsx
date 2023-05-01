import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Likes from "./Likes";
import { useAuthContext } from "../hooks/useAuthContext";
import ProfileImgName from "./ProfileImgName";
import Comment from "./Comment.jsx";
import SharePost from "./ShareQuestion";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import GoToTopButton from "./GoToTopButton";
import baseApi from "../API";

export default function QuestionDetails({ socket }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const location = useLocation();
  const handleAllData = useCallback(async () => {
    axios
      .get(`${baseApi}/question/${id}`)
      .then((response) => {
        setQuestion(response.data);
        setComments(response.data.comments);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/not-found");
        } else {
          console.log("An error occurred:", error.message);
        }
      });
  }, [id, navigate]);

  useEffect(() => {
    handleAllData();
  }, [handleAllData]);

  const handleDelete = () => {
    user &&
      confirmAlert({
        title: "Confirm Delete",
        message: "Are you sure you want to delete this question?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              fetch(
                `${baseApi}/delete-question/${question._id}/${user.id}`,
                {
                  method: "DELETE",
                }
              ).then(() => {
                toast.success("Your question was successfully deleted!");
                navigate("/");
              });
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
  };

  return (
    <div className="container text-center my-4">
      {user && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              className="btn btn-2 btn-w"
            >
              Back
            </button>
            <h1 className="center">Matrix Master Community</h1>
          </div>
          {isLoading && (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
          {question && (
            <div className="mt-4 text-start d-flex">
              <div className="w-100">
                <div className="d-flex justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <ProfileImgName profile={question.user} />
                  </div>
                  {question.user._id === user.id && (
                    <div className="d-flex align-items-center">
                      <button
                        onClick={() =>
                          navigate(`/edit-question/${question._id}`)
                        }
                        type="submit"
                        className="btn btn-2 btn-w mb-2 me-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        id="deleteQuestionBtn"
                        type="submit"
                        className="btn btn-1 mb-2 btn-w"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <h2 className="question-title">{question && question.title}</h2>
                <div className="question-description">
                  {question &&
                    question.description
                      .split("\n")
                      .map((p, i) => <p key={i}>{p}</p>)}
                </div>
                {/* SHARE */}
                <div>
                  <SharePost
                    url={`http://localhost:3000${location.pathname}`}
                    user={question.user.user}
                    title={question.title}
                    description={question.description}
                  />
                </div>

                {/* LIKES  */}

                <div className="d-flex justify-content-end">
                  <div>
                    <Likes
                      length={question.likes.length}
                      questionId={question._id}
                      userId={user.id}
                      socket={socket}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Comments */}
          {comments && (
            <>
              <Comment
                socket={socket}
                question={question}
                comments={comments}
                questionId={id}
                handleAllData={handleAllData}
              />
  
            </>
          )}
          <GoToTopButton />
        </>
      )}
      {!user && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              className="btn btn-2 btn-w"
            >
              Back
            </button>
            <h1 className="center">Matrix Master Community</h1>
          </div>
          {isLoading && (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
          {question && (
            <div className="mt-4 text-start d-flex">
              <div className="w-100">
                <div className="d-flex justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="d-flex align-items-center gap-2 mb-2 link">
                      <div className="userPicture">
                        <img
                          className="img-small"
                          src={`${baseApi}/public/images/${question.user.imageUrl}`}
                          alt="profile"
                        />
                      </div>
                      <div className="fw-bold fs-4 link-text">
                        {question.user.user}
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="question-title">{question && question.title}</h2>
                <p className="question-description">
                  {question &&
                    question.description
                      .split("\n")
                      .map((p, i) => <p key={i}>{p}</p>)}
                </p>
                {/* SHARE */}
                <SharePost
                  url={`http://localhost:3000${location.pathname}`}
                  user={question.user.user}
                  title={question.title}
                  description={question.description}
                />
               
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
