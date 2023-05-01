import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileImgName from "./ProfileImgName";

export default function Question({ question }) {
  const navigate = useNavigate();

  return (
    <div className="ms-2 me-auto w-100">
      <div className="d-flex justify-content-between">
        <div>
         <ProfileImgName profile={question.user} />

          <p className="time mb-1">
            {question.created_time}
            <br />
            {question.created_date}
          </p>
        </div>
        <div className="d-flex flex-column">
          <button
            type="button"
            className="btn btn-2 mb-2"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/question/${question._id}`);
            }}
          >
            See More
          </button>
        </div>
      </div>
      <div className="fw-bold pt-1 pb-3 fs-4 title">{question.title}</div>
      <div className="d-flex justify-content-between align-items-center">
        {question.description.length > 200 && (
          <p>{question.description.slice(0, 200)}...</p>
        )}
        {question.description.length <= 200 && <p>{question.description}</p>}
      </div>
    </div>
  );
}
