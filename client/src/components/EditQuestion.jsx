import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseApi from "../API";

export default function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    fetch(`${baseApi}/question/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data);
        setIsLoading(false);
        setFormData({ title: data.title, description: data.description });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
  
    if (formData.title.trim().length === 0) {
      setTitleError("Please enter your question");
      return;
    } else if (formData.title.length > 250) {
      setTitleError("Your question must be no longer than 250 characters");
      return;
    } else {
      setTitleError("");
    }
  
    if (formData.description.length > 1000) {
      setDescriptionError("Your description must be no longer than 1000 characters");
      return;
    } else {
      setDescriptionError("");
    }
  
    axios
      .post(`${baseApi}/question/edit/${id}/${user.id}`, formData)
      .then((response) => {
        toast.success("Your question has been successfully edited!");
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container text-center my-4">
      <h1 className="center">Matrix Master Community</h1>
      <h2>Edit the question</h2>

      <div className="mt-4 text-start">
        {isLoading && (
          <div className="d-flex justify-content-center mt-3">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
        {question && (
          <form
            style={{ marginTop: "50px" }}
            method="post"
            onSubmit={handleEdit}
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Question:
              </label>
              <input
                id="title"
                name="title"
                type="text"
                className={`form-control ${titleError ? "is-invalid" : ""}`}
                defaultValue={question.title}
                onChange={handleInputChange}
              />
              {titleError && (
                <div className="invalid-feedback">{titleError}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Description:
              </label>
              <textarea
                 className={`form-control ${descriptionError ? "is-invalid" : ""}`}
                name="description"
                rows="4"
                id="description"
                defaultValue={question.description}
                onChange={handleInputChange}
              />
              {descriptionError && (
                <div className="invalid-feedback">{descriptionError}</div>
              )}
            </div>
            <div className="d-flex gap-3">
              <button
                className="btn btn-1 btn-block w-50"
                id="cancelEditingQuestion"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Cancel
              </button>
              <button
                // type="submit"
                className="btn btn-2 btn-block w-50"
                onClick={handleEdit}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
