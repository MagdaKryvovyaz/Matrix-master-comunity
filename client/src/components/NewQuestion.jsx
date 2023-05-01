import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast } from "react-toastify";
import baseApi from "../API";

export default function NewQuestion() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleSubmit = async (e) => {
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
      setDescriptionError(
        "Your description must be no longer than 1000 characters"
      );
      return;
    } else {
      setDescriptionError("");
    }

    axios
      .post(`${baseApi}/question/${user.id}`, formData)
      .then((response) => {
        navigate("/");
        toast.success("New question added successfully!");
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
      <h2>Add a question</h2>

      <div className="mt-4 text-start">
        <form
          className="needs-validation"
          style={{ marginTop: "50px" }}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Question:
            </label>
            <input
              value={formData.title}
              onChange={handleInputChange}
              id="title"
              name="title"
              type="text"
              className={`form-control ${titleError ? "is-invalid" : ""}`}
            />
            {titleError && <div className="invalid-feedback">{titleError}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="description">
              Description:
            </label>
            <textarea
              value={formData.description}
              onChange={handleInputChange}
              name="description"
              className={`form-control ${descriptionError ? "is-invalid" : ""}`}
              rows="4"
              id="description"
            ></textarea>
            {descriptionError && (
              <div className="invalid-feedback">{descriptionError}</div>
            )}
          </div>
          <div className="d-flex gap-3">
            <button
              className="btn btn-2 btn-block w-50"
              id="cancelAddingQuestion"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-1 btn-block w-50" id="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
