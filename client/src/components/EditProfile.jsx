import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseApi from "../API";

export default function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetch(`${baseApi}/profile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setProfile(data.user);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseApi}/profile-page-edit/${id}`, formData)
      .then(() => {
        toast.success("Your information has been successfully edited!");
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
      <h2>Edit Profile Page</h2>

      <div className="mt-4 text-start">
        <form
          style={{ marginTop: "50px" }}
          action={`${baseApi}/profile/edit/photo/${id}`}
          method="post"
          encType="multipart/form-data"
          onSubmit={() => navigate(-1)}
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Profile Photo:
            </label>
            <input
              id="title"
              name="image"
              type="file"
              className="form-control"
            />
          </div>

          <div className="d-flex gap-3 justify-content-end">
            <button type="submit" className="btn btn-2 btn-block w-50">
              Submit
            </button>
          </div>
        </form>
      </div>
      {isLoading && (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
      {profile && (
        <div className="mt-4 text-start">
          <form
            style={{ marginTop: "50px" }}
            method="post"
            onSubmit={handleEdit}
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Name:
              </label>
              <input
                id="title"
                name="user"
                type="text"
                className="form-control"
                defaultValue={profile.user}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                Description:
              </label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                id="description"
                defaultValue={profile.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex gap-3">
              <button
                className="btn btn-1 btn-block w-50"
                id="cancelEditingUser"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-2 btn-block w-50"
                onClick={handleEdit}
              >
                Submit
              </button>
            </div>
          </form>
        
        </div>
      )}
    </div>
  );
}
