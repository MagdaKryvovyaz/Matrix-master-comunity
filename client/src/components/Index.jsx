import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import useAuthContext
import { useAuthContext } from "../hooks/useAuthContext";
import Question from "./Question";

//pagination
import Pagination from "react-bootstrap/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import GoToTopButton from "./GoToTopButton";
import baseApi from "../API";

export default function Index() {
  const navigate = useNavigate();
  const [queations, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //take user from  hook
  const { user } = useAuthContext();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    axios
      .get(`${baseApi}`)
      .then((data) => {
        setQuestions(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleAddQuestion = () => {
    if (user && user.token) {
      navigate("/new-question");
    } else {
      navigate("/login");
    }
  };
  const handlePageChange = (event) => {
    setCurrentPage(parseInt(event.target.text));
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(queations.length / 5); i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={handlePageChange}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  return (
    <div className="container text-center my-4">
      {isLoading && (
        <div className="spinner-border mt-5" role="status">
          <span className="sr-only"></span>
        </div>
      )}
      {!isLoading && queations && (
        <>
          <h1 className="center">Matrix Master Community</h1>
          <h2>All questions</h2>

          <div className="mt-4">
            <button
              onClick={handleAddQuestion}
              type="button"
              className="btn btn-1"
              style={{ width: "200px" }}
            >
              Add Question
            </button>
          </div>
          <div className="row text-start">
            <ul className="list-group mt-5">
              {queations
                .slice((currentPage - 1) * 5, currentPage * 5)
                .map((q, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <Question question={q} />
                  </li>
                ))}
            </ul>
            <div className="pagination-container">
              <button
                className="btn btn-1 "
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <FontAwesomeIcon className="btn-pag" icon={faAngleLeft} /> Prev
              </button>

              <ul className="pagination" id="pagination-style">
                {renderPageNumbers()}
              </ul>

              <button
                className="btn btn-1"
                disabled={currentPage === Math.ceil(queations.length / 5)}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span> </span>Next{" "}
                <FontAwesomeIcon className="btn-pag" icon={faAngleRight} />
              </button>
            </div>

          </div>
        </>
      )}

      <GoToTopButton />
    </div>
  );
}
