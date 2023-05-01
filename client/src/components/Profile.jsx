import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import ProfilePhoto from "./ProfilePhoto";
import Question from "./Question";
import baseApi from "../API";

export default function Profile() {
  const { id } = useParams();
  const [questions, setQuestions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState("");
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseApi}/profile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.questions);
        setIsLoading(false);
        setProfile(data.user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      {profile && (
        
        <div className="container">
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
          <div className="mb-3 d-flex justify-content-center">
            
            <ProfilePhoto url={profile.imageUrl} />
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2">
            <h1 className="center">{profile.user}</h1>
            {profile._id === user.id && (
              <Link to={`/edit-profile/${user.id}`}>
                <button type="button" className="btn btn-1 mb-2">
                  Edit Profile
                </button>
              </Link>
            )}
          </div>
          <div className="text-start my-3 fs-4">
            <p>
              <b>Email adress: </b> {profile.email}
            </p>
            {profile.description && (
              <p>
                <b>About me: </b> {profile.description}
              </p>
            )}
          </div>
          {questions.length > 0 && (
            <div className="row text-start mt-5">
              <div className="d-flex justify-content-between">
                <h2 className="text-center pb-3">
                  Questions by {profile.user}:
                </h2>
              </div>
              <ul className="list-group list-group-paginathing">
                {questions.map((question, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <Question question={question}/>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {questions.length === 0 && (
            <div className="row text-start mt-5">
              <div className="d-flex justify-content-between">
                <h2 className="text-center pb-3">
                  {profile.user} has not posted any questions yet.
                </h2>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
